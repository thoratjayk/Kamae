## 2026-06-11 - Custom Cursor Optimization
**Learning:** High-frequency events like `mousemove` coupled with individual event listeners on many DOM elements and direct style updates on every event frame cause significant main-thread congestion and layout thrashing.
**Action:** Always consolidate high-frequency UI updates into a single `requestAnimationFrame` loop. Use "dirty checking" with a sub-pixel threshold (e.g., 0.1px) to bypass redundant style assignments. Use document-level event delegation for hover states to minimize listener overhead and support dynamic content.
