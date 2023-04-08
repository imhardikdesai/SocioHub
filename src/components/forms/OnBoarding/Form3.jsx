import { Avatar, Button, Flex, FormControl, Text, chakra,VisuallyHidden,Icon,Stack, FormLabel, GridItem, Heading, Input, SimpleGrid, Textarea, FormErrorMessage } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaUser } from "react-icons/fa";

// Account Profile Details ==> Bio, Image
const Form3 = (props) => {
    const { values, handleChange, handleBlur, errors, touched } = props.action;
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const {
        acceptedFiles: acceptedFiles1,
        getRootProps: getRootProps1,
        getInputProps: getInputProps1,
    } = useDropzone({
        accept: {
            "image/png": [".png", ".jpg", ".jpeg"],
        },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            setFile1(acceptedFiles[0]);
        },
    });
    const {
        acceptedFiles: acceptedFiles2,
        getRootProps: getRootProps2,
        getInputProps: getInputProps2,
    } = useDropzone({
        accept: {
            "image/png": [".png", ".jpg", ".jpeg"],
        },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            setFile2(acceptedFiles[0]);
        },
    });

    useEffect(() => {
        values.profileImage = file1;
        values.coverImage = file2;
    }, [file1, file2, values]);
    return (
        <>
            <Heading w="100%" textAlign={"center"} fontWeight="normal">
                Profile Details
            </Heading>
            <SimpleGrid columns={1} spacing={6}>
                {/* Bio Area  */}
                <FormControl id="bio" mt={1} isInvalid={errors.bio && touched.bio}>
                    <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: "gray.50",
                        }}
                    >
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
                            sm: "sm",
                        }}
                    />
                    {touched.bio && <FormErrorMessage>{errors.bio}</FormErrorMessage>}
                </FormControl>
                {/* Occupation  */}
                <FormControl
                    as={GridItem}
                    isInvalid={errors.occupation && touched.occupation}
                >
                    <FormLabel
                        htmlFor="occupation"
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: "gray.50",
                        }}
                        mt="2%"
                    >
                        Occupation
                    </FormLabel>
                    <Input
                        value={values.occupation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        name="occupation"
                        id="occupation"
                        autoComplete="occupation"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                    />
                    {touched.occupation && (
                        <FormErrorMessage>{errors.occupation}</FormErrorMessage>
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
                        {acceptedFiles1.length !== 0 ? (
                            <Avatar
                                boxSize={12}
                                src={URL.createObjectURL(acceptedFiles1[0])}
                            />
                        ) : (
                            <Avatar
                                boxSize={12}
                                bg="gray.100"
                                _dark={{
                                    bg: "gray.800",
                                }}
                                icon={
                                    <Icon
                                        as={FaUser}
                                        boxSize={9}
                                        mt={3}
                                        rounded="full"
                                        color="gray.300"
                                        _dark={{ color: "gray.700" }}
                                    />
                                }
                            />
                        )}
                        <Button
                            {...getRootProps1({ className: "dropzone" })}
                            type="button"
                            ml={5}
                            variant="outline"
                            size="sm"
                            fontWeight="medium"
                            _focus={{
                                shadow: "none",
                            }}
                        >
                            <input
                                {...getInputProps1()}
                                type="file"
                                accept="image/png,image/jpeg,image/jpg"
                            />
                            Choose Profile
                        </Button>
                    </Flex>
                </FormControl>

                {/* Cover Photo */}
                <FormControl {...getRootProps2({ className: "dropzone" })}>
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
                    <input
                        {...getInputProps2()}
                        type="file"
                        accept="image/png,image/jpeg,image/jpg"
                    />
                    <Flex
                        backgroundImage={
                            acceptedFiles2.length !== 0 &&
                            URL.createObjectURL(acceptedFiles2[0])
                        }
                        backgroundSize="cover"
                        backgroundPosition={"center center"}
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
                        <Stack
                            spacing={1}
                            textAlign="center"
                            height={acceptedFiles2.length !== 0 && "13rem"}
                        >
                            {acceptedFiles2.length === 0 && (
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
                            )}
                        </Stack>
                    </Flex>
                </FormControl>
            </SimpleGrid>
        </>
    );
};

export default Form3