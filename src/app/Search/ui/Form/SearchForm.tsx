import { FormProvider } from 'react-hook-form';

import { Controlled } from '@/shared/ui/Controlled';

import { useSearchUsers } from '../../hooks/useSearchUsers';
import { GetUsersResponseList } from '../../models/constants';

interface Props {
    setFoundUsers: React.Dispatch<React.SetStateAction<GetUsersResponseList>>;
    onSuccess?: () => void;
}

export const SearchForm = ({ setFoundUsers, onSuccess }: Props) => {
    const { methods, onSubmit } = useSearchUsers({ setFoundUsers, onSuccess });
    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                <Controlled.Input
                    name="text"
                    label=""
                    type="text"
                    variant="outlined"
                    placeholder="Введите имя пользователя и нажмите Enter"
                />
            </form>
        </FormProvider>
    );
};
