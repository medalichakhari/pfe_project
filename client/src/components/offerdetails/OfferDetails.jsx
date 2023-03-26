import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import GoogleIcon from "../../assets/svg/GoogleIcon";
import PrimaryButton from "../buttons/PrimaryButton";

const OfferDetails = () => {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const [openApplyDialog, setOpenApplyDialog] = React.useState(false);
  const handleOpenApplyDialog = () => {
    setOpenApplyDialog(true);
  };
  return (
    <>
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
            <p className="flex justify-content text-gray-600 mt-2">
              <HiOutlineLocationMarker className="text-gray-500 m-1" />
              Foussana
            </p>
            <p className="text-gray-600 mt-2 ml-2">Informatique</p>
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
        <div className="flex my-10">
          <div className="w-1/2">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Salary</h3>
              <li className="text-gray-600 mb-4">250k$</li>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Type</h3>
              <li className="text-gray-600">Partime</li>
            </div>
          </div>{" "}
          <div className="w-1/2">
            <h3 className="text-xl font-bold text-gray-800 mb-5">
              Qualifications
            </h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              placeat eos sunt reiciendis ratione, dolorum inventore odit sit
              maxime ullam, minus esse non et rerum quia aspernatur. Fugit, illo
              quaerat.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferDetails;
