import { useState } from "react";
import axios from "axios"
import "../styles/registration.css"
import "../styles/fonts.css"
import image1 from "../images/reg-log-img.svg"
import image2 from "../images/reg-log-img-2.svg"
import image3 from "../images/level_up.svg"
import {useNavigate} from 'react-router-dom'
import CreateUserProfile from "./CreateUserProfile";
import CustomerCreateProfile from "./CustomerCreateProfile";
import { Link } from "react-router-dom";

const Registration = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [roleChoice, setRole] = useState(false)
    const [mode, setMode] = useState([props.mode, 0])
    const [showUserProfile, setShowUserProfile] = useState(false)
    const [showCustomerProfile, setShowCustomerProfile] = useState(false)
    const [authToken, setAuthToken] = useState('')

    const handleRoleChange = () => {
        setRole(!roleChoice)
    }

    const handleSignUp = async (e) => {
        e.preventDefault()

        const role = roleChoice ? "employer" : "student";

        try {
            await axios.post("http://localhost:5000/api/registration", {
                email,
                password,
                role
            }).then(res => {
                if (res.data.message !== undefined) {
                    alert(res.data.message)
                }
                else {
                    if (role === 'student') {
                        setShowUserProfile(true)
                    }
                    else {
                        setShowCustomerProfile(true)
                    }
                    setAuthToken(res.data.accessToken)
                    props.setIsSignedIn(true)
                    console.log(res);
                }
            })


            // const res = await axios.get("http://localhost:5000/api/registration")
            // console.log(res.data);
        }
        catch(e) {
            console.log(e);
        }
    }

    const navigate = useNavigate()

    const handleSignIn = async (e) => {
        e.preventDefault()
        
        try {
            await axios.post("http://localhost:5000/api/login", {
                email,
                password,
            }).then(res => {
                if (res.data.message !== undefined) {
                    alert(res.data.message)
                }
                else {
                    console.log(res);
                    navigate('/')
                    if (res.data.user.student !== undefined) {
                        props.setUserData({
                            email: res.data.user.student.email,
                            name: res.data.user.student.Name,
                            telegram: res.data.user.student.Telegram,
                            skills: res.data.user.student.Skills,
                            companyName: '',
                            website: ''
                        })
                    }
                    else {
                        props.setUserData({
                            email: res.data.user.employer.email,
                            name: res.data.user.employer.Name,
                            telegram: res.data.user.employer.Telegram,
                            companyName: res.data.user.employer.NameCompany,
                            website: res.data.user.employer.Website
                        })
                    }
                    props.setIsSignedIn(true)
                }
            })

            // const res = await axios.get("http://localhost:5000/api/registration")
            // console.log(res.data);
        }
        catch(e) {
            console.log(e);
        }
    }

    if (showUserProfile) {
        return <CreateUserProfile accessToken={authToken} email={email} setUserData={props.setUserData} />
    }
    else if (showCustomerProfile) {
        return <CustomerCreateProfile accessToken={authToken} email={email} setUserData={props.setUserData} />
    }
    else {
        return (
            <div className="reg_body">
            <div className={mode[0]===true ? "reg_container" : (mode[1]===0 ? "reg_container reg_sign-in-mode" : "reg_container reg_sign-in-mode2")}>
                <div className="reg_signin-signup">
                    <form action="POST" className="reg_form reg_sign-up-form">
                        <h2 className="reg_title">Создайте новый акканут</h2>
                        <div className="reg_input-field">
                            <input type="email" placeholder="Почта..." value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="reg_input-field">
                            <input type="password" placeholder="Пароль..." value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="reg_check-customer">
                            <label className="reg_check-customer__label">
                                <div className="reg_check-customer__checkbox">
                                    <input type="checkbox" className="reg_checkbox-default" checked={roleChoice} onChange={handleRoleChange} />
                                    <span className="reg_is-customer"></span>
                                </div>
                                <p className={roleChoice ? "role_checked" : "role_unchecked"}>Я заказчик</p>
                            </label>
                        </div>
                        <input style={{cursor: 'pointer'}} type="submit" value="Создать" className="reg_btn" onClick={handleSignUp} />
                        <button type="button" style={{cursor: 'pointer'}} onClick={()=>setMode([false, 0])} className="reg_no-fill-button" id="sign-in-btn">Войти</button>
                        <button type="button" style={{cursor: 'pointer'}} onClick={()=>setMode([false, 1])} className="reg_no-fill-button" id="sign-in-btn2">Войти</button>
                    </form>

                    <form action="POST" className="reg_form reg_sign-in-form">
                        <h2 className="reg_title">Войдите в аккаунт</h2>
                        <div className="reg_input-field">
                            <input type="email" placeholder="Почта..." value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="reg_input-field">
                            <input type="password" placeholder="Пароль..." value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <input style={{cursor: 'pointer'}} type="submit" value="Войти" className="reg_btn" onClick={handleSignIn} />
                        <button type="button" style={{cursor: 'pointer'}} onClick={()=>setMode([true, 0])} className="reg_no-fill-button" id="sign-up-btn">Создать аккаунт</button>
                        <button type="button" style={{cursor: 'pointer'}} onClick={()=>setMode([true, 1])} className="reg_no-fill-button" id="sign-up-btn2">Создать аккаунт</button>
                    </form>
                </div>
                <div className="reg_panels-container">
                    <div className="reg_panel reg_left-panel">
                        <div className="reg_content">
                            <Link to='/'>
                                <img src={image3} alt="" className="reg_logo-img" />
                            </Link>
                            <img src={image1} alt="" className="reg_img" />
                        </div>
                    </div>
                
                    <div className="reg_panel reg_right-panel">
                        <div className="reg_content">
                            <Link to='/'>
                                <img src={image3} alt="" className="reg_logo-img" />
                            </Link>
                            <img src={image2} alt="" className="reg_img" />
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default Registration;