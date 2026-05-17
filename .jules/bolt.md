## 2026-05-17 - Consolidating Animated UI Elements
**Learning:** In codebases with multiple independent requestAnimationFrame loops for UI elements (like cursor dot and ring), consolidating them into a single loop reduces overhead. Additionally, high-frequency events like mousemove should only update coordinate variables, leaving DOM manipulations to the rAF loop.
**Action:** Always check for redundant rAF loops and ensure high-frequency event listeners are passive and only update state variables. Use translate3d for GPU acceleration.
