# c-button



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                       | Type                                                                                  | Default                 |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------- |
| `caret`    | `caret`    | Draws the button with a caret.                                                                    | `boolean`                                                                             | `false`                 |
| `circle`   | `circle`   | Draws a circular icon button.                                                                     | `boolean`                                                                             | `false`                 |
| `disabled` | `disabled` | Disables the button.                                                                              | `boolean`                                                                             | `false`                 |
| `download` | `download` | Tells the browser to download the linked file as this filename. Only used when `href` is present. | `string`                                                                              | `undefined`             |
| `href`     | `href`     | When set, renders as an `<a>` with this href instead of a `<button>`.                             | `string`                                                                              | `""`                    |
| `loading`  | `loading`  | Draws the button in a loading state.                                                              | `boolean`                                                                             | `false`                 |
| `name`     | `name`     | The name of the button, submitted as a name/value pair with form data.                            | `string`                                                                              | `""`                    |
| `outline`  | `outline`  | Draws an outlined button.                                                                         | `boolean`                                                                             | `false`                 |
| `pill`     | `pill`     | Draws a pill-style button with rounded edges.                                                     | `boolean`                                                                             | `false`                 |
| `rel`      | `rel`      | Maps to the underlying link's `rel` attribute. Only used when `href` is present.                  | `string`                                                                              | `"noreferrer noopener"` |
| `size`     | `size`     | The button's size.                                                                                | `"large" \| "medium" \| "small"`                                                      | `"medium"`              |
| `target`   | `target`   | Tells the browser where to open the link. Only used when `href` is present.                       | `"_blank" \| "_parent" \| "_self" \| "_top"`                                          | `undefined`             |
| `tooltip`  | `tooltip`  | Tooltip title passed through to the native element.                                               | `string`                                                                              | `""`                    |
| `type`     | `type`     | The type of button. Defaults to `button`. Set to `submit` to submit the surrounding form.         | `"button" \| "reset" \| "submit"`                                                     | `"button"`              |
| `value`    | `value`    | The value of the button, submitted as a pair with the button's name.                              | `string`                                                                              | `""`                    |
| `variant`  | `variant`  | The button's theme variant.                                                                       | `"danger" \| "default" \| "neutral" \| "primary" \| "success" \| "text" \| "warning"` | `"default"`             |


## Events

| Event      | Description                                                | Type                |
| ---------- | ---------------------------------------------------------- | ------------------- |
| `cBlur`    | Emitted when the button loses focus.                       | `CustomEvent<void>` |
| `cFocus`   | Emitted when the button gains focus.                       | `CustomEvent<void>` |
| `cInvalid` | Emitted when the form control fails constraint validation. | `CustomEvent<void>` |


## Methods

### `checkValidity() => Promise<boolean>`

Checks validity without showing a validation message.

#### Returns

Type: `Promise<boolean>`



### `removeFocus() => Promise<void>`

Removes focus from the button.

#### Returns

Type: `Promise<void>`



### `reportValidity() => Promise<boolean>`

Checks validity and shows the browser's validation message if invalid.

#### Returns

Type: `Promise<boolean>`



### `setCustomValidity(message: string) => Promise<void>`

Sets a custom validation message. Pass an empty string to restore validity.

#### Parameters

| Name      | Type     | Description |
| --------- | -------- | ----------- |
| `message` | `string` |             |

#### Returns

Type: `Promise<void>`



### `setFocus(options?: FocusOptions) => Promise<void>`

Sets focus on the button.

#### Parameters

| Name      | Type           | Description |
| --------- | -------------- | ----------- |
| `options` | `FocusOptions` |             |

#### Returns

Type: `Promise<void>`



### `triggerClick() => Promise<void>`

Simulates a click on the button.

#### Returns

Type: `Promise<void>`




## Slots

| Slot       | Description                                      |
| ---------- | ------------------------------------------------ |
|            | The button's label.                              |
| `"prefix"` | A presentational prefix icon or similar element. |
| `"suffix"` | A presentational suffix icon or similar element. |


## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"base"`    |             |
| `"caret"`   |             |
| `"label"`   |             |
| `"prefix"`  |             |
| `"spinner"` |             |
| `"suffix"`  |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
