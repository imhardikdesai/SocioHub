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
                    src="https://firebasestorage.googleapis.com/v0/b/socio-hub-1d1d1.appspot.com/o/IMG_1392%20(2).JPG?alt=media&token=a22b376c-8edc-42b9-ab1e-d61b6ee5fb6f"
                    // src="https://i.pravatar.cc/300"
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