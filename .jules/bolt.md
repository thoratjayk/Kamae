## 2025-05-15 - Optimized Custom Cursor Animation and Event Delegation
**Learning:** High-frequency DOM updates triggered directly by 'mousemove' can cause main-thread congestion and layout thrashing. Consolidating updates into a single 'requestAnimationFrame' loop with a 0.1px 'dirty-check' threshold and hardware-accelerated 'translate3d' significantly improves rendering efficiency.
**Action:** Always prefer 'requestAnimationFrame' for UI elements following the pointer, and use document-level event delegation for hover states on dynamic interactive elements.
