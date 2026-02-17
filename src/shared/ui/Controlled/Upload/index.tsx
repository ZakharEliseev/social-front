import { FC } from 'react';

import { Upload as AntdUpload, Button } from 'antd';
import { useController, useFormContext } from 'react-hook-form';

import { UploadOutlined } from '@ant-design/icons';

export interface Props {
    name: string;
}

export const Upload: FC<Props> = ({ name }) => {
    const { control } = useFormContext();

    const {
        field: { onChange },
    } = useController({ name, control });

    return (
        <AntdUpload
            maxCount={1}
            beforeUpload={() => false}
            onChange={(info) => {
                const file = info.fileList[0]?.originFileObj;
                onChange(file);
            }}>
            <Button icon={<UploadOutlined />}>Загрузить аватар</Button>
        </AntdUpload>
    );
};
