import SimpleSchema from 'simpl-schema'
import dot from 'dot-object'

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

export const simpleSchemaToReduxFormValidator = (schema, ctx) => (values) => {
  ctx.validate(values)
  if (ctx.isValid()) return {}
  const ssErrors = ctx.validationErrors()
  const rfRes = ssErrors.reduce((acc, ssError) => {
    // Avoid taking into account multiple errors on one field, takes only the first
    if (acc[ssError.name]) return acc
    const ssMsg = ctx.keyErrorMessage(ssError.name)
    return { ...acc, [ssError.name]: ssMsg }
  }, {})
  return dot.object(rfRes)
};

const validator = simpleSchemaToReduxFormValidator(schema, ctx)
const res = validator({
  testString: 'Test',
  testObject: { string: '', number: 0 },
  testArray: [{ string: '', number: 0 }, { string: '' }]
})
console.log(JSON.stringify(res))
