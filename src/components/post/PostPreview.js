import { Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

const PostPreview = ({ onClose, isOpen, item }) => {
    const { title, description, url } = item;
    return (
        <>
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalBody>
                        <Image
                            objectFit={"contain"}
                            width={"100%"}
                            src={url}
                            alt="Green double couch with wooden legs"
                            borderRadius="lg"
                            className="card-image"
                        />
                    </ModalBody>
                    <ModalFooter justifyContent='start'>
                        {description}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PostPreview
