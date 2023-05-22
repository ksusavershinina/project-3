const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
    nameProject: { type: String, required: true , unique: true},
    description: { type: String },
    requirements: {type: String},
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = model('Project', projectSchema);
