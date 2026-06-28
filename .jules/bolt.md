## 2025-05-15 - Redundant Cursor DOM Updates
**Learning:** High-frequency animations driven by `requestAnimationFrame` can cause significant main-thread overhead if they update the DOM even when the state (mouse position) hasn't changed. In this codebase, the cursor was performing ~60 redundant style writes per second.
**Action:** Always implement a "dirty-check" threshold (e.g., 0.1px) in `requestAnimationFrame` loops to skip DOM updates when movement is negligible or the animation has settled.
