## 2025-05-14 - Optimized Custom Cursor Animation and Event Handling

**Learning:** Consolidating DOM updates into a single `requestAnimationFrame` loop and using `translate3d` significantly improves rendering performance for interactive elements like custom cursors. Using document-level event delegation with `target.closest()` is more efficient than individual listeners and ensures compatibility with dynamic content (e.g., Shopify product grids). Removing CSS `transition: transform` is crucial when handling positioning in JS to avoid rendering conflicts.

**Action:** Always favor a single rAF loop for multiple animated elements and use event delegation for high-frequency interactive states.
