import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";

export default function PrimaryButton({
  children,
  className,
  onClick,
  isLoading,
  ...props
}) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "text-white rounded-full py-1.5 px-5 md:py-1.5 md:px-5 bg-gradient-to-br hover:bg-gradient-to-r transition-all duration-300 from-primary to-secondary hover:bg-blend-darken",
        className,
        isLoading && "opacity-50 cursor-not-allowed"
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  classNames: PropTypes.string,
  onClick: PropTypes.func,
};
