const express = require('express')
const app = express()

// json stringify and parse
app.use(express.json())

// port work
require ('dotenv').config()
const port = process.env.SERVER_PORT || 3200


//Router.js ka path ek variable main diya
const CategoryRouter=require('./API/Category/Router')
const UserRouter=require('./API/User/Router')

//ab Router.js ko hum index.js main ek tarha se import kr rhy
app.use('/api',CategoryRouter)
app.use('/api',UserRouter)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})