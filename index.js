const Joi = require('joi')
const Hoek = require('hoek')

module.exports = function({ joiOptions }) {
  const seneca = this
  const defaults = { allowUnknown: true }
  const validationOptions = Hoek.applyToDefaults(defaults, joiOptions)

  function validate_schema_inward(ctx, data) {
    if (ctx.actdef.raw.schema$) {
      const result = Joi.validate(
        ctx.seneca.util.clean(data.msg),
        ctx.actdef.raw.schema$,
        validationOptions
      )

      if (result.error) {
        return {
          kind: 'result',
          result: { schemaError: result.error, ok: false }
        }
      }
    }
  }

  seneca.inward(validate_schema_inward)
}
