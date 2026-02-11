import { FormProvider } from 'react-hook-form';

import { Controlled } from '@/shared/ui/';

import { useSearchUsers } from '../../hooks/useSearchUsers';



export const SearchForm = () => {
    const { methods, onSubmit } = useSearchUsers();
    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                <Controlled.Input name="text" label="" type="text" placeholder='Введите имя пользователя и нажмите Enter'/>
            </form>
        </FormProvider>
    );
};
