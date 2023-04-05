import { useContext } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Textarea,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import { AuthContext } from "../../context/AuthContext";

export default function EditUserProfile({ setisEditProfile }) {
  const { userDetails } = useContext(AuthContext);
  const { firstName, lastName, occupation, bio, profileURL } = userDetails;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submited");
  };
  const initialValues = {
    firstName,
    lastName,
    bio,
    occupation,
  };
  const { values, handleChange } = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });
  return (
    <Stack
      mx={"auto"}
      spacing={4}
      w={"full"}
      maxW={"md"}
      bg={useColorModeValue("white", "gray.700")}
      rounded={"xl"}
      boxShadow={"lg"}
      p={6}
    >
      <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
        User Profile Edit
      </Heading>
      <Form onSubmit={handleSubmit}>
        <FormControl id="userProfile">
          <FormLabel>User Profile</FormLabel>
          <Stack direction={["column", "row"]} my={1} spacing={6}>
            <Center>
              <Avatar size="xl" src={profileURL}>
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Profile</Button>
            </Center>
          </Stack>
        </FormControl>
        {/* <FormControl my={2} id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl> */}
        <FormControl my={2} id="firstName" isRequired>
          <FormLabel>First name</FormLabel>
          <Input
            onChange={handleChange}
            value={values.firstName}
            placeholder="First Name"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl my={2} id="lastName" isRequired>
          <FormLabel>Last name</FormLabel>
          <Input
            onChange={handleChange}
            value={values.lastName}
            placeholder="Last Name"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl my={2} id="occupation" isRequired>
          <FormLabel>Occupation</FormLabel>
          <Input
            onChange={handleChange}
            value={values.occupation}
            placeholder="Occupation"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl my={2} id="bio" isRequired>
          <FormLabel>Bio</FormLabel>
          <Textarea
            onChange={handleChange}
            value={values.bio}
            placeholder="Bio"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        {/* <FormControl my={2} id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <FormControl my={2} id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: "gray.500" }}
            type="password"
          />
        </FormControl> */}
        <Stack my={3} spacing={6} direction={["column", "row"]}>
          <Button
            onClick={() => setisEditProfile((prev) => !prev)}
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
          >
            Submit
          </Button>
        </Stack>
      </Form>
    </Stack>
  );
}
