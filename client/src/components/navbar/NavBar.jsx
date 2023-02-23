import React from "react";
import { Navbar } from "flowbite-react";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

export default function NavBar() {
  return (
    <Navbar fluid={true} rounded={true} >
      <Navbar.Brand href="#">
        {/* <img
      src=""
      className="mr-3 h-6 sm:h-9"
      alt="Jobyssey Logo"
    /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Jobyssey
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 gap-4">
        <SecondaryButton>Sign In</SecondaryButton>
        <PrimaryButton>sign Up</PrimaryButton>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/">About</Navbar.Link>
        <Navbar.Link href="/">Find Job</Navbar.Link>
        <Navbar.Link href="/">Post Job</Navbar.Link>
        <Navbar.Link href="/">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
