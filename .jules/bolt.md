## 2026-07-03 - Custom Cursor Dirty-Check
**Learning:** Profiling revealed that the custom cursor was performing ~60 redundant DOM style updates per second when the mouse was stationary, due to the `requestAnimationFrame` loop running continuously.
**Action:** Implement a 0.1px 'dirty-check' threshold in animation loops to skip DOM writes when the delta between frames is negligible.
