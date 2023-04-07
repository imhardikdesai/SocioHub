import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import userNotFoundPath from "../../animation/UserNotFound.json";
import LottieBucket from "./LottieBucket";
const UserNotFound = () => {
  return (
    <Flex align="center" justify="center" h="50vh">
      <Flex direction="column" align="center" justify="center">
        <Box mt={"1rem"} height={"450px"}>
          <LottieBucket path={userNotFoundPath} />
        </Box>
        <Heading as="h2" my={4}>
          User Not Found
        </Heading>
        <Text textAlign={"center"} fontSize="md">
          We're sorry, but the user you are looking for does not exist.
        </Text>
      </Flex>
    </Flex>
  );
};

export default UserNotFound;
