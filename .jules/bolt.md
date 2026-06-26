## 2025-05-14 - Redundant DOM Updates in Cursor Animation
**Learning:** High-frequency animation loops (requestAnimationFrame) can cause significant CPU usage by updating the DOM even when the target position hasn't changed. Profiling revealed ~60-90 redundant style updates per second while the mouse was stationary.
**Action:** Implement a "dirty-check" with a small threshold (e.g., 0.1px) to skip DOM updates when the difference between the current and target positions is negligible.
