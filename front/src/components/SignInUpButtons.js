import {Link} from 'react-router-dom';

const SignInUpButtons = () => {
    return (
        <div>
            <Link to='login'><button className="main_header__item main_no-fill" style={{cursor: 'pointer'}}>Войти</button></Link>
            <Link to='registration'><button className="main_header__item main_fill" style={{cursor: 'pointer'}}>Создать</button></Link>
        </div>
    )
}

export default SignInUpButtons;