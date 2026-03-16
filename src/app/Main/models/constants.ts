import * as yup from 'yup';

export const addPostSchema = yup.object({
    text: yup
        .string()
        .min(10, 'Пост должен состоять минимум из 10 символов')
        .max(100, 'Пост не должен превышать 100 символов')
        .required('Поле обязательно')
        .trim(),
});

export const addCommentSchema = yup.object({
    text: yup
        .string()
        .min(10, 'Комментарий должен состоять минимум из 10 символов')
        .max(100, 'Комментарий не должен превышать 100 символов')
        .required('Поле обязательно')
        .trim(),
});

export const POST_COMMENT_COUNT = 10;

export const modalStyles: ReactModal.Styles = {
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        maxHeight: '80vh',
        minHeight: '200px',
        height: `auto`,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },
    overlay: {
        background: 'rgba(0,0,0,0.3)',
    },
};
