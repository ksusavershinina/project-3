import upload from '../images/upload-img.svg'
import inProgress from '../images/in-progress-project-status.svg'

import { useState } from 'react'

import '../styles/project-card.css'
import '../styles/fonts.css'

const ProjectCard = ({projectName, companyName, description, requirements}) => {

  const [expand, setExpand] = useState(false)

  return (
    <div>
      <div className="projectCard_accordion-card" style={{height: expand ? '640px' : '315px', zIndex: expand ? '1' : '0'}}>
        <div className="projectCard_card-content" style={{height: expand ? '43%' : '83%'}}>
          <div className="projectCard_profile-image">
            <img src={upload} alt="Лейбл компании" />
          </div>
          <h2 className="projectCard_h2">
            {projectName}
          </h2>
          <h3 className="projectCard_h3">
            {companyName}
          </h3>
          <div className="projectCard_status-image">
            <img src={inProgress} alt="" />
          </div>
        </div>
        <div className="projectCard_card-text" id="more" style={{height: expand ? '47%' : '0'}}>
          <div className="projectCard_card-text-wrapper">
            <label htmlFor="about" className="projectCard_label">О проекте</label>
            <p className="projectCard_card-text-area" id="about">{description}</p>
          </div>
          <div className="projectCard_text-wrapper">
            <label htmlFor="skills" className="projectCard_card-label">Навыки</label>
            <p className="projectCard_text-area" id="skills">{requirements}</p>
            <button className="projectCard_accordion-button">Участвовать</button>
          </div>
        </div>
        <div className="projectCard_button-wrapper" style={{height: expand ? '10%' : '17%'}}><button onClick={()=>setExpand(!expand)} className="projectCard_accordion-button">Подробнее</button></div>
      </div>
    </div>
  )
}

export default ProjectCard;