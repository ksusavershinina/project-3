import '../styles/main.css';
import '../styles/fonts.css';
import levelup from '../images/level_up_purple.svg';
import mainimg from '../images/main-image.svg';
import {Link} from 'react-router-dom';
import ReactCardSlider from '../components/ReactCardSlider';
import SignInUpButtons from '../components/SignInUpButtons';
import SignedInButton from '../components/SignedInButton';
import { useState } from 'react';

import google from '../images/slider/google.svg';
import amazon from '../images/slider/amazon.svg';
import defence from '../images/slider/defense.svg';
import instacart from '../images/slider/instacart.svg';
import Microsoft from '../images/slider/Microsoft.svg';
import nike from '../images/slider/nike.svg';
import uber from '../images/slider/uber.svg';

const Main = ({isSignedIn}) => {


    const slides = [
        { image: google },
        { image: amazon },
        { image: defence },
        { image: instacart },
        { image: Microsoft },
        { image: nike },
        { image: uber },
    ];

    return (
        <>
            <div className="header">
                <div className="header__section">
                    <Link to='/'>
                        <div className="headerlogo">
                            <img src={levelup} alt="" />
                        </div>
                    </Link> 
                </div>
                <div className="header__section">
                    {isSignedIn ? <SignedInButton /> : <SignInUpButtons />}
                </div>
            </div>
            <div className="wrapper">
                <div className="text">
                    <div className="information">
                        <p className="h1">
                            Новая платформа для взаимодействия студентов и реальных заказчиков
                        </p>
                        <p className="h3">
                            Учавствуйте в проектах, повышайте скиллы и пополняйте своё портфолио
                        </p>
                    </div>
                    <div className="partners">
                        <p className="carousel-name">
                            Наши партнеры:
                        </p>
                        <ReactCardSlider slides={slides} />
                    </div>
                </div>
                <div className="image">
                    <img src={mainimg} alt="" />
                </div>
            </div>
        </>
    );
}

export default Main;