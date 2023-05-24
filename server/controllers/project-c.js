const Post = require('../models/Project');

class ProjectC {
    async create(req, res) {
        console.log(req);
        try {
            const { nameProject, description,requirements, status } = req.body;
            const Project = await Post.findOne({nameProject})
            if (Project) {
                res.json({message: "такой проект уже существует"})
            }
            const project = new Post({ nameProject, description,requirements:requirements,status: status, createdBy: req.user,});
            await project.save();
            res.json({ message: "проект создан", project });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "проект не создан" });
        }
    }
}

module.exports = new ProjectC();
