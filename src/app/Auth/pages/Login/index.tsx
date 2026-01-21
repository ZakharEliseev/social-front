import cls from '../../styles/index.module.scss';
import { LoginForm } from '../../ui/Form/Login';


const Login = () => {
    
    return (
        <div className={cls.authPage}>
            <div>
                <h1 className={cls.header}>Social</h1>
                <h2 className={cls.subheader}>Минималистичная соцсеть</h2>
            </div>
            <div className={cls.auth}>
                <LoginForm />
            </div>
        </div>
    );};

export default Login;