## 2025-05-14 - Optimized Custom Cursor Animation and Interaction

**Learning:** Consolidated DOM updates into a single `requestAnimationFrame` loop and using `translate3d` significantly reduces main-thread work and layout thrashing, especially when high-frequency events like `mousemove` are involved. Using document-level event delegation for hover states not only improves memory efficiency but also ensures that dynamically loaded content (e.g., product grids) is automatically interactive without re-binding listeners.

**Action:** Always prefer `requestAnimationFrame` over direct DOM updates in high-frequency event listeners. Use `translate3d` and `will-change` for hardware acceleration. Implement "dirty checks" to avoid redundant style updates when elements are stationary. Use event delegation for interactions on dynamic content.
