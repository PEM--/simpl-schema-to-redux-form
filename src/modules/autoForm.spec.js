import { Autoform } from '../../index.min'

const autoform = new Autoform({
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
})

it('should produce a list of distinct keys on the model', () => {
  expect(autoform.modelKeys()).toEqual(['description', 'location', 'comments'])
})
