## 2025-05-15 - Redundant Cursor DOM Updates
**Learning:** The custom cursor implementation was triggering ~60 style updates per second even when the mouse was stationary, due to the easing interpolation asymptotically approaching the target but never technically reaching it within the `requestAnimationFrame` loop.
**Action:** Implement a "dirty-check" threshold (e.g., 0.1px) in the animation loop to skip DOM updates when the delta between current and target positions is negligible.
