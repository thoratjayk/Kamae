## 2025-05-22 - Stationary Cursor Redundant Updates
**Learning:** High-frequency UI components like custom cursors can cause significant main-thread overhead by performing redundant DOM style updates even when the target state hasn't changed. In this codebase, the cursor was performing ~60 updates/sec while stationary.
**Action:** Implement a 0.1px 'dirty-check' threshold in requestAnimationFrame loops for UI positioning to skip unnecessary DOM writes when movement is negligible.
