import React, { useEffect, useState } from 'react';
import {
    Progress,
    Box,
    ButtonGroup,
    Button,
    Heading,
    Flex,
    FormControl,
    GridItem,
    FormLabel,
    Input,
    Select,
    SimpleGrid,
    InputGroup,
    Textarea,
    FormHelperText,
    InputRightElement,
    Stack,
    chakra,
    VisuallyHidden,
    Text,
    Icon,
    FormErrorMessage,
    Avatar
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import CountryData from '../../constant/CountryData';
import { useFormik } from 'formik';
import SignupSchema from '../../validation/SignupSchema';
import { FaUser } from 'react-icons/fa';


// First Name , Last name , Email and Password
const Form1 = (props) => {
    const { values, handleChange, handleBlur, errors, touched } = props.action
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);


    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                User Registration
            </Heading>
            {/* <Form> */}
            <Flex>
                <FormControl
                    mr='5%'
                    id="firstName"
                    isInvalid={errors.firstName && touched.firstName}>
                    <FormLabel>First Name</FormLabel>
                    <Input
                        name='firstName'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        type="text"
                        placeholder='First Name' />
                    {touched.firstName && (
                        <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                    )}
                </FormControl>

                <FormControl
                    id="lastName"
                    isInvalid={errors.lastName && touched.lastName}>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                        name='lastName'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        type="text"
                        placeholder='Last Name' />
                    {touched.lastName && (
                        <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                    )}
                </FormControl>
            </Flex>

            <FormControl
                mt={'2%'}
                id="email"
                isInvalid={errors.email && touched.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="email"
                />
                <FormHelperText>We'll never share your email.</FormHelperText>
                {touched.email && (
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                )}
            </FormControl>

            <FormControl
                id="password"
                isInvalid={errors.password && touched.password}>
                <FormLabel htmlFor="password" fontWeight={'normal'} mt="2%">
                    Password
                </FormLabel>
                <InputGroup>
                    <Input
                        pr='4%'
                        type={show ? 'text' : 'password'}
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
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

// Personal Residence Details
const Form2 = (props) => {
    const { values, handleChange, handleBlur, errors, touched } = props.action
    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                User Details
            </Heading>

            {/* Country  */}
            <FormControl as={GridItem} colSpan={[6, 3]} isInvalid={errors.country && touched.country} >
                <FormLabel
                    htmlFor="country"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }}>
                    Country / Region
                </FormLabel>

                <Select
                    onChange={handleChange}
                    id='country'
                    name="country"
                    autoComplete="country"
                    placeholder="Select option"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    value={values.country}
                    size="sm"
                    w="full"
                    rounded="md">
                    {
                        CountryData.map(country => {
                            return <option key={country.code}>{country.name}</option>
                        })
                    }
                </Select>
                {touched.country && (
                    <FormErrorMessage>{errors.country}</FormErrorMessage>
                )}
            </FormControl>

            {/* City  */}
            <FormControl as={GridItem} colSpan={[6, 6, null, 2]} isInvalid={errors.city && touched.city}>
                <FormLabel
                    htmlFor="city"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }}
                    mt="2%">
                    City
                </FormLabel>
                <Input
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="city"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                />
                {touched.city && (
                    <FormErrorMessage>{errors.city}</FormErrorMessage>
                )}
            </FormControl>

            {/* State  */}
            <FormControl as={GridItem} colSpan={[6, 3, null, 2]} isInvalid={errors.state && touched.state}>
                <FormLabel
                    htmlFor="state"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }}
                    mt="2%">
                    State / Province
                </FormLabel>
                <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    name="state"
                    value={values.state}
                    id="state"
                    autoComplete="state"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                />
                {touched.state && (
                    <FormErrorMessage>{errors.state}</FormErrorMessage>
                )}
            </FormControl>

        </>
    );
};

