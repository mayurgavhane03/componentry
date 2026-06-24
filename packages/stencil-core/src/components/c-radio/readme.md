# c-radio



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute    | Description                                                                                               | Type                                                                  | Default     |
| -------------------- | ------------ | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ----------- |
| `appearance`         | `appearance` | The radio's visual appearance.                                                                            | `"button" \| "default"`                                               | `"default"` |
| `checked`            | `checked`    | Whether the radio is checked. Managed externally by `<c-radio-group>` via setAttribute / toggleAttribute. | `boolean`                                                             | `false`     |
| `disabled`           | `disabled`   | Disables the radio.                                                                                       | `boolean`                                                             | `false`     |
| `size` _(required)_  | `size`       | The radio's size. When used inside a `<c-radio-group>`, the group's size overrides this attribute.        | `"l" \| "large" \| "m" \| "medium" \| "s" \| "small" \| "xl" \| "xs"` | `undefined` |
| `value` _(required)_ | `value`      | The radio's value. When selected, the parent radio group will receive this value.                         | `string`                                                              | `undefined` |


## Events

| Event        | Description                           | Type                |
| ------------ | ------------------------------------- | ------------------- |
| `radioBlur`  | Emitted when the control loses focus. | `CustomEvent<void>` |
| `radioFocus` | Emitted when the control gains focus. | `CustomEvent<void>` |


## Methods

### `setFocus(options?: FocusOptions) => Promise<void>`



#### Parameters

| Name      | Type           | Description |
| --------- | -------------- | ----------- |
| `options` | `FocusOptions` |             |

#### Returns

Type: `Promise<void>`




## Slots

| Slot | Description        |
| ---- | ------------------ |
|      | The radio's label. |


## Shadow Parts

| Part              | Description |
| ----------------- | ----------- |
| `"checked-icon"`  |             |
| `"control"`       |             |
| `"description"`   |             |
| `"label"`         |             |
| `"label-wrapper"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
