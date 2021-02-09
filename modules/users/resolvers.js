const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./model');
const keys = require('../../keys')


async function signup(parent, args, context, info) {
  const arguments = args.variables.user

  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(arguments.password, salt)

  const user = await User.create({...arguments, password, salt})

  const token = jwt.sign({ userId: user.id },keys.JWT_SIGNATURE)

  context.res.cookie('token', token, { httpOnly: true })
    
  user.save()
    
  return {user}
}
  
  async function login(parent, args, context, info) {
    const arguments = args.variables.user
    //console.debug(args.cookies)
    //console.debug(args.req)
    //console.debug(args.res)

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

    args.res.cookie('token', token, { httpOnly: true })
    return {user}
  }

  async function deleteUser(parent, args, context, info) {
    const id = args.variables.id
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