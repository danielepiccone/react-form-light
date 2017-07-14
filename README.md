# React form light
[![Build Status](https://travis-ci.org/dpiccone/react-form-light.svg?branch=master)](https://travis-ci.org/dpiccone/react-form-light)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

A lightweight version of [react-form](https://github.com/tannerlinsley/react-form) with a slightly different API

- Supports a `component` prop instead of using children-as-functions
- Adds `createForm` and `withFormField` HOCs which decorates the component with the form api
- Drops `FormError`, `FormInput` and standard Form Components
- Tests


## Installation

```bash
$ npm install react-form-light
```

## Usage

Refer to the [original project](https://github.com/tannerlinsley/react-form) for the full documentation

### `createForm(options: object, Component)`

Provides the `form` prop to `Component` which exposes the [form api](https://github.com/tannerlinsley/react-form#form-api)

The `options` object will be passed as props to the `Form` component

### `withFormField(field: string, Component)`

Provides the `form` prop to `Component` which exposes the [form api](https://github.com/tannerlinsley/react-form#form-api)

The `field` object is used to bind the form api to a specific field

## Example

Check out the `storybook` branch

```javascript
import React from 'react'
import { createForm, FormField } from 'react-form-light'

const handleSubmit = values => {
  action('Submitted values')(values)
}

const handleValidation = values => {
  const { name } = values
  return {
    name: !name ? 'A name is required' : undefined
  }
}

const CustomInput = ({ form }) => {
  const { getTouched, getError, getValue, setValue } = form

  return (
    <p>
      <input
        type='text'
        value={getValue()}
        onChange={e => setValue(e.target.value)}
      />
      <br />
      <b>{getTouched() && getError()}</b>
    </p>
  )
}

const Values = ({ form: { getValue } }) => (
  <p>{JSON.stringify(getValue())}</p>
)

const CustomForm = props => {
  const { form: { submitForm } } = props
  console.log(props)
  return (
    <form onSubmit={submitForm}>
      <p>Name</p>
      <FormField field='name' component={CustomInput} />
      <FormField component={Values} />
      <button type='submit'>Submit me</button>
    </form>
  )
}

const defaultValues = {
  name: ''
}

export default createForm({
  defaultValues,
  onSubmit: handleSubmit,
  validate: handleValidation
}, CustomForm)
```

## Contributing

1. Create an issue
2. Submit a PR with passing tests
