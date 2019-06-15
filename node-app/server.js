const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const users = require('./routes/api/users')
const profiles = require('./routes/api/profiles')



const passport = require('passport')

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true })
.then(() => {
  console.log('ok')
})

const port = 5000;
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users',users)
app.use('/api/profiles',profiles)



// app.get('/',(req,res) => {
//   res.send('hello hangfeng')
// })

app.listen(port,() => {
  console.log(`serve is running on port ${port}`)
})