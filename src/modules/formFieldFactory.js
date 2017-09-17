export const validator = (ctx, key) => (value) => {
  if (!ctx.validate({ [key]: value }, { keys: [key] })) {
    return ctx.keyErrorMessage(key)
  }
  return undefined
}

const numberNormalization = step => (value) => {
  if (typeof value !== 'number' && value) {
    if (step && parseFloat(step) < 1) {
      return parseFloat(value.replace(/,/, '.'))
    } else {
      return parseInt(value, 10)
    }
  }
  return isNaN(value) ? 0 : value
}

const emailNormalization = () => value => value.toLowerCase()

export const formFieldFactory = (component, schema, ctx) => ({
  type = 'text',
  name,
  fieldName,
  hasClassName = false,
  hasValidation = true,
  component,
  others = {}
}) => {
  const res = {
    type,
    name,
    id: schema.label(fieldName || name),
    component,
    required: !schema.getDefinition(fieldName || name).optional || others.required,
    ...others
  }
  if (hasClassName) res.displayClassName = fieldName || name
  if (ctx && hasValidation) res.validate = validator(ctx, name)
  if (others.type === 'number') res.normalize = numberNormalization(others.step)
  if (others.type === 'email') res.normalize = emailNormalization(others.step)
  return res
}
const formFieldFactoryExports = {
  validator,
  formFieldFactory
}
export default formFieldFactoryExports
