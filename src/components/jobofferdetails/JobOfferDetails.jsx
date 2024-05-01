import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import PrimaryButton from "../buttons/primarybutton/PrimaryButton";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import { useQuery } from "react-query";
import { GetCandidaturesByCandidat, GetOffre } from "../../lib/fetch";
import { BsBriefcase } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../shared/LoadingSpinner";

const JobOfferDetails = () => {
  const { t } = useTranslation();
  const { offerId } = useParams();
  const { token, user } = useAuth();
  const { candidate } = useUser();
  const { data: candidatures, isLoading: isLoadingCandidatures } = useQuery(
    ["candidatures", token],
    () => GetCandidaturesByCandidat(candidate?.id, token),
    {
      enabled: !!candidate?.id,
    }
  );
  const { data, isLoading } = useQuery(["offer", offerId, token], () =>
    GetOffre(offerId, token)
  );
  const offerExistsInCandidatures =
    Array.isArray(candidatures) &&
    !isLoadingCandidatures &&
    candidatures.some((candidature) => candidature?.offreId == offerId);
  const navigate = useNavigate();
  const handleNavigate = () => {
    user && user.roles.includes("candidat")
      ? navigate(`/offer/${offerId}/apply/${data.societe.id}`)
      : navigate("/candidateaccount");
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="container mx-auto my-10 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-800">{data.titre}</h1>
        <PrimaryButton
          onClick={handleNavigate}
          disabled={offerExistsInCandidatures}
        >
          {t("jobOfferDetails.applyNow")}
        </PrimaryButton>
      </div>
      <div className="flex my-10">
        <div className="w-1/3">
          {data.societe?.logo && (
            <img
              src={data.societe?.logo}
              alt={data.societe?.nom}
              className="h-16 w-16 rounded-full object-cover"
            />
          )}
          <h2 className="text-xl font-bold text-gray-800 mt-5">
            {data.societe?.nom}
          </h2>
          <p className="text-gray-600 mt-2 flex items-center">
            <HiOutlineLocationMarker className="text-gray-500 mr-1" />
            {data.isRemote ? data?.societe.pays : "Remote"}
          </p>
          <p className="text-gray-600 mt-2 flex items-center">
            <BsBriefcase className="text-gray-500 mr-1" />
            Internship
          </p>
        </div>
        <div className="w-2/3">
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
        <div className="w-1/3">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {t("jobOfferDetails.date")}
            </h3>
            <p className="text-gray-600 mb-4">
              {data.startDate} {data.endDate}
            </p>
          </div>
        </div>
        <div className="w-2/3">
          <h3 className="text-xl font-bold text-gray-800 mb-5">
            {t("jobOfferDetails.qualifications")}
          </h3>
          <p className="text-gray-600">{data.competences}</p>
        </div>
      </div>
    </div>
  );
};

export default JobOfferDetails;
