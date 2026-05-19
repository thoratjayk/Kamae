## 2025-05-14 - Optimized Custom Cursor with GPU Acceleration and Event Delegation
**Learning:** Consolidating high-frequency DOM updates into a single `requestAnimationFrame` loop and using `translate3d` significantly reduces main-thread jank. Event delegation for hover states on many interactive elements reduces memory overhead and initialization time compared to individual listeners.
**Action:** Always prefer `translate3d` and rAF for smooth animations, and use document-level event delegation for hover-heavy UI components.
