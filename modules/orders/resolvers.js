const Order = require('./model');

async function Orders(parent, args, context, info) {
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

    const orders = await Order.find(
        filter,
        null,
        {skip,limit}
        )

    const totalOrders = Object.keys(orders).length

    return {
        orders,
        totalOrders
    }
}

async function addOrder(parent, args, context, info) {
    const input = args.body.variables.createOrderInput
    const order = await Order.create(input)
    await order.save()
    return order
}

async function updateOrder(parent, args, context, info) {
    const input = args.body.variables.updateOrderInput
    const order = await Order.findById(input.id)
    order.set(input)
    await order.save()
    return order
}

async function deleteOrder(parent, args, context, info) {
    const id = args.body.variables.id
    const order = await Order.findById(id)
    if(!order)return false;
    await order.remove()
    return true
}


module.exports = {
    Orders,
    addOrder,
    updateOrder,
    deleteOrder
  }