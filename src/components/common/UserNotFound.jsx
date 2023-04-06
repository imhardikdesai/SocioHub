import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useLottie } from "lottie-react";
import userNotFoundPath from "../../animation/UserNotFound.json";
const UserNotFound = () => {
  const options = {
    animationData: userNotFoundPath,
    loop: true,
  };

  const { View } = useLottie(options);
  console.log(View);

  return (
    <Flex align="center" justify="center" h="50vh">
      <Flex direction="column" align="center" justify="center">
        <Box mt={"1rem"} height={"450px"}>
          {View}
        </Box>
        <Heading as="h2" mb={4}>
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
