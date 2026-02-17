import { Button } from 'antd';
import { FormProvider } from 'react-hook-form';

import { useUpdateAvatar } from '@/app/Profile/hooks/useUploadAvatar';
import { Controlled } from '@/shared/ui/';

import cls from './index.module.scss';

interface Props {
    avatar?: string;
}
export const UploadAvatar = ({ avatar }: Props) => {
    const { methods, handleUpload, handleDelete } = useUpdateAvatar();

    return (
        <FormProvider {...methods}>
            <form className={cls.uploadForm}>
                <Controlled.Upload name="avatar" />
                <Button
                    type="primary"
                    htmlType="submit"
                    color="default"
                    variant="solid"
                    onClick={!avatar ? handleUpload : handleDelete}>
                    {!avatar ? 'Сохранить' : 'Удалить'}
                </Button>
            </form>
        </FormProvider>
    );
};
