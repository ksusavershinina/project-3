import levelUpWhite from '../images/level-up-white.svg';
import escape from '../images/icons/escape.svg';
import upload from '../images/upload-img.svg';
import '../styles/user.css';
import '../styles/fonts.css';
import { Link } from 'react-router-dom';

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = ({setShowProfile, userData, setIsSignedIn}) => {
    // const [name, setName] = useState('')
    // const [telegram, setTelegram] = useState('')
    // const [skills, setSkills] = useState('')
    console.log(userData);
    // const navigate = useNavigate()

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
        
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'Authorization': accessToken
    //     }

    //     try {
    //         await axios.post(`http://localhost:5000/api/registration/student/`, {
    //             email,
    //             'Name': name,
    //             'Telegram': telegram,
    //             'Skills': skills
    //         }, {headers: headers}).then(res => {
    //             console.log(res);
    //             navigate("/")
    //         })

    //         // const res = await axios.get("http://localhost:5000/api/registration")
    //         // console.log(res.data);
    //     }
    //     catch(e) {
    //         console.log(e);
    //     }
    // }

    const handleLogout = async () => {

        localStorage.clear();

        setIsSignedIn(false)
        setShowProfile(false)
    }

    return (
        <div className='user_body'>
        <div className="userProfileContainer">
            <header className="userProfileHeader">
                <div className="userProfileHeader__section">
                    <div className="userProfileLogo_img">
                        <Link to='/'>
                            <img src={levelUpWhite} alt="" />
                        </Link>
                    </div>
                </div>
                <div className="userProfileHeader__section">
                    <div className="userProfileEscape_img" style={{cursor: 'pointer'}} onClick={()=>setShowProfile(false)}>
                        <img src={escape} alt="" />
                    </div>
                </div>
            </header>
            <div className="userProfileUser_profile">
                <h1 className="userProfilePage_name">
                    Личный кабинет
                </h1>
                <form className="userProfileCreate-profile userProfileForm">
                    <div className="userProfileInput_fields">
                        <div className="userProfileInput_wrapper">
                            <div className="userProfileInput_image">
                                <label htmlFor="upload-btn" className='userProfileLabel'>
                                    <img src={`http://localhost:5000/${userData.personalLogo.replace('uploads\\', '')}`} alt="Загрузите изображение профиля" className="userProfileUpload_image" />
                                </label>
                                {/* <input type="file" id="upload-btn" style={{"display": "none"}} /> */}
                            </div>
                            <div className="userProfileText_input">
                                <div className="userProfileInput_field">
                                    {userData.name}
                                </div>
                                <div className="userProfileInput_field">
                                    {userData.email}
                                </div>
                                <div className="userProfileInput_field">
                                    {userData.telegram}
                                </div>
                            </div>
                        </div>
                        <label htmlFor="skills" className="userProfileH2 userProfileLabel">Навыки</label>
                        <textarea className="userProfileText_area" id="skills" value={userData.skills} readOnly></textarea>
                        <button type='button' className='project_btn' onClick={handleLogout}>Выйти</button>
                        
                        {/* <label htmlFor="portfolio" className="userProfileH2 userProfileLabel">Портфолио</label>
                        <div className="userProfileInput_field"><input type="text" placeholder="Введите ссылку на портфолио..." id="portfolio" required /></div>
                        
                        <label htmlFor="information" className="userProfileH2 userProfileLabel">О себе</label>
                        <textarea placeholder="Расскажите что-нибудь о себе" className="userProfileText_area" id="information"></textarea> 
                        <input type="submit" value="Сохранить" className="userProfileBtn" /> */}
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}

export default UserProfile;