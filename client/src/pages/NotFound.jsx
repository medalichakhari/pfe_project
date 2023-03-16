import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" className="text-blue-500 hover:text-blue-700">
        Return to Home Page
      </Link>
    </div>
  );
};

export default NotFound;
