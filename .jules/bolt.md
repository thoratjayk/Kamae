## 2025-05-15 - Consolidating Animation Loops and Event Delegation
**Learning:** Conflicting CSS transitions on elements animated via JS `requestAnimationFrame` cause "jank" and rendering conflicts. Additionally, attaching multiple listeners to interactive elements is inefficient and fails for dynamically loaded content.
**Action:** Always move DOM updates for high-frequency animations into a single rAF loop, use `translate3d` for GPU acceleration, and use event delegation for hover states to improve memory efficiency and support dynamic content.
