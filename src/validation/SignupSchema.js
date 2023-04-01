import * as Yup from 'yup';
import { passwordSchema } from './schema';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: passwordSchema,
    country: Yup.string().required('Country name is required'),
    city: Yup.string().required('City name is required'),
    state: Yup.string().required('State name is required'),
    occupation: Yup.string().required('Occupation is required')
});
// const SignupSchema = Yup.object().shape({
//     firstName: Yup.string().required('First name is required'),
//     lastName: Yup.string().required('Last name is required'),
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     password: passwordSchema
// });

export default SignupSchema;
