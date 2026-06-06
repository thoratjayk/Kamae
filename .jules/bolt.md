## 2025-05-22 - Consolidated Cursor Animation Loop
**Learning:** High-frequency events like `mousemove` should never update the DOM directly if smooth interpolation is desired. In this codebase, the cursor used a mix of CSS transitions and JS-driven `translate` updates, leading to "jank" and redundant style recalculations. Consolidating both elements (dot and ring) into a single `requestAnimationFrame` loop with a "dirty-check" threshold (0.1px) and `translate3d` significantly reduces main-thread work and GPU overhead.

**Action:** Always check for `mousemove` or `scroll` listeners that modify styles directly. Move them to a throttled RAF loop and use `will-change: transform` with `translate3d` for optimal layer promotion.
