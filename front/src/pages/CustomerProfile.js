import upload from '../images/upload-img.svg';
import levelUp from '../images/level-up-white.svg';
import escape from '../images/icons/escape.svg';

import '../styles/fonts.css';
import '../styles/customer.css';

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Link } from 'react-router-dom';


const CustomerProfile = ({ setShowProfile, userData }) => {

    // const [name, setName] = useState('')
    // const [telegram, setTelegram] = useState('')
    // const [companyName, setCompanyName] = useState('')
    // const [webSiteLink, setWebSiteLink] = useState('')

    // const navigate = useNavigate()

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
        
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'Authorization': accessToken
    //     }

    //     try {
    //         await axios.post(`http://localhost:5000/api/registration/employer/`, {
    //             email,
    //             'NameCompany': companyName,
    //             'Website': webSiteLink,
    //             'Name': name,
    //             'Telegram': telegram
    //         }, {headers: headers}).then(res => {
    //             console.log(res);
    //             // setUserData({
    //             //     email: res.data.email,
    //             //     name: res.data.Name,
    //             //     telegram: res.data.Telegram,
    //             //     skills: res.data.Skills
    //             // })
    //             navigate("/")
    //         })

    //         // const res = await axios.get("http://localhost:5000/api/registration")
    //         // console.log(res.data);
    //     }
    //     catch(e) {
    //         console.log(e);
    //     }
    // }

    return (
        <div className='customer_body'>
        <div className="customer_container">
            <header className="customer_header">
                <div className="customer_header__section">
                    <div className="customer_logo-img">
                        <img src={levelUp} alt="" />
                    </div>
                </div>
                <div className="customer_header__section">
                    <div className="customer_escape_img" style={{cursor: 'pointer'}} onClick={()=>setShowProfile(false)}>
                        <img src={escape} alt="" />
                    </div>
                </div>
            </header>
            <div className="customer_user-profile">
            <h1 className="customer_page-name">
                Профиль компании
            </h1>
            <form className="customer_create-profile">
                <div className="customer_company-wrapper">
                <div className="customer_company-image">
                    <label htmlFor="upload-btn">
                        <img src={`http://localhost:5000/${userData.companyLogo.replace('uploads\\', '')}`} alt="Загрузите изображение профиля" className="customer_upload-image" style={{ maxWidth: "100%", cursor: "pointer" }} />
                    </label>
                    {/* <input type="file" id="upload-btn" style={{ display: "none" }} /> */}
                </div>
                <div className="customer_text-input">
                    <div className="customer_input-field">
                        {userData.companyName}
                    </div>
                    <div className="customer_input-field">
                        {userData.website}
                    </div>
                </div>
                <div className="customer_representative">
                    <p className="customer_h2">Представитель бренда</p>
                    <div className="customer_input-fields">
                    <div className="customer_input-wrapper">
                        <div className="customer_input-image">
                            <label htmlFor="upload-btn">
                                <img src={`http://localhost:5000/${userData.personalLogo.replace('uploads\\', '')}`} alt="Загрузите изображение профиля" className="customer_upload-image" style={{ cursor: "pointer" }} />
                            </label>
                            {/* <input type="file" id="upload-btn" style={{ display: "none" }} /> */}
                        </div>
                        <div className="customer_text-input">
                        <div className="customer_input-field">
                            {userData.name}
                        </div>
                        <div className="customer_input-field">
                            {userData.email}
                        </div>
                        <div className="customer_input-field">
                            {userData.telegram}
                        </div>
                        </div>
                    </div>
                    {/* <label htmlFor="skills" className="customer_h2">Навыки</label>
                    <textarea placeholder="Расскажите нам, какими навыками обладаете?" className="customer_text-area" id="skills"></textarea>
                    
                    <label for="portfolio" class="h2">Портфолио</label>
                    <div class="input-field"><input type="text" placeholder="Введите ссылку на портфолио..." id="portfolio" required></div>
                    
                    <label for="information" class="h2">О себе</label>
                    <textarea placeholder="Расскажите что-нибудь о себе" class="text-area" id="information"></textarea> 
                    <input type="submit" value="Сохранить" className="customer_btn" onClick={handleSubmit} /> */}
                    </div>
                </div>
                </div>
            </form>
            </div>
        </div>
        </div>
    )
}

export default CustomerProfile;