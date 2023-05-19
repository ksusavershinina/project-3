const {Schema, model} = require('mongoose')

const Employer = new Schema({
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
    NameCompany: {
        type: String,
        required: true,

    },
    Website: {
        type: String,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true,
    },
    Telegram: {
        type: String,
        required: true
    },
    Avatar: {
        type: String
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = model('Employer', Employer)