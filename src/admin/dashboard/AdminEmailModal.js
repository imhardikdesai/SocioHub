import React, { useContext } from 'react'
import { Modal, Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { Form } from 'react-bootstrap'
import { checkIfEmailExists } from '../../utility/admin'
import AdminEmailUpdateSchema from '../../validation/AdminEmailUpdate'
import { AuthContext } from '../../context/AuthContext'
import { useDispatch } from 'react-redux'
import { updateChanges } from '../../redux/actions/authActions'
import { useNavigate } from 'react-router-dom'

const AdminEmailModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch()
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const initialValues = {
        email: ''
    }
    const handleUpdateEmail = (values) => {
        checkIfEmailExists(values.email, currentUser, navigate).then(() => {
            onClose()
            navigate('/login')
            dispatch(updateChanges())
        })
    }
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues,
        onSubmit: handleUpdateEmail,
        validationSchema: AdminEmailUpdateSchema
    })
    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <Form onSubmit={handleSubmit}>
                        <ModalHeader>Update Admin Email</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>


                            <FormControl id="email" isInvalid={errors.email && touched.email}>
                                <FormLabel>Email Address</FormLabel>
                                <Input
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    placeholder="Email Address"
                                    type="email"
                                />
                                {touched.email && (
                                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                                )}
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button type='submit' colorScheme='blue' mr={3}>
                                Update
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </Form>

                </ModalContent>
            </Modal>
        </>
    )
}

export default AdminEmailModal