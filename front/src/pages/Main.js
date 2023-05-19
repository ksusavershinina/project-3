import '../styles/main.css';
import '../styles/fonts.css';
import levelup from '../images/level_up_purple.svg';
import mainimg from '../images/main-image.svg';
import {Link} from 'react-router-dom';
import ReactCardSlider from '../components/ReactCardSlider';
import SignInUpButtons from '../components/SignInUpButtons';
import SignedInButton from '../components/SignedInButton';
import UserProfile from './UserProfile';
import CustomerProfile from './CustomerProfile';
import { useState } from 'react';

import google from '../images/slider/google.svg';
import amazon from '../images/slider/amazon.svg';
import defence from '../images/slider/defense.svg';
import instacart from '../images/slider/instacart.svg';
import Microsoft from '../images/slider/Microsoft.svg';
import nike from '../images/slider/nike.svg';
import uber from '../images/slider/uber.svg';

const Main = ({isSignedIn, userData}) => {


    const slides = [
        { image: google },
        { image: amazon },
        { image: defence },
        { image: instacart },
        { image: Microsoft },
        { image: nike },
        { image: uber },
    ];

    const [showProfile, setShowProfile] = useState(false)

    if (showProfile && userData.companyName === '') {
        return <UserProfile setShowProfile={setShowProfile} userData={userData} />
    }
    else if (showProfile && userData.companyName !== '') {
        return <CustomerProfile setShowProfile={setShowProfile} userData={userData} />
    }
    else {
    return (
        <>
            <div className="main_header">
                <div className="main_header__section">
                    <Link to='/'>
                        <div className="main_headerlogo">
                            <img src={levelup} alt="" />
                        </div>
                    </Link> 
                </div>
                <div className="main_header__section">
                    {isSignedIn ? <SignedInButton setShowProfile={setShowProfile} /> : <SignInUpButtons />}
                </div>
            </div>
            <div className="main_wrapper">
                <div className="main_text">
                    <div className="main_information">
                        <p className="main_h1">
                            Новая платформа для взаимодействия студентов и реальных заказчиков
                        </p>
                        <p className="main_h3">
                            Учавствуйте в проектах, повышайте скиллы и пополняйте своё портфолио
                        </p>
                    </div>
                    <div className="main_partners">
                        <p className="main_carousel-name">
                            Наши партнеры:
                        </p>
                        <ReactCardSlider slides={slides} />
                    </div>
                </div>
                <div className="main_image">
                    <img src={mainimg} alt="" />
                </div>
            </div>
        </>
    );
    }
}

export default Main;