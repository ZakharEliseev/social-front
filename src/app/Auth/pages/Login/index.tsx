import { Header } from 'antd/es/layout/layout';

import cls from '../../styles/index.module.scss';
import { LoginForm } from '../../ui/Form/Login';


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