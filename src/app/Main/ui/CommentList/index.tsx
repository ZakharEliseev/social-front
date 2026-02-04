    import { SetStateAction } from 'react';

    import ReactModal from 'react-modal';

    import { Avatar } from '@/shared/ui';

    import { postApi } from '../../api/posts';
    import { POST_COMMENT_COUNT } from '../../models/constants';
    import { AddComment } from '../Form/AddComment';

    import cls from './index.module.scss';

    interface Props {
        postId: number;
        modalIsOpen: boolean;
        setModalIsOpen: React.Dispatch<SetStateAction<boolean>>;
    }

    export const CommentList = ({ postId, modalIsOpen, setModalIsOpen }: Props) => {
        const { data: commentList, isLoading } = postApi.useGetAllCommentsQuery({
            id: postId,
            params: { offset: 0, limit: POST_COMMENT_COUNT },
        });

        return (
            <>
                <ReactModal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    style={{
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
                        },
                        overlay: {
                            background: 'rgba(0,0,0,0.3)',
                        },
                    }}>
                    <div className={cls.comments}>
                        {isLoading ? (
                            <div>Загрузка комментариев</div>
                        ) : (
                            commentList?.map((comment) => (
                                <div className={cls.content} key={comment.id}>
                                    {<Avatar username={comment.author.username} />}
                                    <div className={cls.commentContent}>
                                        <p className={cls.username}>{comment.author.username}</p>
                                        <p className={cls.userText}>{comment.text}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <AddComment postId={postId} />
                </ReactModal>
            </>
        );
    };
