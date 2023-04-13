import { Box, Button, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import AdminDashboard from './dashboard/AdminDashboard'
import { EmailIcon } from "@chakra-ui/icons";
import AdminEmailModal from './dashboard/AdminEmailModal';
import { GetAllUserList } from '../utility/utils';
import { useSelector } from 'react-redux';

const Admin = () => {
    const [people, setPeople] = useState([]);
    const status = useSelector((state) => state.auth.status);
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
        GetAllUserList().then((user) => setPeople(Object.values(user)));
    }, [status]);
    return (
        <>
            <AdminEmailModal onClose={onClose} isOpen={isOpen} />
            <Box display={"flex"} justifyContent={"flex-end"} my={2} spacing={4}>
                <Button onClick={onOpen} leftIcon={<EmailIcon />} colorScheme="blue" variant="solid">
                    Update Admin
                </Button>
            </Box>
            <AdminDashboard people={people} />
        </>
    )
}

export default Admin