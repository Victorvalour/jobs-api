
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')


// REGISTER CONTROLLER
const register = async (req, res) => {

        const user = await User.create({...req.body});

        const token = user.createJWT()

        res.status(StatusCodes.CREATED).json({user: {id: user._id, name:user.name, email: user.email}, token});
}

//  LOGIN CONTROLLER
const login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
      const  user = await User.findOne({email})
      if(!user) {
          throw new UnauthenticatedError('Invalid Credentials')
        }
        
          // Compare password 
        const isPasswordCorrect = await user.comparePassword(password)
        
        if(!isPasswordCorrect) {
            throw new UnauthenticatedError('Invalid Credentials')
          }

      const token = user.createJWT()

      res.status(StatusCodes.OK).json({user: {name:user.name, id: user._id, email: user.email}, token})
    }







    module.exports = {
        register,
        login
    }
