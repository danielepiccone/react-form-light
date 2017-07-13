import React from 'react'
import PropTypes from 'prop-types'
import _ from './utils'

export default function FormField (
  { field, component, ...restProps },
  context
) {
  const formApiBound = _.mapValues(context.formApi, d => _.bind(d, field))
  const form = field ? formAPIBound : context.formApi

  if (component) {
    return React.createElement(component, { ...restProps, form })
  }

  return restProps.children(form)
}

FormField.contextTypes = {
  formApi: PropTypes.object
}
