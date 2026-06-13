## 2025-05-24 - Consolidated Cursor Animation and Dirty Check
**Learning:** Mixing CSS `transition: transform` with JavaScript `requestAnimationFrame` updates causes rendering conflicts and jank. Additionally, updating the DOM on every frame when the cursor is stationary is wasteful.
**Action:** Always remove `transition: transform` from elements animated via JS loops, use `will-change: transform` with `translate3d` for GPU acceleration, and implement a "dirty check" (e.g., 0.1px threshold) to skip redundant style updates when the interpolated position hasn't changed.
