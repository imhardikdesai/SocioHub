import { FormControl, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { CiSearch } from 'react-icons/ci'
import React from 'react'


const SearchBar = () => {
    return (
        <>
            <FormControl>
                <InputGroup>
                    <Input type='text' placeholder='Search...' />
                    <InputRightElement>
                        <button onClick={()=>console.log('click')}><CiSearch /></button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
        </>
    )
}

export default SearchBar
