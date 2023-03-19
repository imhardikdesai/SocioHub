import { Heading } from '@chakra-ui/react'
import React from 'react'
import PostCard from './PostCard'

const PostGallery = () => {
    return (
        <>
            <nav>
                <Heading as='h2'>Recent Post</Heading>
            </nav>
            <div className="container-fluid mt-4">
                <div className='row'>
                    <PostCard />
                </div>
            </div>
        </>
    )
}

export default PostGallery
