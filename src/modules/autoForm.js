import moize from 'moize'
import React from 'react'

class Autoform {
  constructor (options) {
    this.options = {
      defaultComponent: React.DOM.input,
      ...options
    }
    this.modelKeys = moize(() => {
      const { formFields } = this.options
      const fieldGroups = Object.keys(formFields)
      const modelKeys = fieldGroups.reduce((acc, key) =>
        acc.concat(Object.keys(formFields[key].fieldGroup)),
      [])
      return modelKeys
    }, { maxArgs: 0 })
  }
}
export default Autoform
