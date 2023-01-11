# react-classname-replacer

## Features

This extension is useful in React projects that uses module css. It provides a direct way to convert string classNames to module css style.

For example:

```jsx
<div className="my-class">
```

Now will be converted to:

```jsx
<div className={styles['my-class']}>
```

![](recording.gif)

## How to Use

Put cursor around target className content.

- Right click and select `Replace classname`, or
- Use keyboard shortcut:
  For mac: `Cmd K + R`
  For win: `Ctrl K + R`

## Extension Settings

No extra settings are provided/required.

## Known Issues

- The imported variable of module css is always `styles`, which is unchangeable.
- Cannot handle cross-line className conversions, so please make sure the content of a className property are all in the same line.

## Release Notes

### 0.0.1

Initial version of the tool.
