import '../styles/project.css';
import '../styles/fonts.css';
import escapePurple from '../images/icons/escape-purple.svg';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const EditProject = ({projectName, projectDescription, projectRequirements, projectId, projectStatus, setEditProject, accessToken}) => {

    const [name, setName] = useState(projectName)
    const [description, setDescription] = useState(projectDescription)
    const [requirements, setRequirements] = useState(projectRequirements)
    const [status, setStatus] = useState(projectStatus)

    // const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const headers = {
            'Authorization': accessToken
        }

        try {
            const data = {
                "nameProject": name,
                "description": description,
                "requirements": requirements,
                "status": status
            }
            console.log(data);
            await axios.patch(`http://localhost:5000/api/project/${projectId}`, data, {headers: headers}).then(res => {
                console.log(res);
                setEditProject(false)
            })
        }
        catch(e) {
            console.log(e);
        }
    }

    return (
        <div className="project_background">
            <div className="project_container">
                <div className="project_header-section">
                    <h1 className="project_h1 project_header">
                        Редактирование проекта
                    </h1>
                    <div className="project_escape-img" onClick={()=>setEditProject(false)}>
                        <img className='project_img' src={escapePurple} alt="" />
                    </div>
                </div>
                <form className="project_create-project" onSubmit={handleSubmit}>
                    <div className="project_input-fields">
                        <div className="project_input-field">
                            <input type="text" placeholder="Название..." value={name} onChange={(e)=>setName(e.target.value)} />
                        </div>
                        <div>
                            <textarea placeholder="Описание проекта..." className="project_text-area" id="description" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                        </div>
                        <div>
                            <textarea placeholder="Требования к исполнителю..." className="project_text-area" id="requirements" value={requirements} onChange={(e)=>setRequirements(e.target.value)}></textarea>
                        </div>
                    </div>
                    <input type='radio' checked={status==='todo'} onChange={()=>setStatus('todo')} /><p>Новый</p>
                    <input type='radio' checked={status==='inProgress'} onChange={()=>setStatus('inProgress')} /><p>В процессе</p>
                    <input type='radio' checked={status==='completed'} onChange={()=>setStatus('completed')} /><p>Завершен</p>
                    <input type="submit" value="Сохранить" className="project_btn" />
                </form>
            </div>
        </div>
    )
}

export default EditProject;