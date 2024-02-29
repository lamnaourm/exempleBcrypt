import express from 'express'
import mongoose from 'mongoose'
import UserModel from './models/User.js'
import bcrypt from 'bcrypt'

const app = express()
app.use(express.json())


mongoose.connect('mongodb://localhost:27017/dbusers')
.then(() => {
    console.log('Connected to database')
})
.catch((err) => {
    console.log('Unable to Connect to database')
})

app.post('/addUser', (req, res) =>{
    const user = req.body

    bcrypt.hash(user.pass,5,(err, hash) => {
        user.pass = hash

        UserModel.create(user)
        .then((user) => {
            res.status(201).send('User created')
        })
        .catch((err) => {
            res.sendStatus(510)
        })
    })

})

app.get('/login', (req, res) => {
    const user = req.body

    UserModel.find({login:user.login})
    .then((u) => {
        bcrypt.compare(user.pass, u[0].pass, (err, result) => {
            console.log(err)
            return res.send(result)
        })
        
        
    })
})

app.listen(3000)