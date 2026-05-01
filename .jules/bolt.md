## 2025-05-14 - Consolidating Cursor Animations and DOM Updates
**Learning:** High-frequency UI updates like custom cursors should be consolidated into a single `requestAnimationFrame` loop using `translate3d` to avoid layout thrashing and leverage GPU acceleration. Additionally, CSS `transition: transform` must be removed from these elements to prevent rendering conflicts with the JS loop.
**Action:** Always check for `mousemove` listeners performing direct DOM manipulation and migrate them to a consolidated `rAF` loop with hardware-accelerated transforms.

## 2025-05-14 - Batching Dynamic Content with DocumentFragment
**Learning:** Appending multiple elements to the DOM in a loop causes repeated reflows. Using a `DocumentFragment` batches these updates into a single reflow.
**Action:** Use `DocumentFragment` whenever rendering lists or grids of elements dynamically from an API response.
