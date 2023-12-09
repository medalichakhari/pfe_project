import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <FaSpinner className="animate-spin text-4xl text-primary" />
    </div>
  );
};

export default LoadingSpinner;
