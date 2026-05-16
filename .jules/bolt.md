# Bolt's Performance Journal

## 2025-05-15 - Consolidating Animation Loops and Batching DOM Updates
**Learning:** High-frequency event listeners (like `mousemove`) and individual DOM updates for animated elements can cause significant layout thrashing and main-thread blockage. Consolidating all positioning logic into a single `requestAnimationFrame` loop, using `translate3d` for hardware acceleration, and implementing a "dirty check" threshold (0.1px) drastically reduces redundant work. Furthermore, using `DocumentFragment` for batching DOM insertions in dynamic UI components (like cart and product grids) prevents multiple reflows.
**Action:** Always prefer a single RAF loop for related animations. Use event delegation for interactive states to handle dynamic content efficiently and reduce memory overhead. Use `DocumentFragment` when inserting multiple elements into the DOM.
