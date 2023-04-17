import { Box, Checkbox, Stack, Text, chakra, Flex } from '@chakra-ui/react'
import React from 'react'

const LocationSetting = ({ values, isGhostMode, handleChange }) => {
    return (
        <>
            <chakra.fieldset>
                <Box
                    as="legend"
                    fontSize="md"
                    color="gray.900"
                    _dark={{
                        color: "gray.50",
                    }}
                >
                    Location
                </Box>
                <Stack mt={4} spacing={4}>
                    <Flex alignItems="start">
                        <Flex alignItems="center" h={5}>
                            <Checkbox
                                defaultChecked={isGhostMode}
                                value={values.isGhostMode}
                                borderColor="brand.700"
                                _dark={{
                                    borderColor: "gray.50",
                                }}
                                id="isGhostMode"
                                rounded="md"
                                onChange={handleChange}
                            />
                        </Flex>
                        <Box ml={3} fontSize="sm">
                            <chakra.label
                                htmlFor="isGhostMode"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                    color: "gray.50",
                                }}
                            >
                                Ghost Mode
                            </chakra.label>
                            <Text
                                color="gray.500"
                                _dark={{
                                    color: "gray.400",
                                }}
                            >
                                Ghost Mode is a privacy feature that hides your location on a map, ensuring your movements remain private.
                            </Text>
                        </Box>
                    </Flex>
                </Stack>
            </chakra.fieldset>

        </>
    )
}

export default LocationSetting