## 2026-04-26 - [Cursor Animation Conflict]
**Learning:** Combining CSS `transition: transform` with high-frequency JavaScript `transform` updates via `requestAnimationFrame` creates layout thrashing and visual jank as the browser's transition engine competes with the JS logic.
**Action:** Always remove `transition: transform` from elements whose position is managed by a JS animation loop and use `will-change: transform` to promote them to a compositor layer.
