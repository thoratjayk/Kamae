## 2025-05-15 - Consolidating Animation Updates
**Learning:** High-frequency event listeners like `mousemove` can cause redundant style recalculations if they update the DOM directly. Even with `requestAnimationFrame`, updating multiple elements at different times can lead to layout thrashing or missed frames.
**Action:** Always consolidate DOM updates into a single `requestAnimationFrame` loop, use `{ passive: true }` for input events, and implement a "dirty check" threshold to skip redundant style updates when movement is sub-pixel.
