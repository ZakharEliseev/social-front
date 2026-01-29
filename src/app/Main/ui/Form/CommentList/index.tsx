import { Button } from 'antd';
import { FormProvider } from 'react-hook-form';

import { AddNewCommentResponse } from '@/app/Main/api/types/models';
import { Avatar } from '@/shared/ui';
import { Controlled } from '@/shared/ui/Controlled';

import { useAddComments } from '../../../hooks/useAddComments';

import cls from './index.module.scss';

interface Props {
    postId: number;
    commentList?: AddNewCommentResponse[];
    isVisible: Boolean;
}

export const CommentList = ({ postId, commentList, isVisible }: Props) => {
    const { methods, onSubmit } = useAddComments(postId);
    return (
        <>
            {commentList?.map((comment) => (
                <div className={isVisible ? cls.content : cls.hiddenContent} key={comment.id}>
                    {<Avatar username={comment.author.username} />}
                    <div className={cls.commentContent}>
                        <p className={cls.username}>{comment.author.username}</p>
                        <p className={cls.userText}>{comment.text}</p>
                    </div>
                </div>
            ))}
            <FormProvider {...methods}>
                <form onSubmit={onSubmit} className={cls.form}>
                    <Controlled.TextArea
                        name="text"
                        autoSize={{ minRows: 3, maxRows: 3 }}
                        placeholder="Написать комментарий"
                        variant="outlined"></Controlled.TextArea>
                    <Button
                        className={cls.btn}
                        type="primary"
                        htmlType="submit"
                        color="default"
                        variant="solid">
                        Отправить
                    </Button>
                </form>
            </FormProvider>
        </>
    );
};
