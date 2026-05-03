import asyncio
import os
from playwright.async_api import async_playwright

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        with open('theme/assets/theme.css', 'r') as f:
            css = f.read()
        with open('theme/assets/theme.js', 'r') as f:
            js = f.read()
            js = js.replace("JSON.parse(localStorage.getItem('vibecheck_cart') || '[]')", "[]")
            js = js.replace("localStorage.setItem('vibecheck_cart', JSON.stringify(cart))", "console.log('Cart saved')")

        html_template = """
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                :root {
                    --primary: #ff89ab; --secondary: #00eefc; --surface: #0e0e0e; --on-surface: #f0f0f0;
                    --font-body: sans-serif; --radius-xl: 1rem; --primary-container: #ff709e;
                    --outline-variant: rgba(255,255,255,0.1); --surface-container-high: #202020;
                    --transition: 0.3s ease;
                }
                body { background: var(--surface); color: var(--on-surface); font-family: var(--font-body); cursor: none; margin: 0; }
                STYLE_PLACEHOLDER
            </style>
        </head>
        <body>
            <div class="cursor" id="cursorDot"><div class="cursor-dot"></div></div>
            <div class="cursor-ring" id="cursorRing"></div>

            <nav id="mainNav" style="height: 60px;">
                <a href="#" id="link1" style="display:inline-block; padding: 20px;">Link 1</a>
            </nav>

            <div id="productsGrid"></div>

            <div id="cartItems"><div id="cartEmpty">Empty</div></div>
            <div id="cartBadge" style="display:none">0</div>
            <div id="cartTotal">$0.00</div>
            <div id="cartFooter" style="display:none">Footer</div>
            <div id="toast"><span id="toastMsg"></span></div>
            <input type="text" id="newsletterEmail" style="display:none" />

            <script>
                window.shopifyLoadProducts = function() {
                    return Promise.resolve([
                        { id: '1', title: 'Product 1', variants: [{ id: 'v1', price: '10.00' }], images: [] }
                    ]);
                };

                window.IntersectionObserver = class {
                    constructor(cb) { this.cb = cb; }
                    observe(el) {
                        setTimeout(() => this.cb([{ isIntersecting: true, target: el }], this), 10);
                    }
                    unobserve() {}
                };
            </script>
            <script>
                SCRIPT_PLACEHOLDER
            </script>
        </body>
        </html>
        """

        content = html_template.replace("STYLE_PLACEHOLDER", css).replace("SCRIPT_PLACEHOLDER", js)
        await page.set_content(content)
        await asyncio.sleep(2)

        os.makedirs('verification/screenshots', exist_ok=True)
        await page.screenshot(path='verification/screenshots/initial_state.png')

        await page.mouse.move(200, 200)
        await asyncio.sleep(0.2)
        await page.hover('#link1')
        await asyncio.sleep(0.2)
        await page.screenshot(path='verification/screenshots/hover_state.png')

        btn = await page.query_selector('.product-add-btn')
        if btn:
            await btn.click()
            await asyncio.sleep(0.5)
            await page.screenshot(path='verification/screenshots/cart_updated.png')

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
