import moize from 'moize'
import React from 'react'
// import { compose, onlyUpdateForKeys, pure, withHandlers, withPropsOnChange } from 'recompose'
// import { Field, reduxForm } from 'redux-form'
import SimpleSchema from 'simpl-schema'

class Autoform {
  constructor (options) {
    this.options = {
      defaultComponent: React.DOM.input,
      modelFieldTransformer: this.defaultModelFieldTransformer,
      ...options
    }
    this.formFields = this.options.formFields
    this.model = this.options.model
    this.modelFieldTransformer = this.options.modelFieldTransformer
  }
  defaultModelFieldTransformer = (model, fieldName) =>
    ({ ...model[`${fieldName}.current`], optional: true })
  fieldGroups = moize(() => Object.keys(this.formFields), { maxArgs: 0 })
  modelKeys = moize(() =>
    this.fieldGroups().reduce((acc, key) =>
      acc.concat(Object.keys(this.formFields[key].fieldGroup)),
    []), { maxArgs: 0 })
  mainSchema = moize(() => new SimpleSchema(
    this.modelKeys().reduce((acc, key) => {
      acc[key] = this.modelFieldTransformer(this.model, key)
      return acc
    }, {})
  ), { maxArgs: 0 })
}
export default Autoform
