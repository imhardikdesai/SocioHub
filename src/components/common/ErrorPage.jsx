import { Box, Text, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import LottieBucket from "./LottieBucket";
import error404 from "../../animation/error-404.json";

export default function ErrorPage() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <LottieBucket path={error404} />
      {/* <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text> */}
      <Text color={"gray.500"} mb={6}>
        The page you're looking for does not seem to exist
      </Text>
      <NavLink to={"/"}>
        <Button
          colorScheme="pink"
          bgGradient="linear(to-r, purple.400, pink.500)"
          color="white"
          variant="solid"
        >
          Go to Home
        </Button>
      </NavLink>
    </Box>
  );
}
