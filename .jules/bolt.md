## 2025-05-15 - Cursor Animation Consolidation
**Learning:** High-frequency UI elements like custom cursors can cause significant main-thread overhead if they perform redundant DOM writes while stationary. Consolidating updates into a single `requestAnimationFrame` loop with a delta-based "dirty check" (e.g., 0.1px threshold) reduces unnecessary style recalculations to zero when idle.
**Action:** Use consolidated `requestAnimationFrame` loops and dirty-checking for all JavaScript-driven animations.
