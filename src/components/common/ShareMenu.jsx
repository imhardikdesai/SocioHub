import React, { useContext } from "react";
import { BASE_URL } from "../../constant/URL";
import { AuthContext } from "../../context/AuthContext";
import { HiShare } from "react-icons/hi";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import ShareData from "../../constant/ShareData";

const ShareMenu = () => {
  const { userDetails } = useContext(AuthContext);

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          isDisabled={!userDetails}
          width="150px"
          height="27px"
          bg={"red.400"}
          color={"white"}
          _hover={{
            bg: "red.500",
          }}
        >
          Share Profile <HiShare color="#fff" size={18} className="d-inline" />
        </MenuButton>
        <MenuList display={"flex"} flexDirection="column" gap="5px">
          {ShareData.map((item) => {
            const { ShareComponent, handle, icon, bg, color } = item;
            return (
              <ShareComponent
                url={BASE_URL + "/" + (userDetails && userDetails.username)}
              >
                <MenuItem
                  bg={bg}
                  color={color}
                  icon={icon}
                  as="p"
                  className="rounded-pill"
                >
                  {handle}
                </MenuItem>
              </ShareComponent>
            );
          })}
        </MenuList>
      </Menu>
    </>
  );
};

export default ShareMenu;
