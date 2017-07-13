/* eslint-env mocha */

import React from 'react'
import sinon from 'sinon'
import renderer from 'react-test-renderer'

import unexpected from 'unexpected'
import unexpectedReact from 'unexpected-react'

import Form, { formShape } from './form'

const expect = unexpected
  .clone()
  .use(unexpectedReact)

const getFormInstance = jsx => {
  const tree = renderer.create(jsx)
  return tree._component._renderedComponent._instance
}

describe('Form', () => {
  it('exports the form api shape', () => {
    return expect(
      formShape,
      'to be defined'
    )
  })

  it('renders as a <form> as a default', () => {
    return expect(
      <Form />,
      'to render as',
      <form />
    )
  })

  it('renders as a component if the component prop is present', () => {
    const Foo = props => <span>{props.foo}</span>

    return expect(
      <Form foo='bar' component={Foo} />,
      'to render as',
      <Foo foo='bar' />
    )
  })

  it('passes the props to the component', () => {
    return expect(
      <Form foo='bar' />,
      'to render as',
      <form foo='bar' />
    )
  })

  it('exposes the form api on the context', async () => {
    let renderContext

    const Foo = (props, context) => {
      renderContext = context
      return null
    }

    Foo.contextTypes = Form.childContextTypes

    renderer.create(
      <Form component={Foo} />
    )

    return expect(
      renderContext,
      'to satisfy',
      {
        formApi: {
          // TODO assert all form API
          setValue: expect.it('to be defined'),
          getValue: expect.it('to be defined'),
          submitForm: expect.it('to be defined')
        }
      }
    )
  })

  it('updates the values when receiving new values as prop', async () => {
    const values = { foo: 'bar' }

    const instance = getFormInstance(
      <Form values={values} />
    )

    expect(
      instance.state.values,
      'to exhaustively satisfy',
      values
    )

    const newValues = { baz: 'bar' }

    instance.componentWillReceiveProps({ values: newValues })

    expect(
      instance.state.values,
      'to exhaustively satisfy',
      newValues
    )
  })

  it('keeps the same values if a prop is passed', async () => {
    const values = { foo: 'bar' }

    const instance = getFormInstance(
      <Form values={values} />
    )

    expect(
      instance.state.values,
      'to exhaustively satisfy',
      values
    )

    instance.componentWillReceiveProps({ baz: 'bar' })

    expect(
      instance.state.values,
      'to exhaustively satisfy',
      values
    )
  })

  describe('props.defaultValues', () => {
    it('initializes the form with default values', () => {
      const instance = getFormInstance(
        <Form defaultValues={{ foo: 'baz' }} />
      )

      return expect(
        instance.state,
        'to exhaustively satisfy',
        {
          touched: {},
          errors: null, // TODO shouldnt it be {}?
          nestedErrors: {},
          values: {
            foo: 'baz'
          }
        }
      )
    })
  })

  describe('props.loadState', () => {
    it('load the state and initialize the form', () => {
      const loadState = () => ({
        values: {
          foo: 'bar'
        },
        touched: {
          foo: true
        }
      })
      const instance = getFormInstance(
        <Form loadState={loadState} />
      )
      return expect(
        instance.state,
        'to exhaustively satisfy',
        {
          touched: {
            foo: true
          },
          values: {
            foo: 'bar'
          }
        }
      )
    })
  })

  describe('props.preValidate', () => {
    it('transforms the values before the validation', () => {
      const validateSpy = sinon.spy()
      const preValidate = values => {
        return {
          foo: !values.foo,
          baz: 'mee'
        }
      }

      const instance = getFormInstance(
        <Form preValidate={preValidate} validate={validateSpy} />
      )

      instance.setValue('foo', true)

      return expect(
        validateSpy.lastCall.args[0],
        'to satisfy',
        {
          foo: false,
          baz: 'mee'
        }
      )
    })
  })

  describe('props.validate', () => {
    // TODO assert where this is called
  })

  describe('props.onChange', () => {
    let instance, onChangeSpy

    beforeEach(() => {
      onChangeSpy = sinon.spy()
      instance = getFormInstance(
        <Form onChange={onChangeSpy} />
      )
    })

    it('is called when the component mounts', () => {
      expect(onChangeSpy.called, 'to be true')
    })

    it('is called when a value is set', () => {
      onChangeSpy.reset()

      const { setValue } = instance
      setValue('foo', 'bar')
      expect(onChangeSpy.called, 'to be true')
    })

    it('gets the current values as the first argument', () => {
      onChangeSpy.reset()

      const { setValue } = instance
      setValue('foo', 'bar')
      expect(
        onChangeSpy.firstCall.args[0],
        'to satisfy',
        {
          values: {
            foo: 'bar'
          },
          touched: {
            foo: true
          }
        }

      )
    })
  })

  describe('props.willUnmount', () => {
    const willUnmountSpy = sinon.spy()

    const tree = renderer.create(
      <Form willUnmount={willUnmountSpy} />
    )

    tree.unmount()

    return expect(
      willUnmountSpy.called,
      'to be',
      true
    )
  })

  describe('props.submitForm', () => {
    it('calls validation', () => {
      const validateSpy = sinon.spy()
      const instance = getFormInstance(
        <Form validate={validateSpy} />
      )

      instance.submitForm()

      return expect(
        validateSpy.called,
        'to be true'
      )
    })

    it('calls onValidationFail if the validation fails', () => {
      const onValidationFailSpy = sinon.spy()
      const validate = () => ({
        foo: 'fooerror'
      })
      const instance = getFormInstance(
        <Form validate={validate} onValidationFail={onValidationFailSpy} />
      )

      instance.submitForm()

      return expect(onValidationFailSpy.called, 'to be true')
    })
  })

  describe('form api', () => {
    let instance

    beforeEach(() => {
      instance = getFormInstance(
        <Form>
          <div>foo</div>
        </Form>
      )
    })

    it('initialize the form with empty values', () => {
      expect(instance.state.values, 'to exhaustively satisfy', {})
    })

    it('resets the form to the initial state', () => {
      const values = { foo: 'bar' }

      instance = getFormInstance(
        <Form values={values} />
      )

      const { setValue, resetForm } = instance

      setValue('foo', 'baz')

      resetForm()

      return expect(
        instance.state.values,
        'to exhaustively satisfy',
        values
      )
    })

    it('sets and get the value of a field', () => {
      const { setValue, getValue } = instance
      setValue('foo', 'bar')
      expect(
        instance.state.values.foo,
        'to be',
        'bar'
      )

      expect(
        getValue('foo'),
        'to be',
        'bar'
      )
    })

    it('sets and get the touched prop of a field', () => {
      const { setTouched, getTouched } = instance
      setTouched('foo')
      expect(
        instance.state.touched.foo,
        'to be',
        true
      )
      expect(
        getTouched('foo'),
        'to be',
        true
      )
    })

    it('adds a value to an array field', () => {
      const { addValue, setValue } = instance
      setValue('foo', [])
      addValue('foo', 'barz')
      expect(
        instance.state.values.foo,
        'to exhaustively satisfy',
        ['barz']
      )
    })

    it('removes a value from an array field', () => {
      const { removeValue, setValue } = instance
      setValue('foo', ['bar', 'moz', 'tex'])
      removeValue('foo', 1)
      expect(
        instance.state.values.foo,
        'to exhaustively satisfy',
        ['bar', 'tex']
      )
    })

    it('replaces all the value', () => {
      const { setAllValues } = instance

      expect(
        instance.state.values,
        'to exhaustively satisfy',
        {}
      )

      const newValues = {
        foo: 'baz',
        bar: 'foo'
      }

      setAllValues(newValues)

      expect(
        instance.state.values,
        'to exhaustively satisfy',
        newValues
      )
    })
  })
})
