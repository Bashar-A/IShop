const Category = require('./model');

async function Categories(parent, args, context, info) {
    return await Category.find({})
}

async function addCategory(parent, args, context, info) {
    const input = context.variableValues.createCategoryInput
    const category = await Category.create(input)
    await category.save()
    return category
}

async function updateCategory(parent, args, context, info) {
    const input = context.variableValues.updateCategoryInput
    const category = await Category.findById(input.id)
    category.set(input)
    await category.save()
    return category
}

async function deleteCategory(parent, args, context, info) {
    const id = context.variableValues.id
    console.debug(context.variableValues)
    const category = await Category.findById(id)
    if(!category)return false;
    await category.remove()
    return true
}


module.exports = {
    Categories,
    addCategory,
    updateCategory,
    deleteCategory
  }