import React, { useContext, useState } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorMode,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { FiHome, FiCompass, FiSettings, FiMenu } from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import logo from "../../assets/img/Logo.png";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { showRelevantErrorMessage } from "../../utility/utils";
import Loader from "./Loader";

const LinkItems = [
  { name: "Home", icon: FiHome, path: "/posts" },
  { name: "Profile", icon: FaRegUserCircle, path: "/profile" },
  { name: "Explore", icon: FiCompass, path: "/explore" },
  { name: "Activity", icon: AiOutlineHeart, path: "/activity" },
  { name: "Setting", icon: FiSettings, path: "/setting" },
];

export default function SideBar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      className="sidebar-box"
      minH="100vh"
      width={"239px"}
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const { userDetails, setCurrentUser, setUserDetails } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      setCurrentUser(null);
      setUserDetails(null);
      toast.success("Successfully Logged out");
      navigate("/login");
      setLoading(false);
    } catch (error) {
      showRelevantErrorMessage(error);
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loader />}
      <Box
        bg={useColorModeValue("white", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <div className="d-flex align-items-center justify-content-md-evenly w-100 justify-content-sm-start">
            <Text
              className="me-2"
              fontSize="2xl"
              fontFamily="monospace"
              fontWeight="bold"
            >
              SocioHub
            </Text>
            <img className="logo" src={logo} alt="LOGO" />
          </div>

          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem path={link.path} key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        ))}

        {userDetails && userDetails.isAdmin && (
          <NavItem
            path={"/admin"}
            key={"admin"}
            icon={MdOutlineAdminPanelSettings}
          >
            Admin
          </NavItem>
        )}
        <Button
          id="logout"
          onClick={handleLogOut}
          width="90%"
          position={"absolute"}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
          left="5%"
        >
          Logout
        </Button>
      </Box>
    </>
  );
};

const NavItem = ({ path, icon, children, ...rest }) => {
  return (
    <NavLink
      to={path}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </NavLink>
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
        bg={useColorModeValue("white", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent="flex-start"
        {...rest}
      >
        <IconButton
          variant="outline"
          onClick={onOpen}
          aria-label="open menu"
          icon={<FiMenu />}
        />

        <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
          SocioHub
        </Text>
        <Button className="ms-auto" onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
    </>
  );
};
