const {Schema, model} = require('mongoose')

const Employer = new Schema({
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
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = model('Employer', Employer)