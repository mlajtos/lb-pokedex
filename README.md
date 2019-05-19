# Pokedex

Demo project for LB. [Live demo](https://mlajtos.github.io/lb-pokedex/build)

## Known Bugs

### User-facing Bugs

1. Native back/forward button does not work as it should.
1. Tilt
    - Not really smooth transition from stationary to tilted.
    - After deleting a card, there is no tilting on the card that took its place.
        - `onMouseEnter` event is skipped (in Chrome, FF is fine).
    - Shadow is cut-off when animating to stationary position.
        - `zIndex` is changed back to zero way too early.
1. No A11Y.
    - At least `aria` attributes would be nice.
1. No way to clear selection with one action.
1. Adding/removing cards should be animated. Maybe reorder.
    - Animating grid items is nightmare even with `TransitionGroup`.
    - [aholachek/animate-css-grid](https://github.com/aholachek/animate-css-grid), [STRML/react-grid-layout](https://github.com/STRML/react-grid-layout)
1. More bling – [Trianglify](http://qrohlf.com/trianglify/)

### Developer-facing Bugs

1. Anonymous components are crappy in DevTools.
    - Quick fix:
        - `export default () => {}` change to `export default function Component() {}`
    - Proper fix:
        - Babel could read dirname where `index.js` is located and use that. Too much work.
1. Ton of non-optimized code.
1. `App.js` is getting bloated.
    - `useReducer()`