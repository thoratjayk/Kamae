## 2025-05-14 - Consolidated UI Animation & DOM Batching
**Learning:** High-frequency UI updates (custom cursor) and dynamic content rendering (cart/products) were causing unnecessary main thread work and layout reflows. Moving cursor updates to a single `requestAnimationFrame` loop with `translate3d` and a "dirty check" threshold (0.1px) significantly reduces DOM churn.
**Action:** Always prefer consolidated rAF loops for coordinated animations and use `DocumentFragment` for multi-element DOM injections to minimize reflows.

**Learning:** When using JavaScript to update `transform` on elements with existing CSS transforms (like `translate(-50%, -50%)`), the inline style will overwrite the CSS.
**Action:** Explicitly include necessary offsets like `calc(-50% + ${val}px)` or similar in the JS-applied transform string to maintain correct positioning.
