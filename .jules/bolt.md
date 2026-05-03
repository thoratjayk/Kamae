## 2024-05-03 - Optimize Custom Cursor and DOM Manipulation

**Learning:** High-frequency mouse events were triggering direct DOM updates, leading to layout thrashing. Additionally, individual event listeners on interactive elements and repeated `appendChild` calls in loops were inefficient.

**Action:**
1. Consolidate high-frequency DOM updates (like cursor movement) into a single `requestAnimationFrame` loop.
2. Use `translate3d` and `will-change: transform` to leverage GPU acceleration.
3. Use document-level event delegation for hover states to handle dynamic elements efficiently.
4. Use `DocumentFragment` to batch multiple DOM insertions into a single reflow.
