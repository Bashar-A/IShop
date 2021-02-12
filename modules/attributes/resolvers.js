const Attribute = require('./model');

async function Attributes(parent, args, context, info) {
    const {
        filter = null,
        skip = null,
        limit = null
    } = args.body.variables?.options || {}

    if(filter)Object.keys(filter).forEach(filterKey => {
        Object.keys(filter[filterKey]).forEach(key => {
            filter[filterKey][`$${key}`] = filter[filterKey][key]
            delete filter[filterKey][key]
        })
    })

    const attributes = await Attribute.find(
        filter,
        null,
        {skip,limit}
        )

    const totalAttributes = Object.keys(attributes).length

    return {
        attributes,
        totalAttributes
    }
}

async function addAttribute(parent, args, context, info) {
    const input = args.body.variables.createAttributeInput
    const attribute = await Attribute.create(input)
    await attribute.save()
    return attribute
}

async function updateAttribute(parent, args, context, info) {
    const input = args.body.variables.updateAttributeInput
    const attribute = await Attribute.findById(input.id)
    attribute.set(input)
    await attribute.save()
    return attribute
}

async function deleteAttribute(parent, args, context, info) {
    const id = args.body.variables.id
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