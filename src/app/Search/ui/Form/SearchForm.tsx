import { FormProvider } from 'react-hook-form';

import { Input } from '@/shared/ui/Controlled';

import { useSearchUsers } from '../../hooks/useSearchUsers';



export const SearchForm = () => {
    const { methods, onChange } = useSearchUsers();
    return (
        <FormProvider {...methods}>
            <form onChange={onChange}>
                <Input name="text" label='' type="text" />
            </form>
        </FormProvider>
    );
};
