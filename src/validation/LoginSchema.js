    import * as Yup from 'yup';
    import { passwordSchema } from './schema';

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: passwordSchema
    });

    export default LoginSchema;
