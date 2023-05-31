import '../styles/projects.css';
import '../styles/fonts.css';

import { useState, useEffect } from 'react';
import axios from 'axios';

import ProjectTableItem from './ProjectTableItem';
import EditProject from '../pages/EditProject';


const MainContentCustomerSigned = ({accessToken}) => {

    const [projects, setProjects] = useState([])
    const [editProject, setEditProject] = useState(false)
    const [projectInfo, setProjectInfo] = useState({
        projectName: '',
        projectDescription: '',
        projectRequirements: '',
        projectId: '',
        projectStatus: ''
    })

    useEffect(() => {
        const getProjects = async () => {
            const headers = {
                'Authorization': accessToken
            }
            try {
                await axios.get(`http://localhost:5000/api/myProject/`, {headers: headers}).then(res => {
                    setProjects(res.data)
                })
                //console.log(projects);
            }
            catch (e) {
                console.log(e);
            }
        }
        getProjects()
    }, [editProject])
    console.log(projects);

    if (editProject) {
        return <EditProject projectName={projectInfo.projectName} 
                            projectDescription={projectInfo.projectDescription} 
                            projectRequirements={projectInfo.projectRequirements}
                            projectId={projectInfo.projectId}
                            projectStatus={projectInfo.projectStatus} 
                            setEditProject={setEditProject}
                            accessToken={accessToken} />
    }

    return (
        <main className="signedMain_main-panel__customer">
            <div className="signedMain_project-list__customer">
                <div className="signedMain_table">
                    <div className="signedMain_table__name">
                        <div className="signedMain_table__name-item-first">Название</div>
                        <div className="signedMain_table__name-item-second">Статус</div>
                    </div>
                    <div className="signedMain_items-list">
                        {projects.map(project => <ProjectTableItem key={project._id} 
                                                                   id={project._id}
                                                                   name={project.nameProject} 
                                                                   description={project.description} 
                                                                   requirements={project.requirements}
                                                                   status={project.status} 
                                                                   setEditProject={setEditProject} 
                                                                   setProjectInfo={setProjectInfo} />)}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MainContentCustomerSigned;