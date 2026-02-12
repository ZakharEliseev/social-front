import { useForm } from "react-hook-form";

import { PostFormValues } from "@/app/Main/hooks/useAddPost";
import { yupResolver } from "@hookform/resolvers/yup";

import { editProfileSchema } from "../models/constants";

export const useEditProfile = () => {
    const methods = useForm<PostFormValues>({
        mode: 'onSubmit',
        resolver: yupResolver(editProfileSchema),
    });
    return {methods}};
