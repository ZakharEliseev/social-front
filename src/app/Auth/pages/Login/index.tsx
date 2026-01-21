import cls from '../../styles/index.module.scss';
import { LoginForm } from '../../ui/Form/Login';
import { Header } from '../../ui/Header';


const Login = () => {
    
    return (
        <div className={cls.authPage}>
            <Header/>
            <div className={cls.auth}>
                <LoginForm />
            </div>
        </div>
    );};

export default Login;