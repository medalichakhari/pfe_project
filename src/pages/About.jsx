import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Slogan from "../assets/svg/Slogan";
import SecondaryButton from "@/buttons/secondarybutton/SecondaryButton";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center w-full md:w-1/2 mb-8 mr-8 md:mb-0">
          <Slogan />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Embark on Your Career Odyssey with Jobyssey: Where Opportunities
            Await
          </h2>
          <p className="text-gray-600 leading-7">
            Welcome to Jobyssey, your gateway to an exciting journey towards
            professional success! At Jobyssey, we understand that finding the
            right job isn't just about employment—it's about discovering your
            passion, advancing your career, and navigating a path that aligns
            with your aspirations. With a commitment to connecting talented
            individuals with top-tier employers, Jobyssey offers a diverse range
            of opportunities across industries and expertise levels. Whether
            you're a recent graduate eager to dive into your field or a seasoned
            professional seeking new horizons, our platform is designed to cater
            to your needs.
          </p>
          <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What Jobyssey Offers:
              </h3>
              <ul className="list-disc list-inside text-gray-700 leading-7">
                <li>
                  <span className="font-medium">Diverse Opportunities:</span> Explore a vast array of job listings spanning various industries.
                </li>
                <li>
                  <span className="font-medium">Tailored Matches:</span> Our advanced algorithms ensure roles align with your skills and preferences.
                </li>
                <li>
                  <span className="font-medium">Resourceful Tools:</span> Leverage resume builders, interview tips, and career advice articles.
                </li>
                <li>
                  <span className="font-medium">Community Support:</span> Join a vibrant network through forums, events, and mentorship opportunities.
                </li>
              </ul>
            </div>
          <SecondaryButton
            onClick={() => navigate("/contact")}
          >
            Contact us
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default About;
