import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { createForm, FormField } from '../src/'

storiesOf('Form', module)
  .add('basic', () => {
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

    return createForm({
      defaultValues,
      onSubmit: handleSubmit,
      validate: handleValidation
    }, CustomForm)()
  })
