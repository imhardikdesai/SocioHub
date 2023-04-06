import React from "react";
import { MutatingDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <>
      <div id="loader-area">
        <MutatingDots
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="13"
          ariaLabel="mutating-dots-loading"
          visible={true}
        />
      </div>
    </>
  );
};

export default Loader;
