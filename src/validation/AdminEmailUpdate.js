import * as Yup from 'yup';

const AdminEmailUpdateSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
});


export default AdminEmailUpdateSchema;
