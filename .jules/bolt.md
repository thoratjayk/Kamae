## 2026-06-30 - Optimized Custom Cursor Animation and Event Handling
**Learning:** Combining CSS `transition: transform` with JavaScript `requestAnimationFrame` updates for the same property causes rendering conflicts and "jank". Additionally, high-frequency DOM updates for a stationary or near-stationary cursor are wasteful.
**Action:** Always remove CSS transitions from JS-animated elements. Use `translate3d` and `will-change: transform` for GPU acceleration. Implement a small threshold (e.g., 0.1px) to skip redundant DOM writes during animation settling.
