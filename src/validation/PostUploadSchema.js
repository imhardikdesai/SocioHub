import * as Yup from 'yup';

const PostUploadSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').min(10, 'Title must be at least 10 characters long'),
    description: Yup.string().required('Description is required').min(20, 'Description must be at least 20 characters long'),
});


export default PostUploadSchema;
