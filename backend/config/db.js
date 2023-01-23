const mongoose = require('mongoose')

mongoose.set("strictQuery", true)

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.a1hltxr.mongodb.net/?retryWrites=true&w=majority`
    )

    console.log('Database connection successfully.')
    
    return dbConn
  } catch (error) {
    console.log(error)
  }
}

conn()

module.exports = conn