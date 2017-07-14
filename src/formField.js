import React from 'react'
import PropTypes from 'prop-types'
import _ from './utils'

export default function FormField (
  { field, component, ...restProps },
  context
) {
  if (!component) {
    return null
  }

  const formApiBound = _.mapValues(context.formApi, d => _.bind(d, field))
  const form = field ? formApiBound : context.formApi

  return React.createElement(component, { ...restProps, form })
}

FormField.propTypes = {
  component: PropTypes.func.isRequired
}

FormField.contextTypes = {
  formApi: PropTypes.object
}
