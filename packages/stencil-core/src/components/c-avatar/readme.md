# c-avatar



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                         | Type                                | Default    |
| ---------- | ---------- | --------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------- |
| `image`    | `image`    | The image source to use for the avatar.                                                             | `string`                            | `""`       |
| `initials` | `initials` | Initials to use as a fallback when no image is available (1–2 characters max recommended).          | `string`                            | `""`       |
| `label`    | `label`    | A label to use to describe the avatar to assistive devices.                                         | `string`                            | `""`       |
| `loading`  | `loading`  | Indicates how the browser should load the image.                                                    | `"eager" \| "lazy"`                 | `"eager"`  |
| `shape`    | `shape`    | The shape of the avatar. Reflected to the host element so external CSS can target it via attribute. | `"circle" \| "rounded" \| "square"` | `"circle"` |


## Events

| Event    | Description                           | Type                |
| -------- | ------------------------------------- | ------------------- |
| `cError` | Emitted when the image fails to load. | `CustomEvent<void>` |


## Slots

| Slot     | Description                                                    |
| -------- | -------------------------------------------------------------- |
| `"icon"` | The default icon to use when no image or initials are present. |


## Shadow Parts

| Part         | Description |
| ------------ | ----------- |
| `"base"`     |             |
| `"icon"`     |             |
| `"image"`    |             |
| `"initials"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
