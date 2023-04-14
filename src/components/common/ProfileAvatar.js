import { useContext } from 'react';
import { Avatar, AvatarBadge, Box, Heading } from '@chakra-ui/react';
import { AuthContext } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';

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
                <NavLink to='/profile'>
                    <Avatar
                        src={userDetails ? userDetails.profileURL :"https://www.clipartmax.com/png/middle/171-1717870_stockvader-predicted-cron-for-may-user-profile-icon-png.png"}
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
                </NavLink>
            </Box>
        </div>
    );
}