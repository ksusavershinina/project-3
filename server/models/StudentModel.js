const {Schema, model} = require('mongoose')

const Student = new Schema({
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