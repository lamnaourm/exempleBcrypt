import { Schema, model } from "mongoose";


const UserSchema = Schema({
    login:String,
    pass:String
})

export default model('user', UserSchema)