import levelUpWhite from '../images/level-up-white.svg';
import upload from '../images/upload-img.svg';
import '../styles/user.css';
import '../styles/fonts.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateUserProfile = ({accessToken, email, setUserData}) => {

    const [name, setName] = useState('')
    const [telegram, setTelegram] = useState('')
    const [skills, setSkills] = useState('')
    const [file, setFile] = useState()

    const navigate = useNavigate()


    const handleFileChange = (e) => {
        setFile(e.target.files[0])
        console.log(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': accessToken
        }

        try {
            const data = new FormData();
            data.append("email", email)
            data.append("Name", name)
            data.append("Telegram", telegram)
            data.append("Skills", skills)
            data.append("Avatar", file)
            data.append("filename", file.name)

            await axios.post(`https://test1223.onrender.com/api/registration/student/`, data, {headers: headers}).then(res => {
                console.log(res);
                setUserData({
                    email: res.data.email,
                    name: res.data.Name,
                    telegram: res.data.Telegram,
                    skills: res.data.Skills,
                    companyName: '',
                    website: '',
                    companyLogo: '',
                    personalLogo: res.data.Avatar,
                    accessToken: accessToken
                })
                navigate("/")
            })
        }
        catch(e) {
            console.log(e);
        }
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
                                    <img src={file ? URL.createObjectURL(file) : upload} alt="Загрузите изображение профиля" className="userProfileUpload_image" />
                                </label>
                                <input type="file" id="upload-btn" style={{"display": "none"}} onChange={handleFileChange} />
                            </div>
                            <div className="userProfileText_input">
                                <div className="userProfileInput_field">
                                    <input type="text" placeholder="Имя..." value={name} onChange={(e)=>setName(e.target.value)} />
                                </div>
                                <div className="userProfileInput_field">
                                    <input type="text" placeholder="Telegram..." value={telegram} onChange={(e)=>setTelegram(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <label htmlFor="skills" className="userProfileH2 userProfileLabel">Навыки</label>
                        <textarea placeholder="Расскажите нам, какими навыками обладаете?" className="userProfileText_area" id="skills" value={skills} onChange={(e)=>setSkills(e.target.value)}></textarea>
                        <input type="submit" value="Сохранить" className="userProfileBtn" />
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}

export default CreateUserProfile;