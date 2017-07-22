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
const validator = simpleSchemaToReduxFormValidator(schema, ctx)
const res = validator({
  testString: 'Test',
  testObject: { string: '', number: 0 },
  testArray: [{ string: '', number: 0 }, { string: '' }]
})

it('should succeed', () => {
  expect(res).toEqual({
    testArray: [
      undefined,
      {
        number: { id: 'forms.required' }
      }
    ],
    testNumber: { id: 'forms.required' }
  })
})
