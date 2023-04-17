import React, { useContext, useState } from "react";
import {
  Box,
  SimpleGrid,
  Button,
  Stack,
  GridItem,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { UpdateSetting } from "../../utility/utils";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import EmailSetting from "./EmailSetting";
import LocationSetting from "./LocationSetting";
const SettingProfile = () => {
  const { currentUser, userDetails } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [isShowEmail] = useState(userDetails && userDetails.settings.emailShow);
  const [isGhostMode] = useState(userDetails && userDetails.settings.isGhostMode);
  const initialValues = {
    emailShow: isShowEmail ? isShowEmail : false,
    isGhostMode: false
  };
  const handleSaveSetting = (values) => {
    UpdateSetting(values, currentUser, dispatch).then(() => {
      toast.success("Settings saved successfully!");
    });
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
              md: 2,
            }}
            spacing={{
              md: 6,
            }}
          >
            <GridItem
              mt={[5, null, 0]}
              colSpan={{
                md: 2,
              }}
            >
              {/* All Setting Stack  */}
              <Stack
                px={4}
                py={5}
                p={[null, 6]}
                bg="white"
                _dark={{
                  bg: "#141517",
                }}
                backgroundColor="#f7fafc"
                spacing={6}
              >
                {/* Email Visibility  */}
                <EmailSetting values={values} handleChange={handleChange} isShowEmail={isShowEmail} />

                {/* Location Ghost  Mode */}
                <LocationSetting values={values} handleChange={handleChange} isGhostMode={isGhostMode} />

              </Stack>

              {/* Save Button  */}
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
