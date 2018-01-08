const crypto = require('crypto')
const _ = require('lodash')
const db = require('../index')
const DataTypes = db.Sequelize

const User = db.define('user', {
    email: {
        type: DataTypes.STRING(),
        unique: true,
        allowNull: false
    },
    password: DataTypes.STRING(),
    salt: DataTypes.STRING(),
    googleId: DataTypes.STRING()
}, {
    hooks: {
        beforeCreate: setSaltAndPassword,
        beforeUpdate: setSaltAndPassword
    }
})


// instance methods
User.prototype.correctPassword = function(candidatePassword) {
    return User.encryptPassword(candidatePassword, this.salt) === this.password
}

User.prototype.sanitize = function() {
    return _.omit(this.toJSON(), ['password', 'salt'])
}

// class methods
User.generateSalt = function() {
    return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
    const hash = crypto.createHash('sha1')
    hash.update(plainText)
    hash.update(salt)
    return hash.digest('hex')
}

function setSaltAndPassword(user) {
    if (user.changed('password')) {
        user.salt = User.generateSalt()
        user.password = User.encryptPassword(user.password, user.salt)
    }
}

module.exports = User