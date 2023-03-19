import { Heading } from '@chakra-ui/react'
import React from 'react'
import DummyPostData from '../../constant/DummyPostData'
import PostCard from './PostCard'

const PostGallery = () => {
    return (
        <>
            <nav>
                <Heading as='h2'>Recent Post</Heading>
            </nav>
            <div className="container-fluid mt-4">
                <div className='row'>
                    {
                        DummyPostData && DummyPostData.map(item => {
                            return <PostCard key={item.id} item={item}/>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default PostGallery
