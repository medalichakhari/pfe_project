import React from "react";
import { useParams } from "react-router-dom";
import GoogleIcon from "../../assets/svg/GoogleIcon";
import PrimaryButton from "../buttons/PrimaryButton";
import ApplyDialog from "./ApplyDialog";

const OfferDetails = () => {
  const { offerId } = useParams();
  const [openApplyDialog, setOpenApplyDialog] = React.useState(false);
  const handleOpenApplyDialog = () => {
    setOpenApplyDialog(true);
  };
  return (
    <>
      {openApplyDialog && (
        <ApplyDialog open={openApplyDialog} setOpen={setOpenApplyDialog} />
      )}
      <div className="container mx-auto my-10">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800">React Developer</h1>
          <PrimaryButton onClick={handleOpenApplyDialog}>
            Apply Now
          </PrimaryButton>
        </div>
        <div className="flex my-10">
          <div className="w-1/2">
            <GoogleIcon />
            {/* <img src={job.logo} alt={job.company} className="w-32 h-32 rounded-full mx-auto" /> */}
            <h2 className="text-xl font-bold text-gray-800 mt-5">Google</h2>
            <p className="text-gray-600 mt-2">Foussana</p>
            <p className="text-gray-600 mt-2">Informatique</p>
          </div>
          <div className="w-1/2">
            <h3 className="text-2xl font-bold text-gray-800 mb-5">
              Job Description
            </h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              placeat eos sunt reiciendis ratione, dolorum inventore odit sit
              maxime ullam, minus esse non et rerum quia aspernatur. Fugit, illo
              quaerat.
            </p>
          </div>
        </div>
        <div className="my-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-5">
            Qualifications
          </h3>
          <ul className="list-disc list-inside text-gray-600">
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
    </>
  );
};

export default OfferDetails;
