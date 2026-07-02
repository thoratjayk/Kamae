## 2025-05-14 - Redundant Cursor DOM Updates
**Learning:** The custom cursor implementation was performing ~60 DOM style writes per second even when the mouse was stationary, due to a requestAnimationFrame loop without a settling threshold.
**Action:** Implement a 0.1px "dirty-check" threshold in the animation loop to skip DOM writes once the interpolated position has effectively converged.
## 2025-05-14 - Event Delegation Flicker
**Learning:** Moving from individual event listeners to document-level delegation for 'mouseover'/'mouseout' can cause hover states to flicker when moving between a parent element and its children.
**Action:** Always check 'e.relatedTarget.closest()' in 'mouseout' listeners to ensure the pointer is actually leaving the interactive container before removing hover classes.
