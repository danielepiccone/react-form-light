import React from 'react'
import PropTypes from 'prop-types'
import _ from './utils'

export default function withFormField (field, Component) {
  if (typeof field !== 'string') {
    field = null
    Component = arguments[0]
  }

  function formField(props, context) {
    let form
    if (field) {
      form = _.mapValues(context.formApi, method => _.bind(method, field))
    } else {
      form = context.formApi
    }

    return React.createElement(
      Component,
      { form, ...props }
    )
  }

  formField.contextTypes = {
    formApi: PropTypes.object.isRequired
  }

  return formField
}
