# React form light
[![Build Status](https://travis-ci.org/dpiccone/react-form-light.svg?branch=master)](https://travis-ci.org/dpiccone/react-form-light)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

A lightweight version of [react-form](https://github.com/tannerlinsley/react-form) with a slightly minimal API

- Supporting a `component` prop instead of using children-as-functions
- Adding `withFormField` HOC which passes the bound/unbound version of the `form` api
- Dropped `FormError`, `FormInput` and standard Form Components
- Tests

Refer to the original project for the full documentation

## Installation

```bash
$ npm install react-form-light
```

## Example

```javascript
import React from 'react'
import { Form, FormField } from 'react-form-light'

const validate = (values) => {
  const { name } = values;
  return {
    name: !name ? 'A name is required' : undefined
  }
}

const CustomInput = ({ form }) => {
  return (
    <input
      value={form.getValue()}
      onChange={e => form.setValue(e.target.value)}
    />
  )
}

const CustomForm = (
  <Form
    onSubmit={this.props.handleSubmit}
    validate={validate}
  >
    <FormField field='foo' component={CustomInput} />
    <button type='submit'>Submit</button>
  </Form>
)

export default CustomForm
```

## Contributing

1. Create an issue
2. Submit a PR with passing tests
