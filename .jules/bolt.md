## 2025-05-14 - Optimized Cursor Performance with rAF and GPU Acceleration
**Learning:** High-frequency DOM updates (like custom cursors) should be consolidated into a single `requestAnimationFrame` loop and use `translate3d` to leverage GPU acceleration. Parallel CSS transitions on the same properties must be removed to avoid "fighting" and jank.
**Action:** Always move mouse-following logic from event listeners to a rAF loop, use `will-change: transform`, and ensure no conflicting CSS transitions exist.
