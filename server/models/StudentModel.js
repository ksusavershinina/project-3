const {Schema, model} = require('mongoose')

const Student = new Schema({
    email: {
        type: String,
        ref: 'User'
    },
    password: {
        type: String,
        ref: 'User'
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    Name: {
        type: String,
        required: true,

    },
    Telegram: {
        type: String,
        required: true,
        unique: true
    },
    Skills: {
        type: String,
        required: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = model('Student', Student)