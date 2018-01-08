const Sequelize = require('sequelize')
const pkg = require('../../package.json')

console.log("Opening database connection")

// create the database instance that can be used in other database files
module.exports = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/${pkg.name}`, {
  logging: false, // so we don't see all the SQL query made
})