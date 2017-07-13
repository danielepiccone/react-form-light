import React from 'react'
import sinon from 'sinon';
import renderer from 'react-test-renderer'

import unexpected from 'unexpected'
import unexpectedReact from 'unexpected-react'
import unexpectedSinon from 'unexpected-sinon'

import Form from './form'
import FormField from './formField'

const expect = unexpected
  .use(unexpectedReact)
  .use(unexpectedSinon)

describe('FormField', () => {
  const mocks = {}

  beforeEach(() => {
    mocks.Component = sinon.stub().returns(null)
  })

  it('when the component prop is there, calls the component constructor', () => {
    const tree = renderer.create(
      <Form>
        <FormField component={mocks.Component} />
      </Form>
    )

    return expect(
      mocks.Component,
      'was called'
    )
  })

  it('passes the form api to the component', () => {
    const tree = renderer.create(
      <Form>
        <FormField
          foo='bar'
          component={mocks.Component}
        />
      </Form>
    )

    const calledProps = mocks.Component.firstCall.args[0]

    return expect(
      calledProps.form,
      'to be defined'
    )
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

    return expect(
      calledProps.foo,
      'to be',
      'bar'
    )
  })
})
