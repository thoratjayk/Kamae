## 2026-04-13 - Custom Cursor Optimization
**Learning:** High-frequency events like `mousemove` should only update coordinate variables. All DOM updates and calculations should be deferred to a `requestAnimationFrame` loop for optimal performance and to prevent layout thrashing. Additionally, CSS `transition: transform` must be removed from elements updated via JS animation loops to avoid rendering conflicts and jitter.
**Action:** Always consolidate DOM updates for animated elements into a single rAF loop and use `translate3d` for GPU acceleration.
