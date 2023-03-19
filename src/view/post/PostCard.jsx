import { Card, CardBody, CardFooter, Image, Text, Avatar } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FaRegCommentDots } from 'react-icons/fa'

const PostCard = () => {
    const [like, setLike] = useState(false)
    return (
        <>
            <div className="col">

                <Card maxW='sm'>
                    <CardBody p={2}>
                        <Image
                            src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                            alt='Green double couch with wooden legs'
                            borderRadius='lg'
                        />
                    </CardBody>
                    <CardFooter p={2}>
                        <div className="flex justify-content-between w-100 px-3">
                            <div className='flex'>
                                <Avatar
                                    size='sm'
                                    name='Prosper Otemuyiwa'
                                    src='https://bit.ly/prosper-baba'
                                />
                                <Text className='mx-2'>Edbert Thom</Text>
                            </div>
                            <div className='flex'>
                                <div className="like flex mx-2">
                                    <button onClick={() => setLike(prev => !prev)}>
                                        {
                                            like ? <AiFillHeart color='red' size={18} /> : <AiOutlineHeart color='red' size={18} />
                                        }
                                    </button>
                                    <span className='px-1'>{like ? 513 : 512}</span>
                                </div>
                                <div className="comment flex mx-2">
                                    <FaRegCommentDots color='green' size={18} />
                                    <span className='px-1'>20</span>
                                </div>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>

        </>
    )
}

export default PostCard
