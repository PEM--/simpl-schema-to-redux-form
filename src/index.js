import dot from 'dot-object'

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
}
