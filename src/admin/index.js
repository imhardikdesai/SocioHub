import { Box, Button, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import AdminDashboard from './dashboard/AdminDashboard'
import { EmailIcon } from "@chakra-ui/icons";
import AdminEmailModal from './dashboard/AdminEmailModal';

const Admin = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleAdminEmailUpdate = () => {
        onOpen()
    }
    return (
        <>
            <AdminEmailModal onClose={onClose} isOpen={isOpen} />
            <Box display={"flex"} justifyContent={"flex-end"} my={2} spacing={4}>
                <Button onClick={handleAdminEmailUpdate} leftIcon={<EmailIcon />} colorScheme="blue" variant="solid">
                    Update Admin
                </Button>
            </Box>
            <AdminDashboard />
        </>
    )
}

export default Admin