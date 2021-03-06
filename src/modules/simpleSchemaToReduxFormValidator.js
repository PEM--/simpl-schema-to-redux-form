import dot from 'dot-object'

const simpleSchemaToReduxFormValidator = (ctx, logger) => {
  const func = (values) => {
    ctx.validate(values)
    if (ctx.isValid()) return {}
    const ssErrors = ctx.validationErrors()
    const rfRes = ssErrors.reduce((acc, ssError) => {
      // Avoid taking into account multiple errors on one field, takes only the first
      if (acc[ssError.name]) return acc
      const ssMsg = ctx.keyErrorMessage(ssError.name)
      return { ...acc, [ssError.name]: ssMsg }
    }, {})
    func.values = values
    func.errors = rfRes
    if (logger) {
      logger.log('simpleSchemaToReduxFormValidator', { values: func.values, errors: func.errors })
    }
    return dot.object(rfRes)
  }
  func.values = null
  func.errors = null
  return func
}
export default simpleSchemaToReduxFormValidator
