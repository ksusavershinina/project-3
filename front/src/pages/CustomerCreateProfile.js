import upload from '../images/upload-img.svg';
import levelUp from '../images/level-up-white.svg';

import '../styles/fonts.css';
import '../styles/customer.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import { Link } from 'react-router-dom';


const CustomerCreateProfile = ({accessToken, email, setUserData}) => {

    const [name, setName] = useState('')
    const [telegram, setTelegram] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [webSiteLink, setWebSiteLink] = useState('')
    const [companyLogo, setCompanyLogo] = useState()
    const [avatar, setAvatar] = useState()

    const navigate = useNavigate()

    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0])
        console.log('Avatar', e.target.files[0]);
    }
    const handleCompanyLogoChange = (e) => {
        setCompanyLogo(e.target.files[0])
        console.log('Compapny logo', e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }

        try {
            const data = new FormData();
            data.append("email", email)
            data.append("Name", name)
            data.append("Telegram", telegram)
            data.append("NameCompany", companyName)
            data.append("Website", webSiteLink)
            data.append("Avatar", avatar)
            data.append("avatarFileName", avatar.name)
            data.append("CompanyLogo", companyLogo)
            data.append("logoFileName", companyLogo.name)

            await axios.post(`http://localhost:5000/api/registration/employer/`, data, {headers: headers}).then(res => {
                console.log(res);
                setUserData({
                    email: res.data.email,
                    name: res.data.Name,
                    telegram: res.data.Telegram,
                    companyName: res.data.NameCompany,
                    website: res.data.Website,
                    companyLogo: res.data.CompanyLogo,
                    personalLogo: res.data.Avatar
                })
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
        <div className='customer_body'>
        <div className="customer_container">
            <header className="customer_header">
                <div className="customer_header__section">
                    <div className="customer_logo-img">
                        <img src={levelUp} alt="" />
                    </div>
                </div>
            </header>
            <div className="customer_user-profile">
            <h1 className="customer_page-name">
                Создайте профиль
            </h1>
            <form className="customer_create-profile">
                <div className="customer_company-wrapper">
                <div className="customer_company-image">
                    <label htmlFor="upload-btn">
                        <img src={companyLogo ? URL.createObjectURL(companyLogo) : upload} alt="Загрузите изображение профиля" className="customer_upload-image" style={{ maxWidth: "100%", cursor: "pointer" }} />
                    </label>
                    <input type="file" id="upload-btn" style={{ display: "none" }} onChange={handleCompanyLogoChange} />
                </div>
                <div className="customer_text-input">
                    <div className="customer_input-field">
                        <input type="text" placeholder="Название компании..." value={companyName} onChange={(e)=>setCompanyName(e.target.value)} />
                    </div>
                    <div className="customer_input-field">
                        <input type="text" placeholder="Ссылка на сайт..." value={webSiteLink} onChange={(e)=>setWebSiteLink(e.target.value)} />
                    </div>
                </div>
                <div className="customer_representative">
                    <p className="customer_h2">Представитель бренда</p>
                    <div className="customer_input-fields">
                    <div className="customer_input-wrapper">
                        <div className="customer_input-image">
                            <label htmlFor="upload-btn1">
                                <img src={avatar ? URL.createObjectURL(avatar) : upload} alt="Загрузите изображение профиля" className="customer_upload-image" style={{ cursor: "pointer" }} />
                            </label>
                            <input type="file" id="upload-btn1" style={{ display: "none" }} onChange={handleAvatarChange} />
                        </div>
                        <div className="customer_text-input">
                        <div className="customer_input-field">
                            <input type="text" placeholder="Имя..." value={name} onChange={(e)=>setName(e.target.value)} />
                        </div>
                        {/* <div class="input-field">
                            <input type="email" placeholder="Почта..." required />
                        </div> */}
                        <div className="customer_input-field">
                            <input type="text" placeholder="Telegram..." value={telegram} onChange={(e)=>setTelegram(e.target.value)} />
                        </div>
                        </div>
                    </div>
                    {/* <label htmlFor="skills" className="customer_h2">Навыки</label>
                    <textarea placeholder="Расскажите нам, какими навыками обладаете?" className="customer_text-area" id="skills"></textarea>
                    
                    <label for="portfolio" class="h2">Портфолио</label>
                    <div class="input-field"><input type="text" placeholder="Введите ссылку на портфолио..." id="portfolio" required></div>
                    
                    <label for="information" class="h2">О себе</label>
                    <textarea placeholder="Расскажите что-нибудь о себе" class="text-area" id="information"></textarea> */}
                    <input type="submit" value="Сохранить" className="customer_btn" onClick={handleSubmit} />
                    </div>
                </div>
                </div>
            </form>
            </div>
        </div>
        </div>
    )
}

export default CustomerCreateProfile;