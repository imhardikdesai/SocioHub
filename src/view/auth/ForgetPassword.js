import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react'
import { sendPasswordResetEmail } from 'firebase/auth';
import { useFormik } from 'formik';
import { useContext, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { auth } from '../../firebase/firebase-config';
import ForgetPasswordSchema from '../../validation/ForgetPasswordSchema';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const initialValues = {
    email: "",
  };
  const handleResetPassword = async (data) => {
    try {
      sendPasswordResetEmail(auth, data.email).then(() => {
        toast.success('Password reset link sent to ' + data.email)
        navigate('/login')
      })
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  const formik = useFormik({
    initialValues,
    onSubmit: handleResetPassword,
    validationSchema: ForgetPasswordSchema,
  });

  useEffect(() => {
    if (currentUser) {
      navigate("/posts");
    }
  }, [navigate, currentUser]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Forgot your password?
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}>
            You&apos;ll get an email with a reset link
          </Text>
          <FormControl isInvalid={formik.errors.email && formik.touched.email}
            id="email">
            <Input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
            />
            {formik.touched.email && (
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            )}
          </FormControl>
          <Stack spacing={6}>
            <Button
              type="submit"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Request Reset
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Form>
  )
}