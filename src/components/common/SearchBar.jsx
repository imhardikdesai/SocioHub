import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

const SearchBar = () => {
    return (
        <>
            <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type='email' />
            </FormControl>
        </>
    )
}

export default SearchBar
