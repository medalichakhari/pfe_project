import React from "react";
import { Footer as footer } from "flowbite-react";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";

const Footer = () => {
  return (
    <footer>
      <div className="w-full mt-8">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="ml-4">
            {/* <footer.Brand
              href="https://flowbite.com"
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Flowbite Logo"
              name="Flowbite"
            /> */}
            <span className="self-center whitespace-nowrap text-2xl font-bold dark:text-white">
              Jobyssey
            </span>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6 mr-4">
            <div>
              <footer.Title title="about" />
              <footer.LinkGroup col={true}>
                <footer.Link href="#">Jobyssey</footer.Link>
                <footer.Link href="#">Jobyssey</footer.Link>
              </footer.LinkGroup>
            </div>
            <div>
              <footer.Title title="Follow us" />
              <footer.LinkGroup col={true}>
                <footer.Link href="#">Github</footer.Link>
                <footer.Link href="#">Discord</footer.Link>
              </footer.LinkGroup>
            </div>
            <div>
              <footer.Title title="Legal" />
              <footer.LinkGroup col={true}>
                <footer.Link href="#">Privacy Policy</footer.Link>
                <footer.Link href="#">Terms & Conditions</footer.Link>
              </footer.LinkGroup>
            </div>
          </div>
        </div>
        <footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between ml-4">
          <footer.Copyright href="#" by="Jobyssey™" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center mr-6">
            <footer.Icon href="#" icon={BsFacebook} />
            <footer.Icon href="#" icon={BsInstagram} />
            <footer.Icon href="#" icon={BsTwitter} />
            <footer.Icon href="#" icon={BsGithub} />
            <footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
