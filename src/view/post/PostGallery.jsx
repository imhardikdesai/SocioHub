import {
  Box,
  Button,
  Flex,
  Heading,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
// import DummyPostData from "../../constant/DummyPostData";
import PostCard from "./PostCard";
import { HiDocumentAdd } from "react-icons/hi";
import PostModal from "../../components/common/PostModal";
import { AuthContext } from "../../context/AuthContext";
const PostGallery = () => {
  const { userDetails } = useContext(AuthContext);
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);

  return (
    <>
      <PostModal isOpen={isOpen} overlay={overlay} onClose={onClose} />
      <Flex
        mx={4}
        justifyContent={"space-between"}
        className="recent-post-header"
      >
        <Heading as="h2">Recent Post</Heading>
        <Box>
          <Button
            onClick={() => {
              setOverlay(<OverlayOne />);
              onOpen();
            }}
            bg={"blue.400"}
            rounded={"full"}
            color={"white"}
            flex={"1 0 auto"}
            _hover={{ bg: "blue.500" }}
          >
            Create Post
            <HiDocumentAdd className="ms-1" size={25} />
          </Button>
        </Box>
      </Flex>
      <div className="container-fluid mt-4">
        <div className="row">
          {userDetails &&
            (userDetails.posts !== "" ? (
              Object.values(userDetails.posts).map((item) => {
                return <PostCard key={item.id} item={item} />;
              })
            ) : (
              <h1>No Posts Avalible</h1>
            ))}
        </div>
      </div>
    </>
  );
};

export default PostGallery;
