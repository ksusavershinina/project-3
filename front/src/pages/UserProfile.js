import levelUpWhite from '../images/level-up-white.svg';
import escape from '../images/icons/escape.svg';
import upload from '../images/upload-img.svg';
import '../styles/user.css';
import '../styles/fonts.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = ({accessToken, email}) => {

    const [name, setName] = useState('')
    const [telegram, setTelegram] = useState('')
    const [skills, setSkills] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }

        try {
            await axios.post(`http://localhost:5000/api/registration/student/`, {
                email,
                'Name': name,
                'Telegram': telegram,
                'Skills': skills
            }, {headers: headers}).then(res => {
                console.log(res);
                navigate("/")
            })

            // const res = await axios.get("http://localhost:5000/api/registration")
            // console.log(res.data);
        }
        catch(e) {
            console.log(e);
        }
    }

    return (
        <div className="userProfileContainer">
            <header className="userProfileHeader">
                <div className="userProfileHeader__section">
                    <div className="userProfileLogo_img">
                        <img src={levelUpWhite} alt="" />
                    </div>
                </div>
                <div className="userProfileHeader__section">
                    <div className="userProfileEscape_img">
                        <img src={escape} alt="" />
                    </div>
                </div>
            </header>
            <div className="userProfileUser_profile">
                <h1 className="userProfilePage_name">
                    
                    Создайте профиль
                </h1>
                <form className="userProfileCreate-profile userProfileForm" onSubmit={handleSubmit}>
                    <div className="userProfileInput_fields">
                        <div className="userProfileInput_wrapper">
                            <div className="userProfileInput_image">
                                <label htmlFor="upload-btn" className='userProfileLabel'>
                                    <img src={upload} alt="Загрузите изображение профиля" className="userProfileUpload_image" />
                                </label>
                                <input type="file" id="upload-btn" style={{"display": "none"}} />
                            </div>
                            <div className="userProfileText_input">
                                <div className="userProfileInput_field">
                                    <input type="text" placeholder="Имя..." value={name} onChange={(e)=>setName(e.target.value)} />
                                </div>
                                {/* <div className="userProfileInput_field">
                                    <input type="email" placeholder="Почта..." required />
                                </div> */}
                                <div className="userProfileInput_field">
                                    <input type="text" placeholder="Telegram..." value={telegram} onChange={(e)=>setTelegram(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <label htmlFor="skills" className="userProfileH2 userProfileLabel">Навыки</label>
                        <textarea placeholder="Расскажите нам, какими навыками обладаете?" className="userProfileText_area" id="skills" value={skills} onChange={(e)=>setSkills(e.target.value)}></textarea>
                        
                        {/* <label htmlFor="portfolio" className="userProfileH2 userProfileLabel">Портфолио</label>
                        <div className="userProfileInput_field"><input type="text" placeholder="Введите ссылку на портфолио..." id="portfolio" required /></div>
                        
                        <label htmlFor="information" className="userProfileH2 userProfileLabel">О себе</label>
                        <textarea placeholder="Расскажите что-нибудь о себе" className="userProfileText_area" id="information"></textarea> */}
                        <input type="submit" value="Сохранить" className="userProfileBtn" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserProfile;