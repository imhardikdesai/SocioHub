import React from "react";
import {
  Box,
  SimpleGrid,
  Button,
  Flex,
  Text,
  Heading,
  Checkbox,
  Stack,
  chakra,
  GridItem,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
const SettingProfile = () => {
  const initialValues = {
    emailShow: false,
  };
  const handleSaveSetting = (values) => {
    console.log(values);
  };
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: handleSaveSetting,
  });
  return (
    <>
      <Box mt={[10, 0]}>
        <Form onSubmit={handleSubmit}>
          <SimpleGrid
            display={{
              base: "initial",
              md: "grid",
            }}
            columns={{
              md: 3,
            }}
            spacing={{
              md: 6,
            }}
          >
            <GridItem
              colSpan={{
                md: 1,
              }}
            >
              <Box px={[4, 0]}>
                <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
                  Privacy & Security
                </Heading>
                <Text
                  mt={1}
                  fontSize="sm"
                  color="gray.600"
                  _dark={{
                    color: "gray.400",
                  }}
                >
                  Decide whether users can see your email or not.
                </Text>
              </Box>
            </GridItem>
            <GridItem
              mt={[5, null, 0]}
              colSpan={{
                md: 2,
              }}
            >
              <Stack
                px={4}
                py={5}
                p={[null, 6]}
                bg="white"
                _dark={{
                  bg: "#141517",
                }}
                spacing={6}
              >
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
                          htmlFor="comments"
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

                {/* Notifications Setting  */}

                {/* <chakra.fieldset>
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
                </chakra.fieldset> */}
              </Stack>
              <Box
                px={{
                  base: 4,
                  sm: 6,
                }}
                py={3}
                bg="gray.50"
                _dark={{
                  bg: "#121212",
                }}
                textAlign="right"
              >
                <Button
                  type="submit"
                  _focus={{
                    shadow: "",
                  }}
                  fontWeight="md"
                >
                  Save
                </Button>
              </Box>
            </GridItem>
          </SimpleGrid>
        </Form>
      </Box>
    </>
  );
};

export default SettingProfile;
