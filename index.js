const Joi = require('joi')

module.exports = function({ joiOptions }) {
  const seneca = this

  function validate_schema_inward(ctx, data) {
    if (ctx.actdef.raw.schema$) {
      const result = Joi.validate(
        ctx.seneca.util.clean(data.msg),
        ctx.actdef.raw.schema$,
        joiOptions
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
