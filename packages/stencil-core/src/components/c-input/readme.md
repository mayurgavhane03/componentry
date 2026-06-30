# c-input



<!-- Auto Generated Below -->


## Properties

| Property                           | Attribute              | Description                                                                                                                  | Type                                                                                                                | Default     |
| ---------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------- |
| `clearable`                        | `clearable`            | Adds a clear button when the input is not empty.                                                                             | `boolean`                                                                                                           | `false`     |
| `disabled`                         | `disabled`             | Disables the input.                                                                                                          | `boolean`                                                                                                           | `false`     |
| `filled`                           | `filled`               | Draws a filled input.                                                                                                        | `boolean`                                                                                                           | `false`     |
| `helpText`                         | `help-text`            | The input's help text. If you need to display HTML, use the `help-text` slot instead.                                        | `string`                                                                                                            | `""`        |
| `inputAutocapitalize` _(required)_ | `input-autocapitalize` |                                                                                                                              | `string`                                                                                                            | `undefined` |
| `inputAutocomplete` _(required)_   | `input-autocomplete`   |                                                                                                                              | `string`                                                                                                            | `undefined` |
| `inputAutocorrect` _(required)_    | `input-autocorrect`    |                                                                                                                              | `"off" \| "on"`                                                                                                     | `undefined` |
| `inputAutofocus` _(required)_      | `input-autofocus`      |                                                                                                                              | `boolean`                                                                                                           | `undefined` |
| `inputEnterkeyhint` _(required)_   | `input-enterkeyhint`   |                                                                                                                              | `string`                                                                                                            | `undefined` |
| `inputInputmode` _(required)_      | `input-inputmode`      |                                                                                                                              | `string`                                                                                                            | `undefined` |
| `inputTitle`                       | `input-title`          | Title attribute passed through to the native input.                                                                          | `string`                                                                                                            | `""`        |
| `label`                            | `label`                | The input's label. If you need to display HTML, use the `label` slot instead.                                                | `string`                                                                                                            | `""`        |
| `max` _(required)_                 | `max`                  |                                                                                                                              | `number \| string`                                                                                                  | `undefined` |
| `maxlength` _(required)_           | `maxlength`            |                                                                                                                              | `number`                                                                                                            | `undefined` |
| `min` _(required)_                 | `min`                  |                                                                                                                              | `number \| string`                                                                                                  | `undefined` |
| `minlength` _(required)_           | `minlength`            |                                                                                                                              | `number`                                                                                                            | `undefined` |
| `name`                             | `name`                 | The name of the input, submitted as a name/value pair with form data.                                                        | `string`                                                                                                            | `""`        |
| `noSpinButtons`                    | `no-spin-buttons`      | Hides the browser's built-in increment/decrement spin buttons for number inputs.                                             | `boolean`                                                                                                           | `false`     |
| `passwordToggle`                   | `password-toggle`      | Adds a button to toggle the password's visibility. Only applies to password types.                                           | `boolean`                                                                                                           | `false`     |
| `pattern` _(required)_             | `pattern`              | A regular expression pattern to validate input against.                                                                      | `string`                                                                                                            | `undefined` |
| `pill`                             | `pill`                 | Draws a pill-style input with rounded edges.                                                                                 | `boolean`                                                                                                           | `false`     |
| `placeholder`                      | `placeholder`          | Placeholder text to show as a hint when the input is empty.                                                                  | `string`                                                                                                            | `""`        |
| `readonly`                         | `readonly`             | Makes the input readonly.                                                                                                    | `boolean`                                                                                                           | `false`     |
| `required`                         | `required`             | Makes the input a required field.                                                                                            | `boolean`                                                                                                           | `false`     |
| `size`                             | `size`                 | The input's size.                                                                                                            | `"large" \| "medium" \| "small"`                                                                                    | `"medium"`  |
| `spellcheck`                       | `spellcheck`           | Enables spell checking on the input.                                                                                         | `boolean`                                                                                                           | `true`      |
| `step` _(required)_                | `step`                 |                                                                                                                              | `"any" \| number`                                                                                                   | `undefined` |
| `type`                             | `type`                 | The type of input. Works the same as a native <input> element, but only a subset of types are supported. Defaults to `text`. | `"date" \| "datetime-local" \| "email" \| "number" \| "password" \| "search" \| "tel" \| "text" \| "time" \| "url"` | `"text"`    |
| `value`                            | `value`                | The current value of the input.                                                                                              | `string`                                                                                                            | `""`        |


