const {Schema,model} =require('mongoose')

const UserSchema = new Schema({
        email: {
            type: String,
            required: true,
            unique: true  
        },
        password: {
            type: String,
            required: true
        },
        isActivated: {
            type: Boolean,
            default: false
        },
        activationLink: {
            type: String
        },
        roles: [{
            type: String,
            ref: 'Role'
        }],
        modelS : [{
            type: String,
            ref: 'Student'
        }],
        modelE: {
            type: String,
            ref: 'Employer'
        }
    }
) 

module.exports = model('User', UserSchema)