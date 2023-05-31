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
            const postId = req.params.id;
        
            await Post.updateOne(
              {
                _id: postId,
              },
              {
                nameProject: req.body.nameProject,
                //companyName: req.body.companyName,
                description: req.body.description,
                requirements: req.body.requirements,
                status: req.body.status
              },
            );
        
            res.json({
              success: true,
            });
          } catch (err) {
            console.log(err);
            res.status(500).json({
              message: 'Не удалось обновить статью',
            });
          }
    }
}

module.exports = new ProjectC();
