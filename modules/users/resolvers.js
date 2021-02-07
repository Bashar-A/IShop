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
    
  user.save()
    
  return {
      token,
      user,
  }
}
  
  async function login(parent, args, context, info) {
    const arguments = context.variableValues.user

    const user = await User.findOne({email: arguments.email})
    if (!user) {
      throw new Error('No such user found')
    }

    
    console.debug(user)
    console.debug(arguments)
    const hash = await bcrypt.hash(arguments.password, user.salt);

    const valid = hash === user.password
    if (!valid) {
      throw new Error('Invalid password')
    }
  
    const token = jwt.sign({ userId: user.id }, keys.JWT_SIGNATURE)
  
    return {
      token,
      user,
    }
  }
  
  module.exports = {
    signup,
    login
  }