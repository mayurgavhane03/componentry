# c-carousel



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description | Type                         | Default        |
| ------------------ | ------------------- | ----------- | ---------------------------- | -------------- |
| `autoplay`         | `autoplay`          |             | `boolean`                    | `false`        |
| `autoplayInterval` | `autoplay-interval` |             | `number`                     | `3000`         |
| `loop`             | `loop`              |             | `boolean`                    | `false`        |
| `mouseDragging`    | `mouse-dragging`    |             | `boolean`                    | `false`        |
| `navigation`       | `navigation`        |             | `boolean`                    | `false`        |
| `orientation`      | `orientation`       |             | `"horizontal" \| "vertical"` | `"horizontal"` |
| `pagination`       | `pagination`        |             | `boolean`                    | `false`        |
| `slidesPerMove`    | `slides-per-move`   |             | `number`                     | `1`            |
| `slidesPerPage`    | `slides-per-page`   |             | `number`                     | `1`            |


## Events

| Event          | Description | Type                                                  |
| -------------- | ----------- | ----------------------------------------------------- |
| `cSlideChange` |             | `CustomEvent<{ index: number; slide: HTMLElement; }>` |


## Methods

### `goToSlide(index: number, behavior?: ScrollBehavior) => Promise<void>`



#### Parameters

| Name       | Type                              | Description |
| ---------- | --------------------------------- | ----------- |
| `index`    | `number`                          |             |
| `behavior` | `"auto" \| "instant" \| "smooth"` |             |

#### Returns

Type: `Promise<void>`



### `next(behavior?: ScrollBehavior) => Promise<void>`



#### Parameters

| Name       | Type                              | Description |
| ---------- | --------------------------------- | ----------- |
| `behavior` | `"auto" \| "instant" \| "smooth"` |             |

#### Returns

Type: `Promise<void>`



### `previous(behavior?: ScrollBehavior) => Promise<void>`



#### Parameters

| Name       | Type                              | Description |
| ---------- | --------------------------------- | ----------- |
| `behavior` | `"auto" \| "instant" \| "smooth"` |             |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part                 | Description |
| -------------------- | ----------- |
| `"base"`             |             |
| `"navigation"`       |             |
| `"scroll-container"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
