import * as Yup from 'yup';

const passwordSchema =
    Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password must be at most 20 characters')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .required('Password is required')


const mobileSchema =
    Yup.string()
        .min(10, 'Phone number must be at least 10 digits')
        .max(12, 'Phone number must be at most 12 digits')
        .matches(/^[0-9]+$/, 'Phone number must contain only digits')
        .required('Phone number is required')




export { passwordSchema, mobileSchema };
