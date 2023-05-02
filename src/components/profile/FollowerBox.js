import React from 'react'
import { Box, Button, Stack, Text, useDisclosure } from '@chakra-ui/react'
import PeoplePreview from './PeoplePreview';
import { useState } from 'react';
import { useEffect } from 'react';

const FollowerBox = ({ followData, testimonials, isPublic }) => {
    const [follower, setFollowers] = useState(null)
    const [following, setFollowing] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [type, setType] = useState('')
    const handlePeopleClicked = (action) => {
        setType(action)
        onOpen()
    }
    useEffect(() => {
        if (!testimonials) return
        if (testimonials.followers) {
            setFollowers(Object.values(testimonials.followers))
        }
        if (testimonials.following) {
            setFollowing(Object.values(testimonials.following))
        }
    }, [testimonials, isPublic])
    return (
        <>
            <PeoplePreview
                testimonials={type === 'Followers' ? follower : following}
                type={type}
                isOpen={isOpen}
                onClose={onClose}
            />
            <Box px={6} py={4}>
                <Stack direction={"row"} justify={"center"} spacing={6}>
                    <Stack spacing={0} align={"center"}>
                        <Button variant={'unstyled'} onClick={() => handlePeopleClicked('Followers')}>
                            <Text fontSize={"2xl"} fontWeight={600}>
                                {followData ? followData.followers : 'loading...'}
                            </Text>
                        </Button>
                        <Text fontSize={"sm"} color={"gray.500"}>
                            Followers
                        </Text>
                    </Stack>
                    <Stack spacing={0} align={"center"}>
                        <Button variant={'unstyled'} onClick={() => handlePeopleClicked('Following')}>
                            <Text fontSize={"2xl"} fontWeight={600}>
                                {followData ? followData.following : 'loading...'}
                            </Text>
                        </Button>
                        <Text fontSize={"sm"} color={"gray.500"}>
                            Following
                        </Text>
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}

export default FollowerBox
