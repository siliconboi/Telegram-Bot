import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },// match parameter to accept email ids in proper format from given regex, which will be checked by node assert
    password:{
        type: String,
        required : true
    },
    userID:{
        type: String
    }
})
const orderSchema = new mongoose.Schema({
    name:{
        type: [String],
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
     }
})

const User = new mongoose.model('user', userSchema);
const Order = new mongoose.model('order', orderSchema);

export {User, Order}