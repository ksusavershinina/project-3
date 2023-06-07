import '../styles/projects.css';
import '../styles/fonts.css';

import { useState, useEffect } from 'react';
import axios from 'axios';

import ProjectCard from './ProjectCard'
import CustomerCard from './CustomerCard';

const MainContentUserSigned = ({accessToken}) => {

    const [all, setAll] = useState(true)
    const [inProcess, setInProcess] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [projects, setProjects] = useState([])
    const [showCustomerCard, setShowCustomerCard] = useState(false)
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        telegram: '',
        profileImageLink: ''
    })

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
                await axios.get(`https://test1223.onrender.com/api/posts/`).then(res => {
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

    if (showCustomerCard) {
        return <CustomerCard setShowCustomerCard={setShowCustomerCard} customerInfo={customerInfo} />
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
                {projects.filter(project => (inProcess && project.status==='inProgress') || all || (completed && project.status==='completed'))
                         .map(project => <ProjectCard key={project.nameProject} 
                                                      projectName={project.nameProject} 
                                                      companyName={project.companyName} 
                                                      description={project.description} 
                                                      requirements={project.requirements}
                                                      status={project.status}
                                                      createdBy={project.createdBy}
                                                      accessToken={accessToken}
                                                      setShowCustomerCard={setShowCustomerCard}
                                                      setCustomerInfo={setCustomerInfo} />)}
            </div>
        </main>
    )
}

export default MainContentUserSigned;