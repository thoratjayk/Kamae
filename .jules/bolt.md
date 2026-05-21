# Bolt Performance Journal

## 2026-05-21 - Custom Cursor Animation Optimization
**Learning:** High-frequency DOM updates (like custom cursors) should be consolidated into a single `requestAnimationFrame` loop to avoid layout thrashing and redundant writes. Using `translate3d` and `will-change: transform` promotes elements to the compositor layer, offloading rendering to the GPU. Passive event listeners for `mousemove` also prevent blocking the main thread.
**Action:** Always check for redundant DOM writes in `mousemove` or `scroll` listeners and move them to a synchronized animation loop.
