// First Name , Last name , Email and Password

import { Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";



const Form1 = (props) => {
    const { values, handleChange, handleBlur, errors, touched } = props.action;
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
        <>
            <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
                User Registration
            </Heading>
            {/* <Form> */}
            <Flex>
                <FormControl
                    mr="5%"
                    id="firstName"
                    isInvalid={errors.firstName && touched.firstName}
                >
                    <FormLabel>First Name</FormLabel>
                    <Input
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        type="text"
                        placeholder="First Name"
                    />
                    {touched.firstName && (
                        <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                    )}
                </FormControl>

                <FormControl
                    id="lastName"
                    isInvalid={errors.lastName && touched.lastName}
                >
                    <FormLabel>Last Name</FormLabel>
                    <Input
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        type="text"
                        placeholder="Last Name"
                    />
                    {touched.lastName && (
                        <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                    )}
                </FormControl>
            </Flex>

            <FormControl
                mt={"2%"}
                id="email"
                isInvalid={errors.email && touched.email}
            >
                <FormLabel>Email address</FormLabel>
                <Input
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="email"
                />
                <FormHelperText>We'll never share your email.</FormHelperText>
                {touched.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
            </FormControl>

            <FormControl
                id="password"
                isInvalid={errors.password && touched.password}
            >
                <FormLabel htmlFor="password" fontWeight={"normal"} mt="2%">
                    Password
                </FormLabel>
                <InputGroup>
                    <Input
                        pr="4%"
                        type={show ? "text" : "password"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                {touched.password && (
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                )}
            </FormControl>
            {/* </Form> */}
        </>
    );
};

export default Form1