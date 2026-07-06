## 2026-07-06 - Custom Cursor Optimization
**Learning:** Stationary custom cursors driven by requestAnimationFrame can cause ~60 redundant DOM style updates per second, leading to unnecessary main-thread work and power consumption.
**Action:** Implement a dirty-check threshold (e.g., 0.1px) in the animation loop to skip DOM writes when movement is negligible.
