## 2026-06-23 - Custom Cursor Loop Optimization
**Learning:** High-frequency requestAnimationFrame loops for UI decorations (like custom cursors) can cause significant main-thread overhead even when stationary if they don't implement a 'dirty check' threshold. In this codebase, the cursor was performing ~60 style updates per second while the mouse was still.
**Action:** Always implement a numerical threshold (e.g., 0.1px) and consolidated RAF loop for JS-driven animations. Also, ensure CSS transitions on the same properties are removed to prevent rendering engine conflicts.
