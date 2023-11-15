# Poly Carousel

It's a react js library used for showing 3d rotating carousel animation

### Preview

![Preview](public/poly-carousel-demo.gif)

### Features

- Auto Play
- Infinite Loop
- Gap Customizable
- Pause on hover
- Custom Animation Duration

## Usage

```javascript
<PolyCarousel cardWidth={300} cardHeight={500}>
  <img src="/photo-1.jpg"></img>
  <img src="/photo-2.jpg"></img>
  <img src="/photo-3.jpg"></img>
</PolyCarousel>
```

> All child element will wrap a container with same card width and height. So style your child element accordingly

## Props

| Name             | Value      | Description                                                                             |
| ---------------- | ---------- | --------------------------------------------------------------------------------------- |
| cardWidth        | `number`   | All child element will wrap container with card width                                   |
| cardHeight       | `number`   | All child element will wrap container with card height.                                 |
| gap              | `number`   | Gap between children                                                                    |
| rotationDuration | `number`   | Value should be in `millisecond`. It is a duration of one full rotation                 |
| pauseOnHover     | `boolean`  | whether animation will pause on not on mouse hover                                      |
| onPause          | `function` | trigger on animation pause if `pauseOnHover` is `true`                                  |
| onResume         | `function` | trigger on animation start after pause duration mouse hover if `pauseOnHover` is `true` |

### Contributing

You are welcome to contribute to this library.
Each pull request (PR) should be specific and isolated to the issue you're trying to fix. Please do not stack features, chores, refactors, or enhancements in one PR. Describe your feature/implementation in the PR. If you're unsure whether it's useful or if it involves a major change, please open an issue first and seek feedback.
