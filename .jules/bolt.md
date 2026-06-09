## 2025-05-14 - Custom Cursor Optimization
**Learning:** High-frequency DOM updates (like a custom cursor) should be consolidated into a single `requestAnimationFrame` loop with a "dirty-check" (e.g., 0.1px threshold) to avoid redundant layout/paint cycles when the mouse is stationary. Additionally, CSS transitions on properties updated by JS animation loops cause "double interpolation" and visual jank.
**Action:** Always check for existing CSS transitions on properties targeted by rAF loops, and implement dirty-checks to skip DOM updates when delta is below a visible threshold.
