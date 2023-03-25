import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useColorMode, Avatar, Button, Flex, Text } from '@chakra-ui/react';
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from '@choc-ui/chakra-autocomplete';
import React from 'react'
import { toast } from 'react-hot-toast';

const SearchBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    const people = [
        {
            name: "Dan Abramov",
            image: "https://bit.ly/dan-abramov",
        },
        {
            name: "Kent Dodds",
            image: "https://bit.ly/kent-c-dodds",
        },
        {
            name: "Segun Adebayo",
            image: "https://bit.ly/sage-adebayo",
        },
        {
            name: "Prosper Otemuyiwa",
            image: "https://bit.ly/prosper-baba",
        },
        {
            name: "Ryan Florence",
            image: "https://bit.ly/ryan-florence",
        },
    ];
    const handleBtnClick = () => {
        toggleColorMode()
        const msg = colorMode === 'light' ? "Light mode Activated" : "Dark mode Activated"
        const icon = colorMode === 'light' ? "🌞" : "🌚"
        const style = colorMode === 'light' ? {
            borderRadius: "10px",
            background: "#333",
            color: "#fff"
        } : {
            borderRadius: "10px",   
            background: "#fff",
            color: "#333",
        }

        toast(msg, {
            icon: icon,
            style: style,
            duration: 1000,
        });
    }
    return (
        <>
            <Flex
                className='d-flex w-100'
                boxSize="full"
                p={30}
                justifyContent="center"
            >
                <AutoComplete rollNavigation>
                    <AutoCompleteInput placeholder="Search..." />
                    <AutoCompleteList>
                        {people.map((person, oid) => (
                            <AutoCompleteItem
                                key={`option-${oid}`}
                                value={person.name}
                                textTransform="capitalize"
                                align="center"
                            >
                                <Avatar size="sm" name={person.name} src={person.image} />
                                <Text ml="4">{person.name}</Text>
                            </AutoCompleteItem>
                        ))}
                    </AutoCompleteList>
                </AutoComplete>

                <Button id='dark-btn' className='ms-2' onClick={handleBtnClick}>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
            </Flex>
        </>
    )
}

export default SearchBar

