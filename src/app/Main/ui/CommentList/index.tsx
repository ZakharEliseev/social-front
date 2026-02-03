import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { AddNewCommentResponse, GetCommentResponse } from '@/app/Main/models/types/constants';
import { Avatar } from '@/shared/ui';
import { useVirtualizer } from '@tanstack/react-virtual';

import { postApi } from '../../api/posts';
import { POST_COMMENT_COUNT } from '../../models/constants';
import { AddComment } from '../Form/AddComment';

import cls from './index.module.scss';

interface Props {
    postId: number;
    commentList?: AddNewCommentResponse[];
    isVisibleComments: boolean;
    setIsVisibleComments: Dispatch<SetStateAction<{ [postId: number]: boolean }>>;
    onCommentAdded?: () => void;
}

export const CommentList = ({ postId, isVisibleComments, onCommentAdded }: Props) => {
    const [allComments, setAllComments] = useState<GetCommentResponse>([]);
    const [commentsCount, setCommentsCount] = useState<number>(0);

    const { data: commentList } = postApi.useGetAllCommentsQuery(
        {
            id: postId,
            params: { offset: commentsCount * POST_COMMENT_COUNT, limit: POST_COMMENT_COUNT },
        },
        { skip: !isVisibleComments },
    );

    const parentRef = useRef<HTMLDivElement>(null);
    const rowVirtualizer = useVirtualizer({
        count: allComments?.length || 0,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 50,
        gap: 10,
    });
    const visibleVirtualItems = rowVirtualizer.getVirtualItems();
    const lastVisibleVirtualItem = visibleVirtualItems[visibleVirtualItems.length - 1]?.index;

    useEffect(() => {
        if (commentList) {
            setAllComments((prev) => [...prev, ...commentList]);
        }
    }, [commentList]);

    useEffect(() => {
        if (!commentList || commentList?.length === 0) return;
        if (lastVisibleVirtualItem >= allComments?.length - 2) {
            setCommentsCount((prev) => prev + 1);
        }
    }, [rowVirtualizer.range?.endIndex]);

    return (
        <>
            <div
                ref={parentRef}
                style={{
                    maxHeight: isVisibleComments ? '100px' : '',
                    overflow: 'auto',
                    transition: 'max-height 0.2s',
                }}>
                <div
                    style={{
                        minHeight: isVisibleComments ? `${rowVirtualizer.getTotalSize()}px` : 0,
                        width: '100%',
                        position: 'relative',
                    }}>
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const comment = allComments?.[virtualRow.index];
                        if (!comment) return;

                        return (
                            <div
                                key={virtualRow.key}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: `auto`,
                                    transform: `translateY(${virtualRow.start}px)`,
                                }}>
                                <div
                                    className={isVisibleComments ? cls.content : cls.hiddenContent}
                                    key={comment.id}>
                                    {<Avatar username={comment.author.username} />}
                                    <div className={cls.commentContent}>
                                        <p className={cls.username}>{comment.author.username}</p>
                                        <p className={cls.userText}>{comment.text}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <AddComment onCommentAdded={onCommentAdded} postId={postId} />
            </div>
        </>
    );
};
