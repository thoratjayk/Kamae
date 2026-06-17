## 2026-06-17 - Optimized Custom Cursor Animation
**Learning:** Consolidating DOM updates for animated elements into a single rAF loop and using a 0.1px dirty check threshold significantly reduces layout thrashing and redundant style recalcs when the mouse is stationary. Using translate3d instead of basic translate ensures hardware acceleration.
**Action:** Always implement a dirty check threshold in high-frequency animation loops and consolidate multiple related updates into one rAF callback.
