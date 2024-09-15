const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'Please provide a name'],
        minLength: 3,
        maxLemgth: 50,

    },

    email: {
        type: String,
        required:[true, 'Please provide an email'],
       match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a matching email'
       ],
       unique: true,
       lowercase: true
    },
    password: {
        type: String,
        required:[true, 'Please provide a secure password'],
        minLength: 6,

    },
})
UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await  bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {

    const secret = process.env.JWT_SECRET
    const jwtLifetime = process.env.JWT_LIFETIME;
    return  jwt.sign({userId: this._id, name: this.name }, secret, {expiresIn: jwtLifetime})
}

UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema);