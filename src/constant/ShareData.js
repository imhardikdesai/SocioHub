import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import {
    RiFacebookFill,
    RiLinkedinFill,
    RiMailFill,
    RiTelegramFill,
    RiTwitterFill,
    RiWhatsappFill,
} from "react-icons/ri";

const ShareData = [
    {
        handle: "WhatsApp",
        ShareComponent: WhatsappShareButton,
        bg: "#25D366",
        color: "blackAlpha.900",
        icon: <RiWhatsappFill size={20} />,
    },
    {
        handle: "Email",
        ShareComponent: EmailShareButton,
        bg: "#EA4335",
        color: "white",
        icon: <RiMailFill size={20} />,
    },
    {
        handle: "Facebook",
        ShareComponent: FacebookShareButton,
        bg: "#1877F2",
        color: "white",
        icon: <RiFacebookFill size={20} />,
    },
    {
        handle: "LinkedIn",
        ShareComponent: LinkedinShareButton,
        bg: "#0E76A8",
        color: "white",
        icon: <RiLinkedinFill size={20} />,
    },
    {
        handle: "Telegram",
        ShareComponent: TelegramShareButton,
        bg: "#0088cc",
        color: "white",
        icon: <RiTelegramFill size={20} />,
    },
    {
        handle: "Twitter",
        ShareComponent: TwitterShareButton,
        bg: "#1DA1F2",
        color: "white",
        icon: <RiTwitterFill size={20} />,
    },
];

export default ShareData