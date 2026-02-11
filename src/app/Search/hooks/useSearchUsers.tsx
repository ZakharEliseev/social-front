import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { userApi } from '../api/users';
import { searchUsersSchema } from '../models/constants';

interface SearchFormValues {
    text: string;
}

export const useSearchUsers = () => {
    const methods = useForm<SearchFormValues>({
        defaultValues: { text: '' },
        mode: 'onSubmit',
        resolver: yupResolver(searchUsersSchema),
    });

    const [trigger, { data: users }] = userApi.useLazySearchUsersQuery();

    const onChange = methods.handleSubmit(async (formData: SearchFormValues) => {
        await trigger({ username: formData.text });
    });


    return { methods, onChange, users };
};
