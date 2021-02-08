const Attribute = require('./model');

async function Attributes(parent, args, context, info) {
    return await Attribute.find({})
}

async function addAttribute(parent, args, context, info) {
    const input = context.variableValues.createAttributeInput
    const attribute = await Attribute.create(input)
    await attribute.save()
    return attribute
}

async function updateAttribute(parent, args, context, info) {
    const input = context.variableValues.updateAttributeInput
    const attribute = await Attribute.findById(input.id)
    attribute.set(input)
    await attribute.save()
    return attribute
}

async function deleteAttribute(parent, args, context, info) {
    const id = context.variableValues.id
    const attribute = await Attribute.findById(id)
    if(!attribute)return false;
    await attribute.remove()
    return true
}


module.exports = {
    Attributes,
    addAttribute,
    updateAttribute,
    deleteAttribute
  }