# Bolt's Performance Journal

## 2025-05-14 - Consolidating UI Animations and Interactivity
**Learning:** Combining high-frequency DOM updates into a single `requestAnimationFrame` loop and using `translate3d` significantly reduces layout thrashing and leverages GPU acceleration. CSS transitions on properties updated by JS cause "jank" and should be removed. Event delegation on the `document` level is more efficient than individual listeners for elements that might be dynamically added (like Shopify products).
**Action:** Always check for conflicting CSS transitions when implementing JS-driven animations. Prefer document-level event delegation for hover/click states on repeated UI elements.
