const Product = require('./model');

async function Products(parent, args, context, info) {
    return await Product.find({})
}

async function addProduct(parent, args, context, info) {
    const input = context.variableValues.createProductInput
    const product = await Product.create(input)
    await product.save()
    return product
}

async function updateProduct(parent, args, context, info) {
    const input = context.variableValues.updateProductInput
    const product = await Product.findById(input.id)
    product.set(input)
    await product.save()
    return product
}

async function deleteProduct(parent, args, context, info) {
    const id = context.variableValues.id
    console.debug(context.variableValues)
    const product = await Product.findById(id)
    if(!product)return false;
    await product.remove()
    return true
}


module.exports = {
    Products,
    addProduct,
    updateProduct,
    deleteProduct
  }