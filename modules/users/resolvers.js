const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./model');
const keys = require('../../keys')


async function signup(parent, args, context, info) {
  const arguments = context.variableValues.user

  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(arguments.password, salt)

  const user = await User.create({...arguments, password, salt})

  const token = jwt.sign({ userId: user.id },keys.JWT_SIGNATURE)

  context.res.cookie('token', token, { httpOnly: true })
    
  user.save()
    
  return user
}
  
  async function login(parent, args, context, info) {
    const arguments = context.variableValues.user
    console.debug(context)
    console.debug(context.req)
    console.debug(context.res)
    console.debug(info)

    const user = await User.findOne({email: arguments.email})
    if (!user) {
      throw new Error('No such user found')
    }

    const hash = await bcrypt.hash(arguments.password, user.salt);

    const valid = hash === user.password
    if (!valid) {
      throw new Error('Invalid password')
    }
  
    const token = jwt.sign({ userId: user.id }, keys.JWT_SIGNATURE)

    context.res.cookie('token', token, { httpOnly: true })
    return user
  }

  async function deleteUser(parent, args, context, info) {
    const id = context.variableValues.id
    console.debug(context.variableValues)
    const user = await User.findById(id)
    if(!user)return false;
    await user.remove()
    return true
}
  
  module.exports = {
    signup,
    login,
    deleteUser
  }