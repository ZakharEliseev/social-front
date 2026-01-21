import cls from '../../styles/index.module.scss';
import { RegisterForm } from '../../ui/Form/Register';


export const Register = () => {
    return (
        <div className={cls.authPage}>
            <div>
                <h1 className={cls.header}>Social</h1>
                <h2 className={cls.subheader}>Минималистичная соцсеть</h2>
            </div>
            <div className={cls.auth}>
                <RegisterForm />
            </div>
        </div>
    );
};

export default Register;
