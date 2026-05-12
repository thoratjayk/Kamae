## 2026-05-12 - Consolidated Cursor Animation & GPU Acceleration
**Learning:** High-frequency DOM updates (like custom cursors) should be consolidated into a single `requestAnimationFrame` loop rather than being triggered directly by events like `mousemove`. Using `translate3d` ensures GPU acceleration. Crucially, any CSS `transition` on the same property must be removed to prevent rendering "flicker" or "fighting" between the JS loop and CSS engine.

**Action:** Always use a single rAF loop for multiple related animated elements, use `translate3d`, and ensure CSS transitions are disabled for JS-controlled properties.
