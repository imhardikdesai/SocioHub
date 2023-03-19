import React from 'react';
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorMode,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import {
    FiHome,
    FiCompass,
    FiSettings,
    FiMenu,
} from 'react-icons/fi';
import {
    AiOutlineHeart
} from 'react-icons/ai';
import {
    FaRegUserCircle
} from 'react-icons/fa';
import logo from '../../assets/img/Logo.png'
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const LinkItems = [
    { name: 'Home', icon: FiHome },
    { name: 'Profile', icon: FaRegUserCircle },
    { name: 'Explore', icon: FiCompass },
    { name: 'Activity', icon: AiOutlineHeart },
    { name: 'Settings', icon: FiSettings },
];

export default function SideBar({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box className='sidebar-box' minH="100vh" width={'239px'} bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}



const SidebarContent = ({ onClose, ...rest }) => {
    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <div className='d-flex align-items-center justify-content-md-evenly w-100 justify-content-sm-start'>
                    <Text className='me-2' fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                        SocioHub
                    </Text>
                    <img className='logo' src={logo} alt="LOGO" />
                </div>

                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

const NavItem = ({ icon, children, ...rest }) => {
    return (
        <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};


const MobileNav = ({ onOpen, ...rest }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Flex
                ml={{ base: 0, md: 60 }}
                px={{ base: 4, md: 24 }}
                height="20"
                alignItems="center"
                bg={useColorModeValue('white', 'gray.900')}
                borderBottomWidth="1px"
                borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
                justifyContent="flex-start"
                {...rest}>
                <IconButton
                    variant="outline"
                    onClick={onOpen}
                    aria-label="open menu"
                    icon={<FiMenu />}
                />

                <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
                    SocioHub
                </Text>
                <Button className='ms-auto' onClick={toggleColorMode}>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
            </Flex>
        </>
    );
};