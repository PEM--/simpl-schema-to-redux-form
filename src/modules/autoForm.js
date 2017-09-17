import moize from 'moize'
import React from 'react'

class Autoform {
  constructor (options) {
    this.options = {
      defaultComponent: React.DOM.input,
      ...options
    }
    this.formFields = this.options.formFields
  }
  fieldGroups = moize(() => Object.keys(this.formFields), { maxArgs: 0 })
  modelKeys = moize(() =>
    this.fieldGroups().reduce((acc, key) =>
      acc.concat(Object.keys(this.formFields[key].fieldGroup)),
    []), { maxArgs: 0 })
}
export default Autoform
