import * as Yup from 'yup';

const ForgetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
});

export default ForgetPasswordSchema;
