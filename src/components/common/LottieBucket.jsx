import { useLottie } from "lottie-react";

const LottieBucket = ({ path }) => {
  const options = {
    animationData: path,
    loop: true,
  };

  const { View } = useLottie(options);
  return View;
};

export default LottieBucket;
