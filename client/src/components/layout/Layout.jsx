import React from "react";
import PropTypes from "prop-types";
import Navbar from "../navbar/NavBar";
import Footer from "../footer/Footer";

export default function Layout({ children }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="overflow-hidden">{children}</main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
