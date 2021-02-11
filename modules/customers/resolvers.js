const Customer = require('./model');

async function Customers(parent, args, context, info) {
    return await Customer.find({})
}

async function addCustomer(parent, args, context, info) {
    const input = args.body.variables.createCustomerInput
    const customer = await Customer.create(input)
    await customer.save()
    return customer
}

async function updateCustomer(parent, args, context, info) {
    const input = args.body.variables.updateCustomerInput
    const customer = await Customer.findById(input.id)
    customer.set(input)
    await customer.save()
    return customer
}

async function deleteCustomer(parent, args, context, info) {
    const id = args.body.variables.id
    const customer = await Customer.findById(id)
    if(!customer)return false;
    await customer.remove()
    return true
}


module.exports = {
    Customers,
    addCustomer,
    updateCustomer,
    deleteCustomer
  }