# c-drawer



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                                                                                                                            | Type                                    | Default |
| ----------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------- |
| `contained` | `contained` | By default the drawer slides out of its containing block (usually the viewport). Set this to make it slide out of its parent element instead — add `position: relative` to the parent. | `boolean`                               | `false` |
| `label`     | `label`     | The drawer's label as displayed in the header. Always provide one even with `noHeader`, for accessibility. For HTML content use the `label` slot instead.                              | `string`                                | `''`    |
| `noHeader`  | `no-header` | Removes the header. This also removes the default close button, so ensure you provide an easy, accessible way for users to dismiss the drawer.                                         | `boolean`                               | `false` |
| `open`      | `open`      | Indicates whether or not the drawer is open. Toggle this to show/hide, or use show()/hide().                                                                                           | `boolean`                               | `false` |
| `placement` | `placement` | The direction from which the drawer will open.                                                                                                                                         | `"bottom" \| "end" \| "start" \| "top"` | `'end'` |


## Events

| Event           | Description | Type                                                                  |
| --------------- | ----------- | --------------------------------------------------------------------- |
| `cAfterHide`    |             | `CustomEvent<void>`                                                   |
| `cAfterShow`    |             | `CustomEvent<void>`                                                   |
| `cHide`         |             | `CustomEvent<void>`                                                   |
| `cInitialFocus` |             | `CustomEvent<void>`                                                   |
| `cRequestClose` |             | `CustomEvent<{ source: "close-button" \| "keyboard" \| "overlay"; }>` |
| `cShow`         |             | `CustomEvent<void>`                                                   |


## Methods

### `hide() => Promise<void>`

Hides the drawer.

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Shows the drawer.

#### Returns

Type: `Promise<void>`




## Slots

| Slot               | Description                                              |
| ------------------ | -------------------------------------------------------- |
|                    | The drawer's main content.                               |
| `"footer"`         | The drawer's footer, usually one or more buttons.        |
| `"header-actions"` | Optional actions to add to the header.                   |
| `"label"`          | The drawer's label. Alternatively, use the `label` prop. |


## Shadow Parts

| Part               | Description                                                           |
| ------------------ | --------------------------------------------------------------------- |
| `"base"`           | The component's base wrapper.                                         |
| `"body"`           | The drawer's body.                                                    |
| `"close-button"`   | The close button.                                                     |
| `"footer"`         | The drawer's footer.                                                  |
| `"header"`         | The drawer's header. This element wraps the title and header actions. |
| `"header-actions"` | Optional actions to add to the header.                                |
| `"overlay"`        | The overlay that covers the screen behind the drawer.                 |
| `"panel"`          | The drawer's panel (where the drawer and its content are rendered).   |
| `"title"`          | The drawer's title.                                                   |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
