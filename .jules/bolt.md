# Bolt's Performance Journal

## 2025-05-15 - Optimizing High-Frequency UI Interactions (Custom Cursor)
**Learning:** Custom cursor implementations often cause layout thrashing and main-thread congestion because they perform DOM writes directly in the `mousemove` event and rely on CSS transitions that conflict with high-frequency JavaScript updates.
**Action:** Always move DOM updates for high-frequency events into a consolidated `requestAnimationFrame` loop. Use `translate3d` to force GPU acceleration and implement a 'dirty-check' threshold (e.g., 0.1px) to prevent redundant DOM updates when elements are nearly stationary. Use event delegation for hover states to reduce memory overhead and support dynamic content.
