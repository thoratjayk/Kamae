# Bolt's Performance Journal

## 2025-05-15 - [Cursor Performance & Event Delegation]
**Learning:** High-frequency events like `mousemove` should only update coordinates. Consolidating all DOM updates into a single `requestAnimationFrame` loop using `translate3d` significantly reduces layout thrashing and leverages GPU acceleration. Using event delegation for hover states on `document` is more memory-efficient and persists through dynamic content updates.
**Action:** Always prefer `requestAnimationFrame` for animations and event delegation for interactive elements.
