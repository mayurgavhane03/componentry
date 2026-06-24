# c-radio-group



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute     | Description                                                                                                                               | Type                                                                  | Default      |
| ------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------ |
| `defaultValue`      | `value`       | The default value of the form control (used on form reset).                                                                               | `string`                                                              | `null`       |
| `disabled`          | `disabled`    | Disables the radio group and all child radios.                                                                                            | `boolean`                                                             | `false`      |
| `hint`              | `hint`        | The radio group's hint text.                                                                                                              | `string`                                                              | `""`         |
| `label`             | `label`       | The radio group's label. Required for proper accessibility.                                                                               | `string`                                                              | `""`         |
| `name`              | `name`        | The name submitted with form data.                                                                                                        | `string`                                                              | `null`       |
| `orientation`       | `orientation` | The orientation in which to show radio items.                                                                                             | `"horizontal" \| "vertical"`                                          | `"vertical"` |
| `required`          | `required`    | Ensures a child radio is checked before the containing form can submit.                                                                   | `boolean`                                                             | `false`      |
| `size` _(required)_ | `size`        | The radio group's size — propagated to all child `<c-radio>` elements.                                                                    | `"l" \| "large" \| "m" \| "medium" \| "s" \| "small" \| "xl" \| "xs"` | `undefined`  |
| `value`             | `value`       | The current value of the radio group. Setting this property marks `valueHasChanged` so the default value is no longer used as a fallback. | `string`                                                              | `null`       |


## Events

| Event    | Description | Type                |
| -------- | ----------- | ------------------- |
| `change` |             | `CustomEvent<void>` |
| `input`  |             | `CustomEvent<void>` |


## Methods

### `setFocus(options?: FocusOptions) => Promise<void>`

Sets focus on the radio group (focuses the checked radio, or the first enabled one).

#### Parameters

| Name      | Type           | Description |
| --------- | -------------- | ----------- |
| `options` | `FocusOptions` |             |

#### Returns

Type: `Promise<void>`




## Slots

| Slot      | Description                                                                                           |
| --------- | ----------------------------------------------------------------------------------------------------- |
|           | The default slot where `<c-radio>` elements are placed.                                               |
| `"hint"`  | Text that describes how to use the radio group. Alternatively, use the `hint` attribute.              |
| `"label"` | The radio group's label. Required for proper accessibility. Alternatively, use the `label` attribute. |


## Shadow Parts

| Part                   | Description |
| ---------------------- | ----------- |
| `"form-control"`       |             |
| `"form-control-input"` |             |
| `"form-control-label"` |             |
| `"hint"`               |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
