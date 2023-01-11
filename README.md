# react-classname-replacer

## Features

This extension is useful in React projects that uses module css. It provides a direct way to convert string classNames to module css style. The famous [classnames](https://www.npmjs.com/package/classnames) library is supported.

For example:

```jsx
<div className="my-class">
```

Now will be converted to:

```jsx
<div className={styles['my-class']}>
```

## How to Use

1. Position cursor around target className content.

2. Right click and select `Replace classname`, or use keyboard shortcut:

- For mac: <kbd>⌘</kbd><kbd>K</kbd>+<kbd>R</kbd>
- For win: <kbd>Ctrl</kbd><kbd>K</kbd>+<kbd>R</kbd>

![](images/recording1.gif)

To specify a import name, right click and select `Replace classname with...`, or use keyboard shortcut:

- For mac: <kbd>⌘</kbd><kbd>K</kbd>+<kbd>T</kbd>
- For win: <kbd>Ctrl</kbd><kbd>K</kbd>+<kbd>T</kbd>

![](images/recording2.gif)

## User Configurations

Prefix: `react-classname-replacer.`

| Property             | Name                   | Description                                                                                                     | Default |
| -------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------- | ------- |
| importModuleName     | Import Module Name     | The default import name of css modules as written in `import xxx from 'styles.module.css`                       | styles  |
| useClassnamesLib     | Use classnames Lib     | Whether the _classnames_ library is in use - this will change the conversion when multiple classes are detected | `true`  |
| classnamesImportName | Classnames Import Name | The import name of _classnames_ library as written in `import xxx from 'classnames'`                            | cls     |

## Known Issues

- Cannot handle cross-line className conversions, so please make sure the content of a className property are all in the same line.

## Release Notes

### 0.1.0

Initial version of the tool.

### 0.2.0

Support user configuration and _classnames_ library.
