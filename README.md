# stylelint-rational-order

This package is a fork of [stylelint-config-rational-order](https://github.com/constverum/stylelint-config-rational-order/).

This version is designed to avoid use of internal api of another module and provide
some new features. As a drawback it could only be used as a function in stylelintrc.js.

## Usage

1. Add `stylelint`, `stylelint-order` and this package to your project.

2. In your stylelintrc.js config add `stylelint-order` plugin and its `order/properties-order` rule
like the following:

```javascript
{
  plugins: [
    'stylelint-order'
  ],
  rules: {
    'order/properties-order': stylelintRationalOrder(generalOptions, specificOptions)
  }
}

// or

{
  plugins: [
    'stylelint-order'
  ],
  rules: {
    'order/properties-order': [
      stylelintRationalOrder(generalOptions, specificOptions),

      // order/properties-order secondary options:
      emptyLineMinimumPropertyThreshold: 4
    ]
  }
}
```

## General options

General options object can have boolean `borderInBoxModel` field as well as any other primary
option from [stylelint-order/properties-order](https://github.com/hudochenkov/stylelint-order/blob/master/rules/properties-order/README.md#options).
Each option from this object except `borderInBoxModel` will be passed to every group.

#### borderInBoxModel

Defines to which group the **border** property belongs to.
If `true` **border** property belongs to the **box model section**.
The default value is `false` (**border** property belongs to the **visual section**).

## Specific options

Specific options object contains names of the groups with an option object for each group.
There are following names: `positioning`, `boxModel`, `typography`, `visual`, `animation`,
`misc`. Options object for a group contains the same fields as the group options object from
[stylelint-order/properties-order](https://github.com/hudochenkov/stylelint-order/blob/master/rules/properties-order/README.md#options)
plus `priority` field. The more the priority the closer a group should be to the top.

## FAQ

<details>
  <summary>Why should I use the rational order and group and sort CSS properties by type instead of alphabetical order?</summary>

  The pros and cons of both ways in detail:

* [Happy Potter and the Order of CSS](https://dev.to/thekashey/happy-potter-and-the-order-of-css-5ec)
* [“Outside In” — Ordering CSS Properties by Importance](https://webdesign.tutsplus.com/articles/outside-in-ordering-css-properties-by-importance--cms-21685)
</details>
