## 2026-05-05 - Consolidate Animation Loops
**Learning:** High-frequency events like `mousemove` should only update coordinate variables. All DOM updates for related animated elements (e.g., cursor dot and ring) must be consolidated into a single `requestAnimationFrame` loop using `translate3d` to prevent layout thrashing and ensure frame consistency.
**Action:** Always move multiple style updates from event listeners into a shared rAF loop and leverage GPU acceleration for transforms.
