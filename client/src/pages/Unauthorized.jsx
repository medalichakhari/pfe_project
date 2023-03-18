import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Unauthorized</h1>
      <p className="text-gray-600 mb-8">
        You do not have access to the requested page.
      </p>
      <Link to="/" className="text-blue-500 hover:text-blue-700">
        Go Back
      </Link>
    </div>
  );
};

export default Unauthorized;
