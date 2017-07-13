import React from 'react'
import sinon from 'sinon'
import renderer from 'react-test-renderer'

import unexpected from 'unexpected'
import unexpectedReact from 'unexpected-react'

import Form from './form'
import withFormField from './withFormField'

const expect = unexpected
  .use(unexpectedReact)

describe('withFormField', () => {
  const mocks = {}

  beforeEach(() => {
    mocks.Component = sinon.stub().returns(null)
  })

  it('gets the form api in a prop when in the form context', () => {
    let formApi

    const FormField = withFormField(props => {
      formApi = props.form
      return null
    })

    const tree = renderer.create(
      <Form>
        <FormField />
      </Form>
    )

    expect(
      formApi,
      'to have keys',
      [
        // TODO assert all the form api
        'getValue',
        'setValue',
        'getError',
        'getTouched',
        'setTouched',
        'resetForm',
        'submitForm',
        'addValue',
        'removeValue'
      ]
    )
  })

  it('gets the unbounded form api', () => {
    let formApi

    const FormField = withFormField(props => {
      formApi = props.form
      return null
    })

    const tree = renderer.create(
      <Form>
        <FormField />
      </Form>
    )

    expect(
      formApi.getTouched.length,
      'to be',
      1
    )
  })

  it('gets the bounded api when passing a field', () => {
    let formApi

    const FormField = withFormField('foo', props => {
      formApi = props.form
      return null
    })

    const tree = renderer.create(
      <Form>
        <FormField />
      </Form>
    )

    expect(
      formApi.getTouched.length,
      'to be',
      0
    )
  })
})
