import '../styles/project.css';
import '../styles/fonts.css';
import escapePurple from '../images/icons/escape-purple.svg';

import { useState } from 'react';
import axios from 'axios';


const CreateProject = ({companyName, accessToken, setCreateProject}) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [requirements, setRequirements] = useState('')

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
                "companyName": companyName
            }
            console.log(data);
            await axios.post(`https://test1223.onrender.com/api/project/`, data, {headers: headers}).then(res => {
                console.log(res);
                setCreateProject(false)
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
                        Создание проекта
                    </h1>
                    <div className="project_escape-img" onClick={()=>setCreateProject(false)}>
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
                    <input type="submit" value="Создать" className="project_btn" />
                </form>
            </div>
        </div>
    )
}

export default CreateProject;