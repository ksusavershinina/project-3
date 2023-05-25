import '../styles/projects.css';
import '../styles/fonts.css';

import { useState, useEffect } from 'react';
import axios from 'axios';

import ProjectCard from './ProjectCard'

const MainContentUserSigned = () => {

    const [all, setAll] = useState(true)
    const [inProcess, setInProcess] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [projects, setProjects] = useState([])

    const handleAllChange = () => {
        if (!all) {
            setAll(true)
            setInProcess(false)
            setCompleted(false)
        }
    }

    const handleInProcessChange = () => {
        if (!inProcess) {
            setInProcess(true)
            setAll(false)
        }
        else if (inProcess && completed) {
            setInProcess(false)
        }
        else {
            setInProcess(false)
            setAll(true)
        }
    }

    useEffect(() => {
        const getProjects = async () => {
            try {
                await axios.get(`http://localhost:5000/api/posts/`).then(res => {
                    setProjects(res.data)
                })
                //console.log(projects);
            }
            catch (e) {
                console.log(e);
            }
        }
        getProjects()
    }, [])
    console.log(projects);

    const handleCompletedChange = () => {
        if (!completed) {
            setCompleted(true)
            setAll(false)
        }
        else if (inProcess && completed) {
            setCompleted(false)
        }
        else {
            setCompleted(false)
            setAll(true)
        }
    }

    return (
        <main className="signedMain_main-panel">
            <div className="signedMain_side-panel">
                <div className="signedMain_panel-contain">
                <h1 className="signedMain_page-name">
                    По статусу:
                </h1>
                <div className="signedMain_check-box">
                    <label className="signedMain_check-box__label">
                    <div className="signedMain_check-box__checkbox">
                        <input type="checkbox" className="signedMain_checkbox-default" value={all} onChange={handleAllChange} checked={all} />
                        <span className="signedMain_checked"></span>
                    </div>
                    <p className="signedMain_checkbox-text" style={{color: all ? '#5D13E7' : '#5D13E759'}}>Все</p>
                    </label>
                </div>
                <div className="signedMain_check-box">
                    <label className="signedMain_check-box__label">
                    <div className="signedMain_check-box__checkbox">
                        <input type="checkbox" className="signedMain_checkbox-default" value={inProcess} onChange={handleInProcessChange} checked={inProcess} />
                        <span className="signedMain_checked"></span>
                    </div>
                    <p className="signedMain_checkbox-text" style={{color: inProcess ? '#5D13E7' : '#5D13E759'}}>В процессе</p>
                    </label>
                </div>
                <div className="signedMain_check-box">
                    <label className="signedMain_check-box__label">
                    <div className="signedMain_check-box__checkbox">
                        <input type="checkbox" className="signedMain_checkbox-default" value={completed} onChange={handleCompletedChange} checked={completed} />
                        <span className="signedMain_checked"></span>
                    </div>
                    <p className="signedMain_checkbox-text" style={{color: completed ? '#5D13E7' : '#5D13E759'}}>Завершен</p>
                    </label>
                </div>

                </div>
            </div>
            <div className="signedMain_project-list">
                {projects.map(project => <ProjectCard key={project.nameProject} projectName={project.nameProject} companyName={project.companyName} description={project.description} requirements={project.requirements} />)}
            </div>
        </main>
    )
}

export default MainContentUserSigned;