import React from 'react'
import { Avatar, Heading } from '@chakra-ui/react'


const ProfileAvatar = () => {
    return (
        <>
            <div className="header-profile d-flex mx-5 w-50 align-items-center justify-content-evenly">
                <Heading size='md'>Hi, Michael</Heading>
                <Avatar name='Micheal' src='https://bit.ly/kent-c-dodds' />
            </div>
        </>
    )
}

export default ProfileAvatar
