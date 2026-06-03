## 2025-05-14 - Optimized Custom Cursor Animation

**Learning:** High-frequency events like `mousemove` can cause significant performance degradation if they trigger direct DOM updates or style recalculations. Consolidating these updates into a single `requestAnimationFrame` loop, using hardware-accelerated `translate3d`, and implementing a "dirty-check" (position threshold) ensures smooth 60fps movement with minimal main-thread overhead. Removing conflicting CSS transitions is also critical for predictable JS-driven animations.

**Action:** Always move high-frequency DOM updates to a `requestAnimationFrame` loop and use `translate3d` with `will-change: transform` for UI elements that move continuously.
