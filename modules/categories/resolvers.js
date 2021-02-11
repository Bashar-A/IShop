const Category = require('./model');

async function Categories(parent, args, context, info) {
    return await Category.find({})
}

async function addCategory(parent, args, context, info) {
    const input = args.body.variables.createCategoryInput
    const category = await Category.create(input)
    await category.save()
    return category
}

async function updateCategory(parent, args, context, info) {
    const input = args.body.variables.updateCategoryInput
    const category = await Category.findById(input.id)
    category.set(input)
    await category.save()
    return category
}

async function deleteCategory(parent, args, context, info) {
    const id = args.body.variables.id
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