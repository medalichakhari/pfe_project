import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";
export default function SecondaryButton({
  children,
  className,
  onClick,
  ...props
}) {
  const cx = classNames([
    "border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 rounded-full py-1.5 px-5 md:py-1.5 md:px-5",
    className,
  ]);

  return (
    <button onClick={onClick} className={cx} {...props}>
      {children}
    </button>
  );
}

SecondaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  classNames: PropTypes.string,
  onClick: PropTypes.func,
};
