import React from "react";
import { useFormik } from "formik";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { Form } from "react-bootstrap";
import { updateUser } from "../../utility/admin";
import { useDispatch } from "react-redux";
import { updateChanges } from "../../redux/actions/authActions";

const UserEditModal = ({ user, isOpen, onClose, setCurrentPeople }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, bio, occupation, country, city, state } = user;
  const handleUpdateUser = (values) => {
    updateUser(values, user.username).then(() => {
      onClose();
      setCurrentPeople(null);
      dispatch(updateChanges());
    })
  };
  const handleClose = () => {
    setCurrentPeople(null);
    onClose();
  };
  const initialValues = {
    firstName,
    lastName,
    bio,
    occupation,
    country,
    state,
    city,
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: handleUpdateUser,
  });
  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User Details</ModalHeader>
          <ModalCloseButton />
          <Form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl id="firstName">
                <FormLabel>First name</FormLabel>
                <Input
                  onChange={handleChange}
                  value={values.firstName}
                  placeholder="First name"
                  type="text"
                />
              </FormControl>

              <FormControl mt={4} id="lastName">
                <FormLabel>Last name</FormLabel>
                <Input
                  onChange={handleChange}
                  value={values.lastName}
                  placeholder="Last name"
                  type="text"
                />
              </FormControl>
              <FormControl mt={4} id="occupation">
                <FormLabel>Occupation</FormLabel>
                <Input
                  onChange={handleChange}
                  value={values.occupation}
                  placeholder="Occupation"
                />
              </FormControl>
              <FormControl mt={4} id="bio">
                <FormLabel>Bio</FormLabel>
                <Textarea
                  onChange={handleChange}
                  value={values.bio}
                  placeholder="bio"
                />
              </FormControl>
              <FormControl mt={4} id="city">
                <FormLabel>City</FormLabel>
                <Input
                  onChange={handleChange}
                  value={values.city}
                  placeholder="City"
                />
              </FormControl>
              <FormControl mt={4} id="state">
                <FormLabel>State</FormLabel>
                <Input
                  onChange={handleChange}
                  value={values.state}
                  placeholder="State"
                />
              </FormControl>
              <FormControl mt={4} id="country">
                <FormLabel>Country</FormLabel>
                <Input
                  onChange={handleChange}
                  value={values.country}
                  placeholder="Country"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Update
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserEditModal;
