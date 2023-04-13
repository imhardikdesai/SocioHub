import { FormControl, FormErrorMessage, FormLabel, GridItem, Heading, Input, Select } from "@chakra-ui/react";
import CountryData from "../../../constant/CountryData";


// Personal Residence Details
const Form2 = (props) => {
    const { values, handleChange, handleBlur, errors, touched } = props.action;
    return (
        <>
            <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
                User Details
            </Heading>

            {/* Country  */}
            <FormControl
                as={GridItem}
                colSpan={[6, 3]}
                isInvalid={errors.country && touched.country}
            >
                <FormLabel
                    htmlFor="country"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: "gray.50",
                    }}
                >
                    Country / Region
                </FormLabel>

                <Select
                    onChange={handleChange}
                    id="country"
                    name="country"
                    autoComplete="country"
                    placeholder="Select option"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    value={values.country}
                    size="sm"
                    w="full"
                    rounded="md"
                >
                    {CountryData.map((country) => {
                        return <option key={country.code}>{country.name}</option>;
                    })}
                </Select>
                {touched.country && (
                    <FormErrorMessage>{errors.country}</FormErrorMessage>
                )}
            </FormControl>

            {/* City  */}
            <FormControl
                as={GridItem}
                colSpan={[6, 6, null, 2]}
                isInvalid={errors.city && touched.city}
            >
                <FormLabel
                    htmlFor="city"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: "gray.50",
                    }}
                    mt="2%"
                >
                    City
                </FormLabel>
                <Input
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="city"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                />
                {touched.city && <FormErrorMessage>{errors.city}</FormErrorMessage>}
            </FormControl>

            {/* State  */}
            <FormControl
                as={GridItem}
                colSpan={[6, 3, null, 2]}
                isInvalid={errors.state && touched.state}
            >
                <FormLabel
                    htmlFor="state"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: "gray.50",
                    }}
                    mt="2%"
                >
                    State / Province
                </FormLabel>
                <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    name="state"
                    value={values.state}
                    id="state"
                    autoComplete="state"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                />
                {touched.state && <FormErrorMessage>{errors.state}</FormErrorMessage>}
            </FormControl>
        </>
    );
};

export default Form2