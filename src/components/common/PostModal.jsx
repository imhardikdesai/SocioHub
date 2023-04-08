import React, { useState, useEffect, useContext } from "react";
import PicDropZone from "./PicDropZone";
import { useFormik } from "formik";
import Loader from "../common/Loader";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  Textarea,
  ModalContent,
  ModalCloseButton,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { Form } from "react-bootstrap";
import PostUploadSchema from "../../validation/PostUploadSchema";
import { UploadFileAndGetDownloadUrl } from "../../utility/utils";
import { AuthContext } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { updateChanges } from "../../redux/actions/authActions";

const PostModal = ({ isOpen, onClose, overlay }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const initialValues = {
    title: "",
    description: "",
    postImage: file,
  };

  const handleFormSubmit = (values) => {
    setLoading(true);
    UploadFileAndGetDownloadUrl(values, currentUser, setLoading).then(() => {
      dispatch(updateChanges())
    })
    onClose();
    handleReset();
  };

  const {
    touched,
    errors,
    values,
    handleBlur,
    handleReset,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: PostUploadSchema,
  });
  useEffect(() => {
    values.postImage = file;
  }, [file, values]);
  return (
    <>
      {loading && <Loader />}
      <Modal
        closeOnOverlayClick={false}
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          handleReset();
        }}
      >
        {overlay}

        <ModalContent>
          <ModalHeader>Create your Post</ModalHeader>
          <ModalCloseButton />
          <Form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl
                mr="5%"
                id="title"
                isInvalid={errors.title && touched.title}
              >
                <FormLabel>Post Title</FormLabel>
                <Input
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  type="text"
                  placeholder="Post title"
                />
                {touched.title && (
                  <FormErrorMessage>{errors.title}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl my={2}>
                <FormLabel>Upload Post</FormLabel>
                <PicDropZone file={file} setFile={setFile} />
                {/* {<FormErrorMessage>Upload at least one image</FormErrorMessage>} */}
              </FormControl>

              <FormControl
                isInvalid={errors.description && touched.description}
                mt={4}
              >
                <FormLabel>Post Description</FormLabel>
                <Textarea
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  placeholder="Post description..."
                />
                {touched.description && (
                  <FormErrorMessage>{errors.description}</FormErrorMessage>
                )}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                isDisabled={file === null}
                type="submit"
                colorScheme="blue"
                mr={3}
              >
                Upload
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  handleReset();
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostModal;
