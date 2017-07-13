import React from 'react'
import renderer from 'react-test-renderer'
import sinon from 'sinon';

import Form from './form'
import FormField from './formField'

describe('FormField', () => {
  const mocks = {}

  beforeEach(() => {
    mocks.Component = sinon.stub().returns(null)
  })

  it('when the component prop is there, renders a component', () => {
    const tree = renderer.create(
      <Form>
        <FormField component={mocks.Component} />
      </Form>
    )

    return expect(mocks.Component.called).toBeTrue
  })

  it('passes the formAPI to the component', () => {
    const tree = renderer.create(
      <Form>
        <FormField
          foo='bar'
          component={mocks.Component}
        />
      </Form>
    )

    const calledProps = mocks.Component.firstCall.args[0]

    return expect(calledProps.formAPI).toBeDefined()
  })

  it('passes the props to the component', () => {
    const tree = renderer.create(
      <Form>
        <FormField
          foo='bar'
          component={mocks.Component}
        />
      </Form>
    )

    const calledProps = mocks.Component.firstCall.args[0]

    return expect(calledProps.foo).toBe('bar')
  })
})
