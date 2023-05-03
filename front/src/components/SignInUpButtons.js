import {Link} from 'react-router-dom';

const SignInUpButtons = () => {
    return (
        <div>
            <Link to='login'><button className="header__item no-fill">Войти</button></Link>
            <Link to='registration'><button className="header__item fill">Создать</button></Link>
        </div>
    )
}

export default SignInUpButtons;