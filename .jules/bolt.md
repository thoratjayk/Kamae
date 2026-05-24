## 2024-05-24 - Optimized Cursor Animation Loop
**Learning:** Using CSS `transition: transform` on elements being updated every frame via `requestAnimationFrame` creates rendering conflicts and jank. Additionally, updating the DOM on every frame even when the mouse is stationary is wasteful.
**Action:** Always remove CSS transitions from JS-animated properties and implement a "dirty check" (e.g., 0.1px threshold) in the animation loop to skip redundant DOM updates. Promote these elements to their own layer using `will-change: transform` and use `translate3d` for GPU acceleration.
