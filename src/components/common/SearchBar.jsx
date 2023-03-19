import { FormControl, Input, InputGroup, InputRightElement, useColorMode } from '@chakra-ui/react'
import { CiSearch } from 'react-icons/ci'
import React from 'react'
import { Button } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'


const SearchBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <div className='d-flex w-100'>
                <FormControl>
                    <InputGroup>
                        <Input type='text' placeholder='Search...' />
                        <InputRightElement>
                            <button onClick={() => console.log('click')}><CiSearch /></button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button className='ms-2' onClick={toggleColorMode}>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
            </div>
        </>
    )
}

export default SearchBar
