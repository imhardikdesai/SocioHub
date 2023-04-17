import { Box, Radio, RadioGroup, Stack, chakra, Text } from '@chakra-ui/react'
import React from 'react'

const NotificationSetting = () => {
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
          Push Notifications
          <Text
            fontSize="sm"
            color="gray.500"
            _dark={{
              color: "gray.400",
            }}
          >
            These are delivered via SMS to your mobile phone.
          </Text>
        </Box>
        <RadioGroup
          fontSize="sm"
          color="gray.700"
          _dark={{
            color: "gray.50",
            borderColor: "gray.50",
          }}
          mt={4}
          defaultValue="1"
          borderColor="brand.700"
        >
          <Stack spacing={4}>
            <Radio spacing={3} value="1">
              Everything
            </Radio>
            <Radio spacing={3} value="2">
              Same as email
            </Radio>
            <Radio spacing={3} value="3">
              No push notifications
            </Radio>
          </Stack>
        </RadioGroup>
      </chakra.fieldset>
    </>
  )
}

export default NotificationSetting