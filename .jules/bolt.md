## 2026-05-23 - Optimized Pointer Tracking and Event Delegation
**Learning:** Consolidating multiple JS-driven animations (e.g., cursor dot and ring) into a single `requestAnimationFrame` loop with a 0.1px "dirty-check" threshold significantly reduces redundant DOM updates and main-thread work. Passive `mousemove` listeners should only update coordinates, leaving rendering to the RAF loop.
**Action:** Use a single RAF loop for coordinated UI animations and always implement event delegation for interactive states to handle dynamic content (like product grids) efficiently.
