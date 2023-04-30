import React from 'react'
import { Modal, ModalOverlay, ModalBody, ModalCloseButton, ModalContent, ModalHeader } from '@chakra-ui/react'
import PeopleBox from '../common/PeopleBox'

const PeoplePreview = ({ isOpen, onClose, type, testimonials }) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{type}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <PeopleBox testimonials={testimonials} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PeoplePreview
