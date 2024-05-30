import mongoose from 'mongoose'

const collection = 'users'

const schema = new mongoose.Schema({
    first_name: { type: String, required: true, max: 10 },
    last_name: { type: String, required: true, max: 10 },
    email: {
        type: String,
        unique: true,
        require:true,
        max:45
    },
    role: { type: String, required: true, max: 10 },
    age: Number,
    password: { type: String, required: true, max: 30 }
})

const MODEL_USER = mongoose.model(collection, schema)

export default  MODEL_USER