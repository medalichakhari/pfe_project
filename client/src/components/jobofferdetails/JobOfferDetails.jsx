import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import GoogleIcon from "../../assets/svg/GoogleIcon";
import PrimaryButton from "../buttons/primarybutton/PrimaryButton";
import { useAuth } from "../../context/AuthContext";
import { useQuery } from "react-query";
import { GetOffre } from "../../lib/fetch";
import { BsBriefcase } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const JobOfferDetails = () => {
  const { t } = useTranslation();
  const { offerId } = useParams();
  const { token, user } = useAuth();
  const { data, isLoading } = useQuery(["offer", offerId, token], () =>
    GetOffre(offerId, token)
  );
  const navigate = useNavigate();
  const handleNavigate = () => {
    user && user.roles.includes("candidat")
      ? navigate(`/offer/${offerId}/apply/${data.societe.id}`)
      : navigate("/candidateaccount");
  };
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <div className="container mx-auto my-10 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800">{data.titre}</h1>
          <PrimaryButton onClick={handleNavigate}>
            {t("jobOfferDetails.applyNow")}
          </PrimaryButton>
        </div>
        <div className="flex my-10">
          <div className="w-1/2">
            {data.societe?.logo ? (
              <img
                src={data.societe?.logo}
                alt={data.societe?.nom}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : null}

            <h2 className="text-xl font-bold text-gray-800 mt-5">
              {data.societe?.nom}
            </h2>
            <p className="flex justify-content text-gray-600 mt-2">
              <HiOutlineLocationMarker className="text-gray-500 m-1" />
              {data.adresse}
            </p>
            <p className="flex justify-content text-gray-600 mt-2">
              <BsBriefcase className="text-gray-500 m-1" />
              {data.type}
            </p>
          </div>
          <div className="w-1/2">
            <h3 className="text-2xl font-bold text-gray-800 mb-5">
              {t("jobOfferDetails.jobDetails")}
            </h3>
            <p
              className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>
        </div>
        <div className="flex my-10">
          <div className="w-1/2">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {t("jobOfferDetails.salary")}
              </h3>
              <li className="text-gray-600 mb-4">{data.salaire}</li>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {t("jobOfferDetails.jobType")}
              </h3>
              <li className="text-gray-600">{data.type}</li>
            </div>
          </div>
          <div className="w-1/2">
            <h3 className="text-xl font-bold text-gray-800 mb-5">
              {t("jobOfferDetails.qualifications")}
            </h3>
            <p className="text-gray-600">{data.competences}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobOfferDetails;
