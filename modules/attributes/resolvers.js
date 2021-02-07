const Attribute = require('./model');

async function Attributes(parent, args, context, info) {
    return await Attribute.find({})
}
async function addAttribute(parent, args, context, info) {
    const arguments = context.variableValues
    console.debug(args)
    const attribute = await Attribute.Create(...arguments)
    await attribute.save()
    return attribute
}


module.exports = {
    Attributes,
    addAttribute
  }