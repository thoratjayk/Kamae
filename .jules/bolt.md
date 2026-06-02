## 2025-06-02 - Optimize high-frequency cursor animation
**Learning:** Consolidating multiple DOM updates for animated elements into a single `requestAnimationFrame` loop using `translate3d` and a 0.1px 'dirty-check' threshold significantly reduces layout reflows and style recalculations.
**Action:** Always use a single rAF loop and dirty-checking for high-frequency UI updates like custom cursors or parallax effects.
