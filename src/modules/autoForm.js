import moize from 'moize'
import React, { cloneElement } from 'react'
import { compose, pure, withPropsOnChange } from 'recompose'
import { Field, reduxForm } from 'redux-form'
import SimpleSchema from 'simpl-schema'

import simpleSchemaToReduxFormValidator from './simpleSchemaToReduxFormValidator'
import { formFieldFactory } from './formFieldFactory'

class Autoform {
  constructor (options) {
    const optionsWithDefault = {
      modelFieldTransformer: this.defaultModelFieldTransformer,
      ...options
    }
    Object.assign(this, optionsWithDefault)
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
  createForm = () => {
    const Form = compose(
      withPropsOnChange(
        () => false,
        () => {
          const ctx = this.mainSchema().newContext()
          const factory = formFieldFactory(this.defaultComponent, this.mainSchema(), ctx)
          const keyFactory = (key, props = {}) =>
            ({ [key]: factory({ name: key, ...props, hasValidation: false }) })
          const validate = simpleSchemaToReduxFormValidator(ctx)
          return {
            formFields: moize(() => this.fieldGroups().reduce((formGroup, lineKey) => {
              formGroup[lineKey] = Object.keys(this.formFields[lineKey].fieldGroup).reduce((lineComp, compKey) => ({
                ...lineComp,
                ...keyFactory(compKey, {
                  ...this.formFields[lineKey].fieldGroup[compKey].reduxFormFieldProps,
                  others: this.formFields[lineKey].fieldGroup[compKey].componentProps
                })
              }), {})
              return formGroup
            }, {}), { maxArgs: 0 }),
            validate
          }
        }
      ),
      reduxForm({ form: this.formName }),
      pure
    )(({ className, formFields, handleSubmit, pristine, submitting, valid, isCompany }) => (
      <form className={className} onSubmit={handleSubmit}>
        <div className='FormFields'>
          {this.fieldGroups().map(lineKey =>
            <div className='FormFieldGroup' key={lineKey}>
              {Object.keys(formFields()[lineKey]).map(fieldKey =>
                <Field key={formFields()[lineKey][fieldKey].name} submitting={submitting} {...formFields()[lineKey][fieldKey]} />
              )}
            </div>
          )}
        </div>
        <div className='FormActions'>
          {cloneElement(this.validationButton, {
            disabled: submitting || pristine || !valid,
            onClick: handleSubmit
          })}
        </div>
      </form>
    ))
    Form.displayName = this.formName
    return Form
  }
}
export default Autoform
