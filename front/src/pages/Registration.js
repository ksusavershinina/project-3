import { useState } from "react";
import axios from "axios"
import "../styles/registration.css"
import "../styles/fonts.css"
import image1 from "../images/reg-log-img.svg"
import image2 from "../images/reg-log-img-2.svg"
import image3 from "../images/level_up.svg"
import {useNavigate} from 'react-router-dom'

const Registration = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [roleChoice, setRole] = useState(false)
    const [mode, setMode] = useState(props.mode)

    const handleRoleChange = () => {
        setRole(!roleChoice)
    }

    const handleClick = () => {
        setMode(!mode)
    }

    const handleSignUp = async (e) => {
        e.preventDefault()

        const role = roleChoice ? "заказчик" : "студент";

        try {
            await axios.post("http://localhost:5000/api/registration", {
                email,
                password,
                role
            }).then(res => console.log(res))

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
                    navigate('/')
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

    return (
        <div className={mode ? "container" : "container sign-in-mode"}>
            <div className="signin-signup">
                <form action="POST" className="sign-up-form">
                    <h2 className="title">Создайте новый акканут</h2>
                    <div className="input-field">
                        <input type="email" placeholder="Почта..." value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <input type="password" placeholder="Пароль..." value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="check-customer">
                        <label className="check-customer__label">
                            <div className="check-customer__checkbox">
                                <input type="checkbox" className="checkbox-default" checked={roleChoice} onChange={handleRoleChange} />
                                <span className="is-customer"></span>
                            </div>
                            <p className={roleChoice ? "role_checked" : "role_unchecked"}>Я заказчик</p>
                        </label>
                    </div>
                    <input type="submit" value="Создать" className="btn" onClick={handleSignUp} />
                    <button type="button" onClick={handleClick} className="no-fill-button" id="sign-in-btn">Войти</button>
                </form>

                <form action="POST" className="sign-in-form">
                    <h2 className="title">Войдите в аккаунт</h2>
                    <div className="input-field">
                        <input type="email" placeholder="Почта..." value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <input type="password" placeholder="Пароль..." value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <input type="submit" value="Войти" className="btn" onClick={handleSignIn} />
                    <button type="button" onClick={handleClick} className="no-fill-button" id="sign-up-btn">Создать аккаунт</button>
                </form>
            </div>
            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <img src={image3} alt="" className="logo-img" />
                        <img src={image1} alt="" className="img" />
                    </div>
                </div>
            
                <div className="panel right-panel">
                    <div className="content">
                        <img src={image3} alt="" className="logo-img" />
                        <img src={image2} alt="" className="img" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;