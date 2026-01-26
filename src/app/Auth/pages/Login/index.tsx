import { Navigate } from 'react-router';

import cls from '../../styles/index.module.scss';
import { LoginForm } from '../../ui/Form/Login';
import { Header } from '../../ui/Header';

const Login = () => {
    const token = localStorage.getItem('token');
    if (token) return <Navigate to={'/'} replace/>
    return (
        <div className={cls.authPage}>
            <Header />
            <LoginForm />
        </div>
    );
};

export default Login;
