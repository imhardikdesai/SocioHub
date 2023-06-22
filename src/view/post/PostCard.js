import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Avatar,
  Image,
  chakra,
  Link,
  Box,
  Flex,
  Divider,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { ButtonToolbar, Col, OverlayTrigger, Popover } from "react-bootstrap";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getTimeDifference } from "../../utility/functions";
import { UserDetailsFromURL } from "../../utility/utils";
import PostPreview from "../../components/post/PostPreview";

const PostCard = ({ item, isPublic, isProfileView }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [load, setLoad] = useState(false)
  const data = useParams();
  const [publicUser, setPublicUser] = useState(null);
  const { title, description, url, likes = 0, username } = item;
  const { userDetails } = useContext(AuthContext);
  // const { firstName, lastName, occupation, profileURL } = userDetails;
  const [like, setLike] = useState(false);
  const popoverHoverFocus = (
    <Popover id="popover-trigger-hover-focus" title="Popover bottom">
      <Flex p={50} w="full" alignItems="center" justifyContent="center" >
        <Box
          w="xs"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          mx="auto"
        >
          <Image
            height={"84px"}
            width="84px"
            fit="cover"
            src={
              isPublic
                ? isProfileView
                  ? publicUser && publicUser.profileURL
                  : item.profileURL
                : userDetails && userDetails.profileURL
            }
            alt="avatar"
            mx={"auto"}
            borderRadius="57px"
          />

          <Box py={5} textAlign="center">
            <Link
              display="block"
              fontSize="2xl"
              color="gray.800"
              _dark={{
                color: "white",
              }}
              fontWeight="bold"
            >
              {isPublic
                ? isProfileView
                  ? publicUser &&
                  publicUser.firstName + " " + publicUser.lastName
                  : item.name
                : userDetails.firstName + " " + userDetails.lastName}
            </Link>
            <chakra.span
              fontSize="sm"
              color="gray.700"
              _dark={{
                color: "gray.200",
              }}
            >
              {isPublic
                ? isProfileView
                  ? publicUser && publicUser.occupation
                  : item.occupation
                : userDetails && userDetails.occupation}
            </chakra.span>
          </Box>
        </Box>
      </Flex>
    </Popover>
  );
  useEffect(() => {
    UserDetailsFromURL(data.username).then((user) => {
      setPublicUser(user);
    });
  }, [data.username]);
  setTimeout(() => {
    setLoad(true)
  }, 1000)

  const handleLikePost = () => {
    setLike((prev) => !prev)
  }

  return (
    <>
      <PostPreview isOpen={isOpen} item={item} onClose={onClose} />
      <Col sm={12} lg={6} xxl={4}>
        <Skeleton isLoaded={load}>
          <Card
            minH={"430px"}
            maxW={"sm"}
            my={2}
            className="post-card mx-sm-auto"
          >
            <CardBody onClick={onOpen} p={2} className="card-image-parent">
              <Image
                onDoubleClick={() => console.log('like')}
                objectFit={"contain"}
                width={"100%"}
                height={"230px"}
                src={url}
                alt="Green double couch with wooden legs"
                borderRadius="lg"
                className="card-image"
              />


              <Text className="px-3 py-2" fontSize="xl">
                {title.substr(0, 30)}...
              </Text>
              <Text fontSize="sm" className="px-3 py-1">
                {description.substr(0, 70)}...
              </Text>
            </CardBody>
            <Divider />
            <CardFooter p={2}>
              <div className="flex justify-content-between w-100 px-3">
                <div className="flex">
                  <ButtonToolbar>
                    <OverlayTrigger
                      trigger={["hover", "focus"]}
                      placement="right"
                      overlay={popoverHoverFocus}
                    >
                      <NavLink
                        to={
                          "/profile/" +
                          (isPublic
                            ? isProfileView
                              ? data.username
                              : username
                            : userDetails && userDetails.username)
                        }
                      >
                        <Avatar
                          size="sm"
                          name="Prosper Otemuyiwa"
                          src={
                            isPublic
                              ? isProfileView
                                ? publicUser && publicUser.profileURL
                                : item.profileURL
                              : userDetails && userDetails.profileURL
                          }
                        />
                      </NavLink>
                    </OverlayTrigger>
                  </ButtonToolbar>
                  <Text className="mx-2">
                    {isPublic
                      ? isProfileView
                        ? publicUser &&
                        publicUser.firstName + " " + publicUser.lastName
                        : item.name
                      : userDetails.firstName + " " + userDetails.lastName}
                    <br /><span className="text-time"><small>{getTimeDifference(item.postId)}</small></span>
                  </Text>
                </div>
                <div className="flex">
                  <div className="like flex mx-2">
                    <button onClick={handleLikePost}>
                      {like ? (
                        <AiFillHeart color="red" size={18} />
                      ) : (
                        <AiOutlineHeart color="red" size={18} />
                      )}
                    </button>
                    <span className="px-1">{like ? likes + 1 : likes}</span>
                  </div>
                  <div className="comment flex mx-2">
                    <FaRegCommentDots color="green" size={18} />
                    <span className="px-1">{0}</span>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </Skeleton>

      </Col>
    </>
  );
};

export default PostCard;
