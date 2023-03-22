// import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react'
// import React from 'react'
// import { FaEnvelope, FaMapPin, FaSuitcase } from 'react-icons/fa'

// const ProfileView = () => {
//     return (
//         <>
//             <Flex
//                 p={50}
//                 w="full"
//                 alignItems="center"
//                 justifyContent="center"
//             >
//                 <Flex
//                     shadow="lg"
//                     rounded="lg"
//                     bg="#edf3f8"
//                     _dark={{
//                         bg: "gray.800",
//                         boxShadow: "0px 0px 6px #969695, 0px 0px 0px #ffffff"
//                     }}
//                     mb={8}
//                     direction="column"
//                     alignItems="center"
//                     justifyContent="center"
//                 >
//                     <Box
//                         bg="#edf3f8"
//                         _dark={{
//                             bg: "#3e3e3e",
//                         }}
//                         style={{
//                             backgroundImage:
//                                 "url(https://images.unsplash.com/photo-1666795599746-0f62dfa29a07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)",
//                             backgroundSize: "cover",
//                             backgroundPosition: "center",
//                             backgroundRepeat: "no-repeat",
//                         }}
//                         height="100%"
//                         width="100%"
//                         borderRadius="lg"
//                         p={8}
//                         display="flex"
//                         alignItems="left"
//                     >
//                         <Image
//                             src="https://bit.ly/kent-c-dodds"
//                             alt="Profile Picture"
//                             borderRadius="full"
//                             boxSize="150px"
//                             shadow="lg"
//                             border="5px solid"
//                             mb={-20}
//                             borderColor="gray.800"
//                             _dark={{
//                                 borderColor: "gray.200",
//                             }}
//                         />
//                     </Box>
//                     <Box
//                         gridColumn="span 8"
//                         p={8}
//                         width="full"
//                         height="full"
//                         borderRadius="lg"
//                         textAlign="left"
//                         mt={10}
//                     >
//                         <Text
//                             fontSize="4xl"
//                             fontWeight="bold"
//                             color="gray.800"
//                             _dark={{
//                                 color: "white",
//                             }}
//                         >
//                             Michael Buehner
//                         </Text>
//                         <HStack
//                             spacing={3}
//                             color="gray.800"
//                             _dark={{
//                                 color: "gray.200",
//                             }}
//                         >
//                             <FaSuitcase size={24} />
//                             <Text
//                                 fontSize="2xl"
//                                 fontWeight="bold"
//                                 color="gray.800"
//                                 _dark={{
//                                     color: "gray.200",
//                                 }}
//                             >
//                                 Photographer
//                             </Text>
//                         </HStack>
//                         <HStack
//                             spacing={3}
//                             color="gray.700"
//                             _dark={{
//                                 color: "gray.200",
//                             }}
//                         >
//                             <FaMapPin size={20} />
//                             <Text fontSize="lg">Germany</Text>
//                         </HStack>
//                         <HStack
//                             spacing={3}
//                             color="gray.700"
//                             _dark={{
//                                 color: "gray.200",
//                             }}
//                         >
//                             <FaEnvelope size={20} />
//                             <Text fontSize="lg">chris@buehner.com</Text>
//                         </HStack>
//                     </Box>
//                 </Flex>
//             </Flex>;

//         </>
//     )
// }

// export default ProfileView


import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function ProfileView() {
    const [isFollow, setIsFollow] = useState(false)
    const handleFollow = () => {
        setIsFollow(prev => !prev)
    }
    return (
        <Center py={6}>
            <Box
                maxW={'270px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>
                <Image
                    h={'120px'}
                    w={'full'}
                    src={
                        'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                    }
                    objectFit={'cover'}
                />
                <Flex justify={'center'} mt={-12}>
                    <Avatar
                        size={'xl'}
                        src={
                            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                        }
                        alt={'Author'}
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>

                <Box p={6}>
                    <Stack spacing={0} align={'center'} mb={5}>
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            John Doe
                        </Heading>
                        <Text color={'gray.500'}>Frontend Developer</Text>
                    </Stack>

                    <Stack direction={'row'} justify={'center'} spacing={6}>
                        <Stack spacing={0} align={'center'}>
                            <Text fontWeight={600}>569</Text>
                            <Text fontSize={'sm'} color={'gray.500'}>
                                Followers
                            </Text>
                        </Stack>
                        <Stack spacing={0} align={'center'}>
                            <Text fontWeight={600}>744</Text>
                            <Text fontSize={'sm'} color={'gray.500'}>
                                Following
                            </Text>
                        </Stack>
                    </Stack>

                    <Button
                        onClick={handleFollow}
                        w={'full'}
                        mt={8}
                        bg={useColorModeValue('#151f21', 'gray.900')}
                        color={'white'}
                        rounded={'md'}
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                        }}>
                        {isFollow ? "Following" : "Follow"}
                    </Button>
                </Box>
            </Box>
        </Center>
    );
}