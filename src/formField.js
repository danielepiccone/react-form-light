import React from 'react'
import PropTypes from 'prop-types'
import _ from './utils'

// TODO move to utils
const bind = (cb, ...args) => (...args2) => cb(...args, ...args2)

export default function FormField (
  { field, component, ...restProps },
  context
) {
  const formAPIBound = _.mapValues(context.formAPI, d => bind(d, field))
  const formAPI = field ? formAPIBound : context.formAPI

  if (component) {
    return React.createElement(component, { ...restProps, formAPI })
  }

  return restProps.children(formAPI)
}

FormField.contextTypes = {
  formAPI: PropTypes.object
}
