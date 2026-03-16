import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { userApi } from '../../Profile/api/users';
import { searchUsersSchema } from '../models/constants';
import { GetUsersResponseList } from '../models/types';

interface SearchFormValues {
    text: string;
}

interface Props {
    setFoundUsers: React.Dispatch<React.SetStateAction<GetUsersResponseList>>;
    onSuccess?: () => void;
}

export const useSearchUsers = ({ setFoundUsers, onSuccess }: Props) => {
    const methods = useForm<SearchFormValues>({
        defaultValues: { text: '' },
        mode: 'onSubmit',
        resolver: yupResolver(searchUsersSchema),
    });

    const [trigger, { data: users }] = userApi.useLazySearchUsersQuery();

    const onSubmit = methods.handleSubmit(async (formData: SearchFormValues) => {
        const response = await trigger({ username: formData.text }).unwrap();
        onSuccess?.();
        setFoundUsers((prev) => [...prev, ...response]);
    });

    return { methods, onSubmit, users };
};
