import React from 'react'
import omit from 'lodash/omit'
import SimpleSchema from 'simpl-schema'

import { Autoform } from '../../index.min'

const config = {
  formName: 'EditForm',
  model: {
    description: { type: String },
    location: { type: String },
    comments: { type: String },
    // This field is not used in the form
    otherKeys: { type: String }
  },
  modelFieldTransformer: (model, fieldName) => ({ ...model[fieldName] }),
  ValidationButton: React.DOM.button,
  CancellationButton: React.DOM.button,
  formFields: {
    firstLine: {
      fieldGroup: {
        description: { reduxFormFieldProps: {}, componentProps: {} },
        location: { reduxFormFieldProps: {}, componentProps: {} }
      }
    },
    secondLine: {
      fieldGroup: {
        comments: { reduxFormFieldProps: {}, componentProps: {} }
      }
    }
  }
}

const autoform = new Autoform(config)

it('produces a list of fieldGroups', () => {
  expect(autoform.fieldGroups()).toEqual(['firstLine', 'secondLine'])
})

it('produces a list of distinct keys on the model', () => {
  expect(autoform.modelKeys()).toEqual(['description', 'location', 'comments'])
})

it('produces a SimpleSchema for the form', () => {
  const resultSchema = new SimpleSchema(omit(config.model, 'otherKeys'))
  expect(autoform.mainSchema().objectKeys()).toEqual(resultSchema.objectKeys())
  expect(autoform.mainSchema().objectKeys()).toEqual(autoform.modelKeys())
})