// Account Profile Details ==> Bio, Image
const Form3 = (props) => {
    const { values, handleChange, handleBlur, errors, touched } = props.action
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const { acceptedFiles: acceptedFiles1, getRootProps: getRootProps1, getInputProps: getInputProps1 } = useDropzone({
        accept: 'image/jpeg, image/png, image/jpg',
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            setFile1(acceptedFiles[0]);
        }
    });
    const { acceptedFiles: acceptedFiles2, getRootProps: getRootProps2, getInputProps: getInputProps2 } = useDropzone({
        accept: 'image/jpeg, image/png,, image/jpg',
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            setFile2(acceptedFiles[0]);
        }
    });

    useEffect(() => {
        values.profileImage = file1
        values.coverImage = file2
    }, [file1, file2, values])
    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal">
                Profile Details
            </Heading>
            <SimpleGrid columns={1} spacing={6}>
                {/* Bio Area  */}
                <FormControl id="bio" mt={1} isInvalid={errors.bio && touched.bio} >
                    <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        Bio
                    </FormLabel>
                    <Textarea
                        placeholder="I am Passionate about..."
                        rows={3}
                        shadow="sm"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.bio}
                        focusBorderColor="brand.400"
                        fontSize={{
                            sm: 'sm',
                        }}
                    />
                    {touched.bio && (
                        <FormErrorMessage>{errors.bio}</FormErrorMessage>
                    )}
                </FormControl>
                {/* Profile Pic */}
                <FormControl>
                    <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: "gray.50",
                        }}
                    >
                        Profile Photo
                    </FormLabel>
                    <Flex alignItems="center" mt={1}>

                        {
                            acceptedFiles1.length !== 0 ?
                                <Avatar
                                    boxSize={12}
                                    src={URL.createObjectURL(acceptedFiles1[0])}
                                /> :
                                < Avatar
                                    boxSize={12}
                                    bg="gray.100"
                                    _dark={{
                                        bg: "gray.800",
                                    }}
                                    icon={
                                        <Icon as={FaUser} boxSize={9} mt={3} rounded="full" color="gray.300" _dark={{ color: "gray.700", }}
                                        />
                                    }
                                />
                        }
                        <Button
                            {...getRootProps1({ className: 'dropzone' })}
                            type="button"
                            ml={5}
                            variant="outline"
                            size="sm"
                            fontWeight="medium"
                            _focus={{
                                shadow: "none",
                            }}
                        >
                            <input {...getInputProps1()} />
                            Choose Profile
                        </Button>
                    </Flex>
                </FormControl>

                {/* Cover Photo */}
                <FormControl  {...getRootProps2({ className: 'dropzone' })}>
                    <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: "gray.50",
                        }}
                    >
                        Cover photo
                    </FormLabel>
                    <input {...getInputProps2()} />
                    <Flex
                        backgroundImage={acceptedFiles2.length !== 0 && URL.createObjectURL(acceptedFiles2[0])}
                        backgroundSize='cover'
                        backgroundPosition={'center center'}
                        mt={1}
                        justify="center"
                        px={6}
                        pt={5}
                        pb={6}
                        borderWidth={2}
                        _dark={{
                            color: "gray.500",
                        }}
                        borderStyle="dashed"
                        rounded="md"
                    >
                        <Stack spacing={1} textAlign="center" height={acceptedFiles2.length !== 0 && '13rem'}>
                            {
                                acceptedFiles2.length === 0 &&
                                <>
                                    <Icon
                                        mx="auto"
                                        boxSize={12}
                                        color="gray.400"
                                        _dark={{
                                            color: "gray.500",
                                        }}
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </Icon>
                                    <Flex
                                        fontSize="sm"
                                        color="gray.600"
                                        _dark={{
                                            color: "gray.400",
                                        }}
                                        alignItems="baseline"
                                    >
                                        <chakra.label
                                            htmlFor="file-upload"
                                            cursor="pointer"
                                            rounded="md"
                                            fontSize="md"
                                            color="brand.600"
                                            _dark={{
                                                color: "brand.200",
                                            }}
                                            pos="relative"
                                            _hover={{
                                                color: "brand.400",
                                                _dark: {
                                                    color: "brand.300",
                                                },
                                            }}
                                        >
                                            <span>Upload a file</span>
                                            <VisuallyHidden>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                />
                                            </VisuallyHidden>
                                        </chakra.label>
                                        <Text pl={1}>or drag and drop</Text>
                                    </Flex>
                                    <Text
                                        fontSize="xs"
                                        color="gray.500"
                                        _dark={{
                                            color: "gray.50",
                                        }}
                                    >
                                        PNG, JPG, GIF up to 10MB
                                    </Text>
                                </>
                            }
                        </Stack>
                    </Flex>
                </FormControl>
            </SimpleGrid>
        </>
    );
};

export default function OnBoarding() {
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(33.33);
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        country: '',
        city: '',
        state: '',
        bio: '',
        coverImage: [],
        profileImage: []
    }
    const initialErrors = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        country: '',
        city: '',
        state: '',
        bio: ''
    }
    const handleSubmit = (values) => {
        console.log(values);
    }
    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit,
        validationSchema: SignupSchema,
        initialErrors
    })
    console.log(formik.values.profileImage);
    console.log(formik.values.coverImage);
    return (
        <>
            <Box
                borderWidth="1px"
                rounded="lg"
                shadow="1px 1px 3px rgba(0,0,0,0.3)"
                maxWidth={800}
                p={6}
                m="100px auto"
                as="form"
                onSubmit={formik.handleSubmit}>
                <Progress
                    hasStripe
                    value={progress}
                    mb="5%"
                    mx="5%"
                    isAnimated></Progress>
                {step === 1 ? <Form1 action={formik} /> : step === 2 ? <Form2 action={formik} /> : <Form3 action={formik} />}
                <ButtonGroup mt="5%" w="100%">
                    <Flex w="100%" justifyContent="space-between">
                        <Flex>
                            <Button
                                onClick={() => {
                                    setStep(step - 1);
                                    setProgress(progress - 33.33);
                                }}
                                isDisabled={step === 1}
                                colorScheme="teal"
                                variant="solid"
                                w="7rem"
                                mr="5%">
                                Back
                            </Button>
                            <Button
                                w="7rem"
                                isDisabled={
                                    (step === 3)
                                }
                                onClick={() => {
                                    setStep(step + 1);
                                    if (step === 3) {
                                        setProgress(100);
                                    } else {
                                        setProgress(progress + 33.33);
                                    }
                                }}
                                colorScheme="teal"
                                variant="outline">
                                Next
                            </Button>
                        </Flex>
                        {step === 3 && (
                            <Button
                                isDisabled={Object.keys(formik.errors).length !== 0}
                                w="7rem"
                                colorScheme="red"
                                variant="solid"
                                type='submit'>
                                Submit
                            </Button>
                        )}
                    </Flex>
                </ButtonGroup>
            </Box>
        </>
    );
}