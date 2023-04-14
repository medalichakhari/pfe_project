import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import PrimaryButton from "../buttons/primarybutton";
import SecondaryButton from "../buttons/SecondaryButton";
import { BsBriefcase, BsSearch } from "react-icons/bs";
import { FaUserGraduate } from "react-icons/fa";
import { ImUserTie } from "react-icons/im";
import { AiFillSetting } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import Slogan from "../../assets/svg/Slogan";

export default function NavBar() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const navigateToJobPosting = () => {
    if (user?.roles?.includes("recruteur")) {
      return (
        <Navbar.Link href="/postjob" className="flex items-center">
          {<BsBriefcase className="mr-1 text-gray-500" />}Post Job
        </Navbar.Link>
      );
    } else {
      return (
        <Navbar.Link href="/companyaccount" className="flex items-center">
          {<BsBriefcase className="mr-1 text-gray-500" />}Post Job
        </Navbar.Link>
      );
    }
  };
  const navigateToRecruiterSpace = () => {
    if (user?.roles?.includes("recruteur")) {
      return navigate("/recruiterspace");
    } else {
      return navigate("/companyaccount");
    }
  };
  const navigateToCandidatSpace = () => {
    if (user?.roles?.includes("candidat")) {
      return navigate("/candidatspace");
    } else {
      return navigate("/candidataccount");
    }
  };
  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("logout success");
        navigate("/");
      })
      .catch((err) => {
        err;
      });
  };
  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="#">
          <Slogan className="mr-3 h-4"/>
          {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Jobyssey
          </span> */}
        </Navbar.Brand>
        {user ? (
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Avatar alt="User settings" img={user.picture} rounded={true} />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{user.name}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item
                onClick={navigateToCandidatSpace}
                className="flex items-center"
              >
                <FaUserGraduate size={15} className=" mr-1 text-gray-500" />
                Candidat space
              </Dropdown.Item>
              <Dropdown.Item
                onClick={navigateToRecruiterSpace}
                className="flex items-center"
              >
                <ImUserTie size={15} className="mr-1 text-gray-500" />
                Recruiter space
              </Dropdown.Item>
              <Dropdown.Item className="flex items-center">
                <AiFillSetting size={15} className="mr-1 text-gray-500" />
                Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                className="flex items-center"
                onClick={handleLogout}
              >
                <IoLogOut size={15} className="mr-1 text-gray-500" /> Sign out
              </Dropdown.Item>
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
            {<BsSearch className="mr-1 text-gray-500" />}Companies
          </Navbar.Link>
          {navigateToJobPosting()}
          <Navbar.Link href="/">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
