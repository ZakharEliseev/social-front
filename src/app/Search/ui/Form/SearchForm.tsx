import { FormProvider } from 'react-hook-form';

import { Controlled } from '@/shared/ui/Controlled';

import { useSearchUsers } from '../../hooks/useSearchUsers';
import { GetUsersResponseList } from '../../models/constants';

interface Props {
    setFoundUsers: React.Dispatch<React.SetStateAction<GetUsersResponseList>>;
}

export const SearchForm = ({ setFoundUsers }: Props) => {
    const { methods, onSubmit } = useSearchUsers({setFoundUsers});
    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                <Controlled.Input
                    name="text"
                    label=""
                    type="text"
                    placeholder="Введите имя пользователя и нажмите Enter"
                />
            </form>
        </FormProvider>
    );
};
