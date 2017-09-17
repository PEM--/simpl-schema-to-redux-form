import React from 'react'

class Autoform {
  constructor (options) {
    this.options = {
      defaultComponent: React.DOM.input,
      ...options
    }
  }
}
export default Autoform
