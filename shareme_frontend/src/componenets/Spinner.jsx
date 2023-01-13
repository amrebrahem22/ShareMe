import React from "react";
import {CirclesWithBar} from "react-loader-spinner";

const Spinner = ({ message}) => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <CirclesWithBar
        height="150"
        width="150"
        color="#ef4444"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel="circles-with-bar-loading"
      />
      <p className="text-lg text-center px-2 mt-6 text-gray-600">{message}</p>
    </div>
  );
};

export default Spinner;
