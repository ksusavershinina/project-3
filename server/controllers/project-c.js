const Post = require('../models/Project');

class ProjectC {
    async create(req, res) {
        try {
            const { nameProject, description,requirements } = req.body;
            const Project = await Post.findOne({nameProject})
            if (Project) {
                res.json({message: "такой проект уже существует"})
            }
            const project = new Post({ nameProject, description,requirements:requirements, createdBy: req.user });
            await project.save();
            res.json({ message: "проект создан", project });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "проект не создан" });
        }
    }
}

module.exports = new ProjectC();
