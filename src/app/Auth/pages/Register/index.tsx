import cls from '../../styles/index.module.scss';
import { RegisterForm } from '../../ui/Form/Register';
import { Header } from '../../ui/Header';

export const Register = () => {
    return (
        <div className={cls.authPage}>
            <Header />
            <RegisterForm />
        </div>
    );
};

export default Register;
