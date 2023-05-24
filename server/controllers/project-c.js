const Post = require('../models/Project');

class ProjectC {
    async create(req, res) {
        console.log(req);
        try {
            const { nameProject, description,requirements, status,companyName } = req.body;
            const Project = await Post.findOne({nameProject})
            if (Project) {
                res.json({message: "такой проект уже существует"})
            }
            const project = new Post({ nameProject, description,requirements:requirements,status: status,companyName:companyName, createdBy: req.user,});
            await project.save();
            res.json({ message: "проект создан", project });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "проект не создан" });
        }
    }

    async update (req,res) {
        try {
            const projectId = req.params.id;
            const { nameProject, description,requirements, status,companyName } = req.body;
            await Post.updateOne (
                {
                    _id: projectId,
                  },
                  {
                    nameProject: nameProject,
                    description: description,
                    requirements: requirements,
                    status: status,
                    companyName: companyName,
                  },
                );
            
        }
        catch (e) {
            res.json({message: "пиздец в редактирование проектаы"})
        }
    }
}

module.exports = new ProjectC();
