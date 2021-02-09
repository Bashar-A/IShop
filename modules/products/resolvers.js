const Product = require('./model');

async function Products(parent, args, context, info) {
    const {
        skip = null,
        limit = null,
        filter = null
    } = args.body.variables?.options || {}

    const items = await Product.find(
        {},
        null,
        {skip,limit}
        )
    const totalItems = Object.keys(items).length

    return {
        items,
        totalItems
    }
}

async function addProduct(parent, args, context, info) {
    const input = args.body.variables.createProductInput
    const product = await Product.create(input)
    await product.save()
    return product
}

async function updateProduct(parent, args, context, info) {
    const input = args.body.variables.updateProductInput
    const product = await Product.findById(input.id)
    product.set(input)
    await product.save()
    return product
}

async function deleteProduct(parent, args, context, info) {
    const id = args.body.variables.id
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