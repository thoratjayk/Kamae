
## 2025-06-29 - Stationary Cursor Redundant Updates
**Learning:** The custom cursor implementation was updating the DOM via `requestAnimationFrame` even when the mouse was stationary, causing ~60 redundant style recalcs/second.
**Action:** Implement a 0.1px distance threshold (dirty-check) in the animation loop to skip DOM updates when interpolation has settled.
