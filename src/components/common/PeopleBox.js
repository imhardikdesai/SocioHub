import {
    Avatar,
    chakra,
    Flex,
    SimpleGrid,
    useColorModeValue,
} from '@chakra-ui/react';


function TestimonialCard({ name, profileURL, username }) {
    return (
        <Flex
            boxShadow={'lg'}
            maxW={'640px'}
            direction={{ md: 'row' }}
            width={'full'}
            rounded={'xl'}
            p={5}
            alignItems='center'
            justifyContent={'space-between'}
            position={'relative'}
            bg={useColorModeValue('white', 'gray.800')}
        >
            <Flex
                direction={'column'}
                textAlign={'left'}
                justifyContent={'space-between'}>
                {/* <chakra.p
                    fontFamily={'Inter'}
                    fontWeight={'medium'}
                    fontSize={'15px'}
                    pb={4}>
                    {content}
                </chakra.p> */}
                <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
                    {name}
                    <br />
                    <chakra.span
                        display='inline-block'
                        maxWidth='156px'
                        fontFamily={'Inter'}
                        fontWeight={'medium'}
                        color={'gray.500'}>
                        {' '}
                        @{username}
                    </chakra.span>
                </chakra.p>
            </Flex>
            <Avatar
                src={profileURL}
                height={'60px'}
                width={'60px'}
                alignSelf={'center'}
            />
        </Flex>
    );
}

export default function PeopleBox({ testimonials }) {
    return (
        <Flex
            textAlign={'center'}
            justifyContent={'center'}
            direction={'column'}
            width={'full'}>

            <SimpleGrid
                maxH='400px'
                overflowX='auto'
                width='100%'
                mb='1.3rem'
                px='1rem'
                columns={{ base: 1 }}
                spacing={'6'}
                mx={'auto'}>
                {testimonials ? testimonials.map((cardInfo, index) => (
                    <TestimonialCard key={cardInfo.uid} {...cardInfo} index={index} />
                ))
                    : "Nothing to Show 🥺"
                }
            </SimpleGrid>
        </Flex>
    );
}