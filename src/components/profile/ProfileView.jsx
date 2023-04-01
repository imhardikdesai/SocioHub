import {
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    chakra,
    Icon,
    useColorModeValue,
} from '@chakra-ui/react';
import { MdEmail, MdLocationOn } from 'react-icons/md'
import { BsFillBriefcaseFill } from 'react-icons/bs'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function ProfileView() {
    const { userDetails } = useContext(AuthContext)
    return (
        <Center py={6}>
            <Box
                maxW={'400px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>
                <Image
                    h={'120px'}
                    w={'full'}
                    // src={
                    //     'https://source.unsplash.com/420x120/'
                    // }
                    src={
                        userDetails ? userDetails.coverURL : 'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                    }
                    objectFit={'cover'}
                />
                <Flex justify={'center'} mt={-12}>
                    <Avatar
                        size={'xl'}
                        src={
                            userDetails ? userDetails.profileURL : 'https://i.pinimg.com/originals/4a/88/7e/4a887e68509737452a38ba244079b8a0.jpg'
                            // 'https://i.pravatar.cc/300'
                        }
                        alt={'Author'}
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>
                <Box px={6} py={4}>
                    <Stack direction={'row'} justify={'center'} spacing={6}>
                        <Stack spacing={0} align={'center'}>
                            <Text fontSize={'2xl'} fontWeight={600}>569</Text>
                            <Text fontSize={'sm'} color={'gray.500'}>
                                Followers
                            </Text>
                        </Stack>
                        <Stack spacing={0} align={'center'}>
                            <Text fontSize={'2xl'} fontWeight={600}>744</Text>
                            <Text fontSize={'sm'} color={'gray.500'}>
                                Following
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
                <Box mt={2} py={4} px={6}>
                    <chakra.h1
                        fontSize="xl"
                        fontWeight="bold"
                        color="gray.800"
                        _dark={{
                            color: "white",
                        }}
                    >
                        {userDetails ? userDetails.firstName + ' ' + userDetails.lastName : "loading..."}
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
                            {userDetails ? userDetails.occupation : 'loading...'}
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
                            {userDetails ? userDetails.city + ', ' + userDetails.state + ', ' + userDetails.country : "Loading..."}
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
                        <Icon as={MdEmail} h={6} w={6} mr={2} />

                        <chakra.h1 px={2} fontSize="sm">
                            {userDetails ? userDetails.email : 'loading...'}
                        </chakra.h1>
                    </Flex>
                </Box>
            </Box>
        </Center>
    );
}