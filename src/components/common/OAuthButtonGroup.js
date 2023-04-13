import { Button, ButtonGroup, VisuallyHidden } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";
// import { handleGoogleSignIn } from "../../utility/utils";

const providers = [
  { name: "Google", icon: <FcGoogle size="20" /> },
  { name: "GitHub", icon: <FaFacebook size="20" /> },
  { name: "Facebook", icon: <FaGithub size="20" /> },
];

export const OAuthButtonGroup = () => (
  <ButtonGroup variant="outline" spacing="4" width="full">
    {providers.map(({ name, icon }) => (
      <Button key={name} width="full">
        <VisuallyHidden>Sign in with {name}</VisuallyHidden>
        {icon}
      </Button>
    ))}
  </ButtonGroup>
);
