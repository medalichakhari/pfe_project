import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import PrimaryButton from "../buttons/primarybutton/PrimaryButton";
import SecondaryButton from "../buttons/secondarybutton/SecondaryButton";
import { BsBriefcase } from "react-icons/bs";
import { FaUserGraduate } from "react-icons/fa";
import { ImUserTie } from "react-icons/im";
import {
  AiFillMessage,
  AiFillSetting,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import Slogan from "../../assets/svg/Slogan";
import { FiUpload } from "react-icons/fi";
import SelectLanguage from "../shared/SelectLanguage";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useUser } from "../../context/UserContext";
import {
  GetNotificationByCandidat,
  GetNotificationBySociete,
} from "../../lib/fetch";

export default function NavBar() {
  const { t } = useTranslation();
  const { user, logOut, token } = useAuth();
  const { company, candidate } = useUser();
  const navigate = useNavigate();
  const { data: recruiterNotifs, isLoading: isLoadingRecruiterNotifs } =
    useQuery(["recruiterNotifs", company?.id, token], () => {
      if (user?.roles?.includes("recruteur")) {
        return GetNotificationBySociete(company?.id, token);
      } else {
        // Return an empty array if the user is not a recruiter
        return Promise.resolve([]);
      }
    });

  const { data: candidateNotifs, isLoading: isLoadingCandidateNotifs } =
    useQuery(["candidateNotifs", candidate?.id, token], () => {
      if (user?.roles?.includes("candidat")) {
        return GetNotificationByCandidat(candidate?.id, token);
      } else {
        // Return an empty array if the user is not a candidate
        return Promise.resolve([]);
      }
    });
  console.log("recruiterNotifs", recruiterNotifs);
  const navigateToJobPosting = () => {
    if (user?.roles?.includes("recruteur")) {
      return (
        <Navbar.Link href="/postjob" className="flex items-center">
          {<BsBriefcase className="mr-1 text-gray-500" />}
          {t("nav.postJob")}
        </Navbar.Link>
      );
    } else {
      return (
        <Navbar.Link href="/companyaccount" className="flex items-center">
          {<BsBriefcase className="mr-1 text-gray-500" />}
          {t("nav.postJob")}
        </Navbar.Link>
      );
    }
  };
  const navigateToChat = () => {
    navigate("/chat");
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
      return navigate("/candidatespace");
    } else {
      return navigate("/candidateaccount");
    }
  };
  const navigateToSettings = () => {
    navigate("/profile");
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
          <Slogan className="mr-3 h-4" />
          {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Jobyssey
          </span> */}
        </Navbar.Brand>
        {user ? (
          <div className="flex md:order-2">
            <div className="pr-5">
              <SelectLanguage />
            </div>
            {user?.roles?.includes("recruteur") ||
            user?.roles?.includes("candidat") ? (
              <div className="flex justify-center items-center">
                <button
                  className="pr-5 text-primary hover:text-secondary"
                  onClick={navigateToChat}
                >
                  <AiFillMessage size={30} />
                </button>
                <Dropdown
                  arrowIcon={false}
                  inline={true}
                  label={
                    <button className="pr-5 text-primary hover:text-secondary">
                      <IoNotifications size={30} />
                    </button>
                  }
                >
                  <Dropdown.Header>
                    <span className="block truncate text-center text-md font-medium">
                      Notifications
                    </span>
                  </Dropdown.Header>
                  {user?.roles?.includes("recruteur") ? (
                    <Dropdown.Item className="flex items-center">
                      <ImUserTie size={15} className="mr-1 text-gray-500" />
                      For Recruiters
                    </Dropdown.Item>
                  ) : null}
                  {!isLoadingRecruiterNotifs && recruiterNotifs?.length > 0 ? (
                    recruiterNotifs.map((notification, index) => (
                      <Dropdown.Item key={index}>
                        {notification.message}
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Item>
                      No recruiter notifications available
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  {user?.roles?.includes("candidat") ? (
                    <Dropdown.Item
                      onClick={navigateToCandidatSpace}
                      className="flex items-center"
                    >
                      <FaUserGraduate
                        size={15}
                        className=" mr-1 text-gray-500"
                      />
                      For Candidates
                    </Dropdown.Item>
                  ) : null}
                  {!isLoadingCandidateNotifs && candidateNotifs?.length > 0 ? (
                    candidateNotifs.map((notification, index) => (
                      <Dropdown.Item key={index}>
                        {notification.message}
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Item>
                      No candidate notifications available
                    </Dropdown.Item>
                  )}
                </Dropdown>
              </div>
            ) : null}

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
                {t("nav.candidateSpace")}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={navigateToRecruiterSpace}
                className="flex items-center"
              >
                <ImUserTie size={15} className="mr-1 text-gray-500" />
                {t("nav.recruiterSpace")}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={navigateToSettings}
                className="flex items-center"
              >
                <AiFillSetting size={15} className="mr-1 text-gray-500" />
                {t("nav.profile")}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                className="flex items-center"
                onClick={handleLogout}
              >
                <IoLogOut size={15} className="mr-1 text-gray-500" />{" "}
                {t("nav.signOut")}
              </Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
        ) : (
          <div className="flex md:order-2 gap-2">
            <SelectLanguage />

            <Link to="/signin">
              <SecondaryButton>{t("nav.signIn")}</SecondaryButton>
            </Link>
            <Link to="/signup">
              <PrimaryButton>{t("nav.signUp")}</PrimaryButton>
            </Link>
            <Navbar.Toggle />
          </div>
        )}

        <Navbar.Collapse>
          <Navbar.Link href="/" active={true}>
            {t("nav.home")}
          </Navbar.Link>
          <Navbar.Link href="/about">{t("nav.about")}</Navbar.Link>
          <Navbar.Link href="/candidateaccount" className="flex items-center">
            {<FiUpload className="mr-1 text-gray-500" />}
            {t("nav.uploadCV")}
          </Navbar.Link>
          {navigateToJobPosting()}
          <Navbar.Link href="/contact">{t("nav.contact")}</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
