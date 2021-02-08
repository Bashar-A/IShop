const Category = require('./model');

async function Categories(parent, args, context, info) {
    return await Category.find({})
}

async function addCategory(parent, args, context, info) {
    const input = context.variableValues.createCategoryInput
    const Category = await Category.create(input)
    await Category.save()
    return Category
}

async function updateCategory(parent, args, context, info) {
    const input = context.variableValues.updateCategoryInput
    const Category = await Category.findById(input.id)
    Category.set(input)
    await Category.save()
    return Category
}

async function deleteCategory(parent, args, context, info) {
    const id = context.variableValues.id
    console.debug(context.variableValues)
    const Category = await Category.findById(id)
    if(!Category)return false;
    await Category.remove()
    return true
}


module.exports = {
    Categories,
    addCategory,
    updateCategory,
    deleteCategory
  }