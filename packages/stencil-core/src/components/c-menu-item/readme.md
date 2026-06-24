# c-menu-item



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type                     | Default    |
| ---------- | ---------- | ----------- | ------------------------ | ---------- |
| `checked`  | `checked`  |             | `boolean`                | `false`    |
| `disabled` | `disabled` |             | `boolean`                | `false`    |
| `loading`  | `loading`  |             | `boolean`                | `false`    |
| `type`     | `type`     |             | `"checkbox" \| "normal"` | `"normal"` |
| `value`    | `value`    |             | `string`                 | `""`       |


## Events

| Event        | Description | Type                |
| ------------ | ----------- | ------------------- |
| `slotchange` |             | `CustomEvent<void>` |


## Methods

### `getTextLabel() => Promise<string>`



#### Returns

Type: `Promise<string>`




## Slots

| Slot        | Description                                                  |
| ----------- | ------------------------------------------------------------ |
|             | The menu item's label.                                       |
| `"prefix"`  | Used to prepend an icon or similar element to the menu item. |
| `"submenu"` | Used to denote a nested menu.                                |
| `"suffix"`  | Used to append an icon or similar element to the menu item.  |


## Shadow Parts

| Part             | Description                                                   |
| ---------------- | ------------------------------------------------------------- |
| `"base"`         | The component's base wrapper.                                 |
| `"checked-icon"` | The checked icon, visible only when the menu item is checked. |
| `"label"`        | The menu item label.                                          |
| `"prefix"`       | The prefix container.                                         |
| `"spinner"`      |                                                               |
| `"submenu-icon"` |                                                               |
| `"suffix"`       | The suffix container.                                         |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
