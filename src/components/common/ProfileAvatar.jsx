import { Avatar, Box, Heading, keyframes } from '@chakra-ui/react';

export default function ProfileAvatar() {
    const size = '50px';
    const color = 'teal';

    const pulseRing = keyframes`
	0% {
    transform: scale(0.33);
  }
  40%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
	`;

    return (
        <div className="header-profile d-flex mx-5 w-50 align-items-center justify-content-evenly">
            <Heading size='md'>Hi, Michael</Heading>
            <Box
                as="div"
                position="relative"
                w={size}
                h={size}
                _before={{
                    content: "''",
                    position: 'relative',
                    display: 'block',
                    width: '300%',
                    height: '300%',
                    boxSizing: 'border-box',
                    marginLeft: '-100%',
                    marginTop: '-100%',
                    borderRadius: '50%',
                    bgColor: color,
                    animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
                }}>
                <Avatar
                    src="https://i.pravatar.cc/300"
                    size="full"
                    position="absolute"
                    top={0}
                />
            </Box>
        </div>
    );
}