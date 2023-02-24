import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";

export default function Input({ children, label, className, ...props }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        className={classNames(
          "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white",
          className
        )}
        {...props}
      />
    </div>
  );
}

Input.propTypes = {
  children: PropTypes.node.isRequired,
  classNames: PropTypes.string,
  label: PropTypes.string,
};
