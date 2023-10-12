import { Box, Checkbox, Stack, Text, chakra, Flex } from '@chakra-ui/react'
import React from 'react'

const EmailSetting = ({ values, isShowEmail, handleChange }) => {
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
                    Privacy
                </Box>
                <Stack mt={4} spacing={4}>
                    <Flex alignItems="start">
                        <Flex alignItems="center" h={5}>
                            <Checkbox
                                defaultChecked={isShowEmail}
                                value={values.emailShow}
                                borderColor="brand.700"
                                _dark={{
                                    borderColor: "gray.50",
                                }}
                                id="emailShow"
                                rounded="md"
                                onChange={handleChange}                                
                            />
                        </Flex>
                        <Box ml={3} fontSize="sm">
                            <chakra.label
                                htmlFor="emailShow"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                    color: "gray.50",
                                }}
                            >
                                Email Visiblity
                            </chakra.label>
                            <Text
                                color="gray.500"
                                _dark={{
                                    color: "gray.400",
                                }}
                            >
                                Email Visibility is a setting that lets you choose
                                whether or not to make your email address visible on
                                your profile.
                            </Text>
                        </Box>
                    </Flex>
                </Stack>
            </chakra.fieldset>
        </>
    )
}

export default EmailSetting