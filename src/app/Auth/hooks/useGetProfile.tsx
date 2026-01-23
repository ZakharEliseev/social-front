import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { ProfileResponse, useGetUserProfileQuery } from '@/app/api';
import { setUserData } from '@/store/userSlice/index';

export const useGetProfile = () => {
    const dispatch = useDispatch();
    const { data = {} as ProfileResponse } = useGetUserProfileQuery(undefined);
    useEffect(() => {
      if(data) dispatch(setUserData(data));
    }, [data]);

    return {
      data
    }
};
