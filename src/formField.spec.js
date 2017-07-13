/* eslint-env mocha */

import React from 'react'
import sinon from 'sinon'
import renderer from 'react-test-renderer'

import unexpected from 'unexpected'
import unexpectedReact from 'unexpected-react'

import Form from './form'
import FormField from './formField'

const expect = unexpected
  .use(unexpectedReact)

describe('FormField', () => {
  const mocks = {}

  beforeEach(() => {
    mocks.Component = sinon.stub().returns(null)
  })

  it('when the component prop is there, calls the component constructor', () => {
    renderer.create(
      <Form>
        <FormField component={mocks.Component} />
      </Form>
    )

    return expect(
      mocks.Component.called,
      'to be true'
    )
  })

  it('passes the form api to the component', () => {
    renderer.create(
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
    renderer.create(
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
