const db = require('../index')
const DataTypes = db.Sequelize

const Test = db.define('test', {
    content: {
        type: DataTypes.STRING(),
        allowNull: false
    }
})

module.exports = Test