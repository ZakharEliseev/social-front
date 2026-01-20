import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';


type FieldType = {
    email?: string;
    password?: string;
};

export const useLoginForm = () => {
      const {
          control,
          handleSubmit,
          formState: { errors },
      } = useForm<FieldType>();

      const navigate = useNavigate();

      const onSubmit = async (data: FieldType) => {
          try {
              const response = await axios.post('/api/v1/auth/login', data);
              const { accessToken } = response.data;
              accessToken && navigate('/');
              localStorage.setItem('token', accessToken);
          } catch (err) {
              console.error('>>', err);
          }
      };
    
    return {
      control,
      handleSubmit,
      errors,
      onSubmit
    }};
