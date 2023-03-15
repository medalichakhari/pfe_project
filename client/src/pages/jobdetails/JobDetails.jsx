import React from "react";
import { useParams } from "react-router-dom";
import GoogleIcon from "../../assets/svg/GoogleIcon";
// import { jobData } from "./jobData"; // assuming you have an array of job data

const JobDetails = () => {
  const { jobId } = useParams(); // assuming you are using React Router to pass the job ID parameter

//   const job = jobData.find((job) => job.id === jobId); // assuming each job object has a unique ID property

  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">React Developer</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Apply Now
        </button>
      </div>
      <div className="flex my-10">
        <div className="w-1/2">
          <GoogleIcon />
          {/* <img src={job.logo} alt={job.company} className="w-32 h-32 rounded-full mx-auto" /> */}
          <h2 className="text-xl font-bold mt-5">Google</h2>
          <p className="text-gray-600 mt-2">Foussana</p>
          <p className="text-gray-600 mt-2">Informatique</p>
        </div>
        <div className="w-1/2">
          <h3 className="text-xl font-bold mb-5">Job Description</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            placeat eos sunt reiciendis ratione, dolorum inventore odit sit
            maxime ullam, minus esse non et rerum quia aspernatur. Fugit, illo
            quaerat.
          </p>
        </div>
      </div>
      <div className="my-10">
        <h3 className="text-xl font-bold mb-5">Qualifications</h3>
        <ul className="list-disc list-inside">
          {/* {job.qualifications.map((qualification, index) => (
            <li key={index}>{qualification}</li>
          ))} */}
          <li>React</li>
          <li>React</li>
          <li>React</li>
          <li>React</li>
        </ul>
      </div>
    </div>
  );
};

export default JobDetails;
