import { Modal, Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react'
import { useFormik } from 'formik'
import React from 'react'
import { Form } from 'react-bootstrap'
import AdminEmailUpdateSchema from '../../validation/AdminEmailUpdate'

const AdminEmailModal = ({ isOpen, onClose }) => {
    const initialValues = {
        email: ''
    }
    const handleUpdateEmail = (values) => {
        console.log(values)
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