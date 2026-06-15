# c-checkbox



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute         | Description                                                                                                                                                          | Type                             | Default     |
| -------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ----------- |
| `checkBoxtitle`      | `check-boxtitle`  | Passed through to the native input's title attribute.                                                                                                                | `string`                         | `""`        |
| `checked`            | `checked`         | Draws the checkbox in a checked state.                                                                                                                               | `boolean`                        | `false`     |
| `defaultChecked`     | `default-checked` | The default checked state. Primarily used for resetting the form control.                                                                                            | `boolean`                        | `false`     |
| `disabled`           | `disabled`        | Disables the checkbox.                                                                                                                                               | `boolean`                        | `false`     |
| `form`               | `form`            | Associates the control with a form element by id. The form must be in the same document or shadow root.                                                              | `string`                         | `""`        |
| `helpText`           | `help-text`       | The checkbox's help text. Use the `help-text` slot for HTML content.                                                                                                 | `string`                         | `""`        |
| `indeterminate`      | `indeterminate`   | Draws the checkbox in an indeterminate state. Usually applied to "select all/none" checkboxes when associated checkboxes have a mix of checked and unchecked states. | `boolean`                        | `false`     |
| `name`               | `name`            | The name of the checkbox, submitted as a name/value pair with form data.                                                                                             | `string`                         | `""`        |
| `required`           | `required`        | Makes the checkbox a required field.                                                                                                                                 | `boolean`                        | `false`     |
| `size`               | `size`            | The checkbox's size.                                                                                                                                                 | `"large" \| "medium" \| "small"` | `"medium"`  |
| `value` _(required)_ | `value`           | The current value of the checkbox, submitted as a name/value pair with form data.                                                                                    | `string`                         | `undefined` |


## Events

| Event      | Description | Type                |
| ---------- | ----------- | ------------------- |
| `cBlur`    |             | `CustomEvent<void>` |
| `cChange`  |             | `CustomEvent<void>` |
| `cFocus`   |             | `CustomEvent<void>` |
| `cInput`   |             | `CustomEvent<void>` |
| `cInvalid` |             | `CustomEvent<void>` |


## Methods

### `checkBlur() => Promise<void>`

Removes focus from the checkbox.

#### Returns

Type: `Promise<void>`



### `checkClick() => Promise<void>`

Simulates a click on the checkbox.

#### Returns

Type: `Promise<void>`



### `checkFocus(options?: FocusOptions) => Promise<void>`

Sets focus on the checkbox.

#### Parameters

| Name      | Type           | Description |
| --------- | -------------- | ----------- |
| `options` | `FocusOptions` |             |

#### Returns

Type: `Promise<void>`



### `checkValidity() => Promise<boolean>`

Checks for validity but does not show a validation message. Returns `true` when valid.

#### Returns

Type: `Promise<boolean>`



### `reportValidity() => Promise<boolean>`

Checks for validity and shows the browser's validation message if the control is invalid.

#### Returns

Type: `Promise<boolean>`



### `setCustomValidity(message: string) => Promise<void>`

Sets a custom validation message. Pass an empty string to clear it.

#### Parameters

| Name      | Type     | Description |
| --------- | -------- | ----------- |
| `message` | `string` |             |

#### Returns

Type: `Promise<void>`




## Slots

| Slot          | Description                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------- |
|               | The checkbox's label.                                                                              |
| `"help-text"` | Text that describes how to use the checkbox. Alternatively, you can use the `help-text` attribute. |


## Shadow Parts

| Part                       | Description |
| -------------------------- | ----------- |
| `"base"`                   |             |
| `"checked-icon"`           |             |
| `"form-control-help-text"` |             |
| `"indeterminate-icon"`     |             |
| `"label"`                  |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
