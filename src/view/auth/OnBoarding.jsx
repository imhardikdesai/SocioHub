import React, { useState } from 'react';
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
    Icon
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useToast } from '@chakra-ui/react';
import CountryData from '../../constant/CountryData';

// First Name , Last name , Email and Password
const Form1 = () => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                User Registration
            </Heading>
            <Flex>
                <FormControl mr="5%">
                    <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                        First name
                    </FormLabel>
                    <Input id="first-name" placeholder="First name" />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="last-name" fontWeight={'normal'}>
                        Last name
                    </FormLabel>
                    <Input id="last-name" placeholder="First name" />
                </FormControl>
            </Flex>
            <FormControl mt="2%">
                <FormLabel htmlFor="email" fontWeight={'normal'}>
                    Email address
                </FormLabel>
                <Input id="email" type="email" />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="password" fontWeight={'normal'} mt="2%">
                    Password
                </FormLabel>
                <InputGroup size="md">
                    <Input
                        pr="4.5rem"
                        type={show ? 'text' : 'password'}
                        placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
        </>
    );
};

// Personal Residence Details
const Form2 = () => {
    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                User Details
            </Heading>

            {/* Country  */}
            <FormControl as={GridItem} colSpan={[6, 3]}>
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
                    id='country'
                    name="country"
                    autoComplete="country"
                    placeholder="Select option"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md">
                    {
                        CountryData.map(country => {
                            return <option key={country.code}>{country.name}</option>
                        })
                    }
                </Select>

            </FormControl>

            {/* City  */}
            <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
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
            </FormControl>

            {/* State  */}
            <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
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
                    type="text"
                    name="state"
                    id="state"
                    autoComplete="state"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                />
            </FormControl>

        </>
    );
};

// Account Profile Details ==> Bio, Image
const Form3 = () => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/png': ['.png', '.jpg'],
        },
        maxFiles: 1
    });
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal">
                Profile Details
            </Heading>
            <SimpleGrid columns={1} spacing={6}>
                {/* Bio Area  */}
                <FormControl id="bio" mt={1}>
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
                        focusBorderColor="brand.400"
                        fontSize={{
                            sm: 'sm',
                        }}
                    />
                </FormControl>

                {/* Cover Photo */}
                <FormControl  {...getRootProps({ className: 'dropzone' })}>
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
                    <input {...getInputProps()} />
                    <Flex
                        backgroundImage={acceptedFiles.length !== 0 && URL.createObjectURL(acceptedFiles[0])}
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
                        <Stack spacing={1} textAlign="center" height={acceptedFiles.length !== 0 && '13rem'}>
                            {
                                acceptedFiles.length === 0 &&
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
                    {files}
                </FormControl>
            </SimpleGrid>
        </>
    );
};

export default function OnBoarding() {
    const toast = useToast();
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(33.33);
    return (
        <>
            <Box
                borderWidth="1px"
                rounded="lg"
                shadow="1px 1px 3px rgba(0,0,0,0.3)"
                maxWidth={800}
                p={6}
                m="100px auto"
                as="form">
                <Progress
                    hasStripe
                    value={progress}
                    mb="5%"
                    mx="5%"
                    isAnimated></Progress>
                {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
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
                                isDisabled={step === 3}
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
                        {step === 3 ? (
                            <Button
                                w="7rem"
                                colorScheme="red"
                                variant="solid"
                                onClick={() => {
                                    toast({
                                        title: 'Account created.',
                                        description: "We've created your account for you.",
                                        status: 'success',
                                        duration: 3000,
                                        isClosable: true,
                                    });
                                }}>
                                Submit
                            </Button>
                        ) : null}
                    </Flex>
                </ButtonGroup>
            </Box>
        </>
    );
}