import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { BsBriefcase, BsSearch } from "react-icons/bs";

export default function NavBar() {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {
        ("logout success");
      })
      .catch((err) => {
        err;
      });
  };
  return (
    <>
      <Navbar fluid={true} rounded={true}>
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
        {user ? (
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Avatar
                  alt="User settings"
                  img={user.photoURL}
                  rounded={true}
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{user.displayName}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
        ) : (
          <div className="flex md:order-2 gap-4">
            <Link to="/signin">
              <SecondaryButton>Sign In</SecondaryButton>
            </Link>
            <Link to="/signup">
              <PrimaryButton>sign Up</PrimaryButton>
            </Link>
            <Navbar.Toggle />
          </div>
        )}

        <Navbar.Collapse>
          <Navbar.Link href="/" active={true}>
            Home
          </Navbar.Link>
          <Navbar.Link href="/">About</Navbar.Link>
          <Navbar.Link href="/" className="flex items-center">
            {<BsSearch className="mr-1" />}Find Job
          </Navbar.Link>
          <Navbar.Link href="/postjob" className="flex items-center">
            {<BsBriefcase className="mr-1" />}Post Job
          </Navbar.Link>
          <Navbar.Link href="/">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