## Events

| Event      | Description | Type                |
| ---------- | ----------- | ------------------- |
| `cBlur`    |             | `CustomEvent<void>` |
| `cChange`  |             | `CustomEvent<void>` |
| `cClear`   |             | `CustomEvent<void>` |
| `cFocus`   |             | `CustomEvent<void>` |
| `cInput`   |             | `CustomEvent<void>` |
| `cInvalid` |             | `CustomEvent<void>` |


## Methods

### `checkValidity() => Promise<boolean>`

Checks for validity but does not show a validation message.

#### Returns

Type: `Promise<boolean>`



### `removeFocus() => Promise<void>`

Removes focus from the input.

#### Returns

Type: `Promise<void>`



### `reportValidity() => Promise<boolean>`

Checks for validity and shows the browser's validation message if invalid.

#### Returns

Type: `Promise<boolean>`



### `select() => Promise<void>`

Selects all the text in the input.

#### Returns

Type: `Promise<void>`



### `setCustomValidity(message: string) => Promise<void>`

Sets a custom validation message. Pass an empty string to restore validity.

#### Parameters

| Name      | Type     | Description |
| --------- | -------- | ----------- |
| `message` | `string` |             |

#### Returns

Type: `Promise<void>`



### `setFocus(options?: FocusOptions) => Promise<void>`

Sets focus on the input.

#### Parameters

| Name      | Type           | Description |
| --------- | -------------- | ----------- |
| `options` | `FocusOptions` |             |

#### Returns

Type: `Promise<void>`



### `setRangeText(replacement: string, start?: number, end?: number, selectMode?: "select" | "start" | "end" | "preserve") => Promise<void>`

Replaces a range of text with a new string.

#### Parameters

| Name          | Type                                         | Description |
| ------------- | -------------------------------------------- | ----------- |
| `replacement` | `string`                                     |             |
| `start`       | `number`                                     |             |
| `end`         | `number`                                     |             |
| `selectMode`  | `"select" \| "start" \| "end" \| "preserve"` |             |

#### Returns

Type: `Promise<void>`



### `setSelectionRange(selectionStart: number, selectionEnd: number, selectionDirection?: "forward" | "backward" | "none") => Promise<void>`

Sets the start and end positions of the text selection (0-based).

#### Parameters

| Name                 | Type                                | Description |
| -------------------- | ----------------------------------- | ----------- |
| `selectionStart`     | `number`                            |             |
| `selectionEnd`       | `number`                            |             |
| `selectionDirection` | `"none" \| "forward" \| "backward"` |             |

#### Returns

Type: `Promise<void>`



### `showPicker() => Promise<void>`

Displays the browser picker for an input element (only works if the browser supports it).

#### Returns

Type: `Promise<void>`



### `stepDown() => Promise<void>`

Decrements the value of a numeric input type by the value of the step attribute.

#### Returns

Type: `Promise<void>`



### `stepUp() => Promise<void>`

Increments the value of a numeric input type by the value of the step attribute.

#### Returns

Type: `Promise<void>`




## Slots

| Slot                   | Description                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| `"clear-icon"`         | An icon to use in lieu of the default clear icon.                                               |
| `"help-text"`          | Text that describes how to use the input. Alternatively, you can use the `help-text` attribute. |
| `"hide-password-icon"` | An icon to use in lieu of the default hide password icon.                                       |
| `"label"`              | The input's label. Alternatively, you can use the `label` attribute.                            |
| `"prefix"`             | Used to prepend a presentational icon or similar element to the input.                          |
| `"show-password-icon"` | An icon to use in lieu of the default show password icon.                                       |
| `"suffix"`             | Used to append a presentational icon or similar element to the input.                           |


## Shadow Parts

| Part                       | Description |
| -------------------------- | ----------- |
| `"base"`                   |             |
| `"clear-button"`           |             |
| `"form-control"`           |             |
| `"form-control-help-text"` |             |
| `"form-control-input"`     |             |
| `"form-control-label"`     |             |
| `"input"`                  |             |
| `"password-toggle-button"` |             |
| `"prefix"`                 |             |
| `"suffix"`                 |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
