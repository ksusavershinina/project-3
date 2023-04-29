const Post = require('../models/Project');

class ProjectC {
    async create(req, res) {
        try {
            const { nameProject, description } = req.body;
            const project = new Post({ nameProject, description, createdBy: req.user });
            await project.save();
            res.json({ message: "проект создан", project });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "проект не создан" });
        }
    }
}

module.exports = new ProjectC();
