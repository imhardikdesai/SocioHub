import { useContext } from 'react';
import { Avatar, AvatarBadge, Box, Heading } from '@chakra-ui/react';
import { AuthContext } from '../../context/AuthContext';

export default function ProfileAvatar() {
    const { userDetails } = useContext(AuthContext)
    const size = '50px';




    return (
        <div className="header-profile d-flex mx-5 w-50 align-items-center justify-content-evenly">
            <Heading size='md'>{userDetails ? 'Hii, ' + userDetails.firstName + ' ' + userDetails.lastName : "loading..."}</Heading>
            <Box
                as="div"
                position="relative"
                w={size}
                h={size}
            >
                <Avatar
                    src="https://i.pravatar.cc/300"
                    size="full"
                    position="absolute"
                    top={0}
                >
                    <AvatarBadge
                        className='avatar-badge'
                        boxSize='1.25em'
                        bg='green.500'
                    />
                </Avatar>
            </Box>
        </div>
    );
}