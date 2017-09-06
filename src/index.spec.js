import SimpleSchema from 'simpl-schema'
import { simpleSchemaToReduxFormValidator } from '../index.min'

SimpleSchema.setDefaultMessages({
  initialLanguage: 'en',
  messages: {
    en: {
      required: () => ({ id: 'forms.required' })
    }
  }
})

const schema = new SimpleSchema({
  testNumber: { type: Number },
  testString: { type: String },
  testObject: { type: Object },
  'testObject.string': { type: String },
  'testObject.number': { type: Number },
  testArray: { type: Array },
  'testArray.$': { type: Object },
  'testArray.$.string': { type: String },
  'testArray.$.number': { type: Number }
})

const ctx = schema.newContext()
const validate = simpleSchemaToReduxFormValidator(ctx)
const values = {
  testString: 'Test',
  testObject: { string: '', number: 0 },
  testArray: [{ string: '', number: 0 }, { string: '' }]
}
const res = validate(values)

it('should detect errors', () => {
  const expectedErrors = {
    testArray: [
      undefined,
      {
        number: { id: 'forms.required' }
      }
    ],
    testNumber: { id: 'forms.required' }
  }
  expect(res).toEqual(expectedErrors)
  expect(validate.values).toEqual(values)
  expect(validate.errors).toEqual(expectedErrors)
})
