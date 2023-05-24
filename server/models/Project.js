const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
    nameProject: { type: String, required: true , unique: true},
    companyName: {type: String },
    description: { type: String },
    requirements: {type: String},
    status: {type: String, default: "todo"},
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = model('Project', projectSchema);
