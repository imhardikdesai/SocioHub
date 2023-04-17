import { useContext, useEffect, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  FormErrorMessage,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import LoginSchema from "../../validation/LoginSchema";
import { auth } from "../../firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { showRelevantErrorMessage, UpdateCurrentActiveStatus } from "../../utility/utils";
import Loader from "../../components/common/Loader";
import { OAuthButtonGroup } from "../../components/common/OAuthButtonGroup";
import LottieBucket from "../../components/common/LottieBucket";
import LoginHello from "../../animation/login-hello.json";
export default function Login() {
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };
  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      if (userCredential) {
        setCurrentUser(userCredential.user);
        UpdateCurrentActiveStatus(userCredential.user, true)
        toast.success("Login Successfully !!");
        navigate("/posts");
        setLoading(false);
      } else {
        toast.error("Something went wrong, please try again later");
        setLoading(false);
      }
    } catch (err) {
      showRelevantErrorMessage(err);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleLogin,
    validationSchema: LoginSchema,
  });

  useEffect(() => {
    if (currentUser) {
      navigate("/posts");
    }
  }, [navigate, currentUser]);

  const [spalsh, setSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => setSplash(false), 2900);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg="gray.50"
        _dark={{ background: "gray.800" }}
      >
        {spalsh ? (
          <LottieBucket path={LoginHello} />
        ) : (
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Sign in to your account</Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                to enjoy all of our cool{" "}
                <Link color={"blue.400"}>features</Link> ✌️
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={"white"}
              _dark={{ background: "gray.700" }}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <Form onSubmit={formik.handleSubmit}>
                  <FormControl
                    id="email"
                    isInvalid={formik.errors.email && formik.touched.email}
                  >
                    <FormLabel>Email address</FormLabel>
                    <Input
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="email"
                    />
                    {formik.touched.email && (
                      <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    id="password"
                    isInvalid={
                      formik.errors.password && formik.touched.password
                    }
                  >
                    <FormLabel>Password</FormLabel>
                    <Input
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="password"
                    />
                    {formik.touched.password && (
                      <FormErrorMessage>
                        {formik.errors.password}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <Stack spacing={5}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      mt={2}
                      justify={"end"}
                    >
                      <NavLink to="/signup" color={"blue.400"}>
                        <span> New User?</span>
                      </NavLink>
                    </Stack>
                    <Button
                      type="submit"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Sign in
                    </Button>
                  </Stack>
                </Form>
                <Stack spacing="6">
                  <HStack>
                    <Divider />
                    <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                      or continue with
                    </Text>
                    <Divider />
                  </HStack>
                  <OAuthButtonGroup />
                </Stack>
              </Stack>
            </Box>
          </Stack>
        )}
      </Flex>
    </>
  );
}
