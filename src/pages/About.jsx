import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Slogan from "../assets/svg/Slogan";
import SecondaryButton from "../components/buttons/secondarybutton/SecondaryButton";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center w-full md:w-1/2 mb-8 mr-8 md:mb-0">
          <Slogan />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Built with PERN stack and Tailwind CSS
          </h2>
          <p className="text-gray-600 leading-7">
            At our job portal, we're passionate about connecting talented
            individuals with their dream job opportunities. We believe that
            everyone deserves the chance to find fulfilling work, and we're
            committed to making that process as seamless and efficient as
            possible. Our platform is built with React.js, a cutting-edge
            JavaScript library that allows us to create dynamic and responsive
            user interfaces. With React, we're able to provide our users with an
            intuitive and engaging experience, making it easy to find and apply
            for jobs. We've also incorporated Tailwind CSS into our design
            process, which allows us to rapidly prototype and style our
            application. Tailwind's utility-first approach helps us to create
            beautiful, responsive layouts quickly and easily, without
            sacrificing flexibility.
          </p>
          <p className="text-gray-600 leading-7 mt-4">
            Our team is made up of experienced developers and job market
            experts, who work tirelessly to ensure that our platform is
            up-to-date and relevant to today's job seekers. We're constantly
            iterating and improving, and we're always open to feedback from our
            users. Whether you're a recent graduate looking for your first job,
            or an experienced professional seeking new challenges, our job
            portal has something to offer. So why not join us today and take the
            first step towards your dream career?
          </p>
          <SecondaryButton
            onClick={() => navigate("/contact")}
            className="mt-6"
          >
            Contact us
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default About;
