import { useEffect, useState, useContext } from "react";
import {
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  chakra,
  Icon,
  Button,
  Divider,
  AvatarBadge,
  Skeleton,
} from "@chakra-ui/react";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import { BsFillBriefcaseFill } from "react-icons/bs";
import ShareMenu from "../common/ShareMenu";
import PostCard from "../../view/post/PostCard";
import { InfinitySpin } from "react-loader-spinner";
import { GetFollowerAndFollowingNumbers, UpdateUserFollower } from "../../utility/community";
import { AuthContext } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { updateChanges } from "../../redux/actions/authActions";
import FollowerBox from "./FollowerBox";
import Account from "../../_mock/account";

export default function ProfileView({
  setisEditProfile,
  userDetails,
  isPublic,
}) {
  const [userData] = useState(Account())
  const [id, setId] = useState(null)
  const [isFollow, setIsFollow] = useState(true);
  const [followData, setFollowData] = useState(null)
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch()
  const status = useSelector(state => state.auth.status)
  const handleFollowButton = () => {  
    setIsFollow((prev) => !prev);
    UpdateUserFollower(currentUser, userDetails, userData).then((() => {
      dispatch(updateChanges())
    }))
  };
  useEffect(() => {
    if (userDetails) {
      if (userDetails.followers) {
        if (Object.keys(userDetails.followers).includes(currentUser.uid)) {
          setIsFollow(false)
        } else {
          setIsFollow(true)
        }
      }
    }
  }, [userDetails, currentUser.uid]);

  useEffect(() => {
    if (!id) return
    GetFollowerAndFollowingNumbers(id).then(res => {
      setFollowData({
        followers: res.followers ? Object.values(res.followers).length : 0,
        following: res.following ? Object.values(res.following).length : 0
      })
    })
  }, [id, status, userDetails])

  useEffect(() => {
    if (isPublic) {
      setId(userDetails.userId)
    } else {
      setId(currentUser.uid)
    }
    // eslint-disable-next-line
  }, [currentUser.uid, isPublic])
  return (
    <>
      <Center py={6}>
        <Box
          maxW={"400px"}
          w={"full"}
          _dark={{ bg: "gray.800" }}
          bg={"white"}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Skeleton isLoaded={userDetails}>
            <Image
              h={"120px"}
              w={"full"}
              src={
                userDetails
                  ? userDetails.coverURL
                  : "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
              }
              objectFit={"cover"}
            />
          </Skeleton>
          <Flex justify={"center"} mt={-12}>
            <Avatar
              size={"xl"}
              src={
                userDetails
                  ? userDetails.profileURL
                  : "https://i.pinimg.com/originals/4a/88/7e/4a887e68509737452a38ba244079b8a0.jpg"
              }
              alt={"Author"}
              css={{
                border: "2px solid white",
              }}
            >
              {
                userDetails && (userDetails.isActive ?
                  <AvatarBadge boxSize='0.8em' bg='green.500' />
                  : <AvatarBadge borderWidth={4} borderColor='papayawhip' bg='tomato' boxSize='0.7em' />)
              }
            </Avatar>
          </Flex>
          {/* Username  */}
          <Box my={2} textAlign={"center"}>
            <Text as={"b"}>
              {userDetails ? "@" + userDetails.username : "loading..."}
            </Text>
          </Box>
          {/* Followers Box  */}
          <FollowerBox isPublic={isPublic} testimonials={userDetails} followData={followData} />
          {/* Edit Profile  */}
          <Flex justifyContent={"space-around"}>
            {!isPublic ? (
              <Button
                isDisabled={!userDetails}
                onClick={() => setisEditProfile((prev) => !prev)}
                width="150px"
                height="27px"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Edit Profile <AiTwotoneEdit size={18} className="ms-1" />
              </Button>
            ) : (
              <Button
                isDisabled={!userDetails}
                // onClick={() => setIsFollow((prev) => !prev)}
                onClick={handleFollowButton}
                width="150px"
                height="27px"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                {isFollow ? "Follow" : "Unfollow"}
              </Button>
            )}
            <ShareMenu />
          </Flex>

          {/* Details Box  */}
          <Box mt={2} py={4} px={6}>
            <chakra.h1
              fontSize="xl"
              fontWeight="bold"
              color="gray.800"
              _dark={{
                color: "white",
              }}
            >
              {userDetails
                ? userDetails.firstName + " " + userDetails.lastName
                : "loading..."}
            </chakra.h1>

            <chakra.p
              py={2}
              color="gray.700"
              _dark={{
                color: "gray.400",
              }}
            >
              {userDetails ? userDetails.bio : "loading..."}
            </chakra.p>

            <Flex
              alignItems="center"
              mt={4}
              color="gray.700"
              _dark={{
                color: "gray.200",
              }}
            >
              <Icon as={BsFillBriefcaseFill} h={6} w={6} mr={2} />

              <chakra.h1 px={2} fontSize="sm">
                {userDetails ? userDetails.occupation : "loading..."}
              </chakra.h1>
            </Flex>

            <Flex
              alignItems="center"
              mt={4}
              color="gray.700"
              _dark={{
                color: "gray.200",
              }}
            >
              <Icon as={MdLocationOn} h={6} w={6} mr={2} />

              <chakra.h1 px={2} fontSize="sm">
                {userDetails
                  ? userDetails.city +
                  ", " +
                  userDetails.state +
                  ", " +
                  userDetails.country
                  : "Loading..."}
              </chakra.h1>
            </Flex>
            {userDetails && userDetails.settings.emailShow && (
              <Flex
                alignItems="center"
                mt={4}
                color="gray.700"
                _dark={{
                  color: "gray.200",
                }}
              >
                <Icon as={MdEmail} h={6} w={6} mr={2} />
                <chakra.h1 px={2} fontSize="sm">
                  {userDetails ? userDetails.email : "loading..."}
                </chakra.h1>
              </Flex>
            )}
          </Box>
        </Box>
      </Center>
      {
        isPublic &&
        <>
          <Divider />
          <div className="container-fluid mt-4">
            <div className="row">
              {
                isPublic &&
                  userDetails ?
                  Object.values(userDetails.posts).reverse().map(item => {
                    return <PostCard isProfileView={true} isPublic={true} key={item.postId} item={item} />
                  })
                  :
                  <InfinitySpin width="200" color="#3182CE" />
              }
              {
                userDetails && Object.values(userDetails.posts).length === 0 && <Text mb={12} textAlign={'center'} fontSize='2xl'>{userDetails.firstName + " Have No Post Yet"}</Text>
              }
            </div>
          </div>
        </>
      }
    </>
  );
}
