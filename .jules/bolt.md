## 2025-05-14 - Optimized Custom Cursor Animation
**Learning:** Consolidating multiple high-frequency DOM updates into a single `requestAnimationFrame` loop with "dirty-checking" (0.1px threshold) significantly reduces layout thrashing and CPU usage. Removing conflicting CSS transitions on `transform` is critical when using JS-driven positioning.
**Action:** Always check for CSS transitions on properties manipulated via JS animation loops and implement dirty-checking to skip redundant DOM updates when values haven't changed beyond a perceptual threshold.
