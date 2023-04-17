import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode, Avatar, Button, Flex, Text } from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { GetAllUserList } from "../../utility/utils";

const SearchBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [people, setPeople] = useState(null);
  const handleBtnClick = () => {
    toggleColorMode();
    const msg =
      colorMode === "light" ? "Light mode Activated" : "Dark mode Activated";
    const icon = colorMode === "light" ? "🌞" : "🌚";
    const style =
      colorMode === "light"
        ? {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        }
        : {
          borderRadius: "10px",
          background: "#fff",
          color: "#333",
        };

    toast(msg, {
      icon: icon,
      style: style,
      duration: 1000,
    });
  };
  useEffect(() => {
    GetAllUserList().then((item) => setPeople(item));
  }, []);
  return (
    <>
      <Flex
        className="d-flex w-100"
        boxSize="full"
        p={30}
        justifyContent="center"
      >
        <AutoComplete rollNavigation>
          <AutoCompleteInput placeholder="Search..." />
          <AutoCompleteList>
            {people &&
              Object.values(people).map((person, index) => {
                const name = person.firstName + " " + person.lastName
                return (
                  <Link key={index} to={`/profile/${person.username}`}>
                    <AutoCompleteItem
                      key={`option-${index}`}
                      value={name}
                      textTransform="capitalize"
                      align="center"
                    >
                      <Avatar
                        size="sm"
                        name={person.username}
                        src={person.profileURL}
                      />
                      <Text ml="4">
                        {name}
                      </Text>
                    </AutoCompleteItem>
                  </Link>
                );
              })}
          </AutoCompleteList>
        </AutoComplete>

        <Button id="dark-btn" className="ms-2" onClick={handleBtnClick}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
    </>
  );
};

export default SearchBar;
