import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";

export default function Radio({
  options,
  name,
  className,
  selectedValue,
  setSelectedValue,
  ...props
}) {
  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
  };
  return (
    <div className="flex items-center mb-1 ">
      {options.map((option) => (
        <label
          key={option.value}
          className="ml-2 block text-sm font-medium text-gray-700"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            onChange={handleRadioChange}
            className={classNames(
              " mr-1 h-4 w-4 text-secondary focus:ring-primary border-gray-600",
              className
            )}
            {...props}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}

Radio.propTypes = {
  classNames: PropTypes.string,
};
