import { RegisterForm } from '../../ui/Form/RegisterForm';

import cls from './index.module.scss';

export const RegisterPage = () => {
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

export default RegisterPage;
