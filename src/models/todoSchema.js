const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
       
    },
    description: {
        type: String,
        required: true,
        trim:true
    },
    completed: {
        type: Boolean,
        default: false
    }    
}, {timestamps: true })
const Todo = mongoose.model("Todo", todoSchema)
module.exports = Todo