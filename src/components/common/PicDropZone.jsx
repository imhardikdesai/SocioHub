import {
  FormControl,
  Flex,
  Stack,
  Icon,
  chakra,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import React from "react";
import { useDropzone } from "react-dropzone";

const PicDropZone = ({ setFile }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });
  return (
    <>
      <FormControl {...getRootProps({ className: "dropzone" })}>
        <input
          {...getInputProps()}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
        />
        <Flex
          backgroundImage={
            acceptedFiles.length !== 0 && URL.createObjectURL(acceptedFiles[0])
          }
          backgroundSize="cover"
          backgroundPosition={"center center"}
          mt={1}
          justify="center"
          px={6}
          pt={5}
          pb={6}
          borderWidth={2}
          _dark={{
            color: "gray.500",
          }}
          borderStyle="dashed"
          rounded="md"
        >
          <Stack
            spacing={1}
            textAlign="center"
            height={acceptedFiles.length !== 0 && "13rem"}
          >
            {acceptedFiles.length === 0 && (
              <>
                <Icon
                  mx="auto"
                  boxSize={12}
                  color="gray.400"
                  _dark={{
                    color: "gray.500",
                  }}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Icon>
                <Flex
                  fontSize="sm"
                  color="gray.600"
                  _dark={{
                    color: "gray.400",
                  }}
                  alignItems="baseline"
                >
                  <chakra.label
                    htmlFor="file-upload"
                    cursor="pointer"
                    rounded="md"
                    fontSize="md"
                    color="brand.600"
                    _dark={{
                      color: "brand.200",
                    }}
                    pos="relative"
                    _hover={{
                      color: "brand.400",
                      _dark: {
                        color: "brand.300",
                      },
                    }}
                  >
                    <span>Upload a file</span>
                    <VisuallyHidden>
                      <input id="file-upload" name="file-upload" type="file" />
                    </VisuallyHidden>
                  </chakra.label>
                  <Text pl={1}>or drag and drop</Text>
                </Flex>
                <Text
                  fontSize="xs"
                  color="gray.500"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  PNG, JPG, GIF up to 10MB
                </Text>
              </>
            )}
          </Stack>
        </Flex>
      </FormControl>
    </>
  );
};

export default PicDropZone;
