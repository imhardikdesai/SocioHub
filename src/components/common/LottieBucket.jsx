import { useLottie } from "lottie-react";

const LottieBucket = ({ path }) => {
  const options = {
    animationData: path,
    loop: true,
  };

  const { View } = useLottie(options);
  return (
    <>
      <div className="h-animation">{View}</div>
    </>
  );
};

export default LottieBucket;
