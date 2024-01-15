import React, { useEffect } from "react";
import Layout from "@/layout/Layout";
import JobOfferCard from "@/jobcard/JobOfferCard";
import { useParams } from "react-router-dom";
import {
  GetCandidaturesByCandidat,
  GetOffresByCategorie,
} from "../../lib/fetch";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import { useQuery } from "react-query";
import SecondaryButton from "@/buttons/secondarybutton/SecondaryButton";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "@/shared/LoadingSpinner";

const JobsByCategory = () => {
  const { t } = useTranslation();
  const { user, token } = useAuth();
  const { candidate, company } = useUser();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showCount, setShowCount] = useState(9);
  const { categoryId } = useParams();
  const { data } = useQuery(["candidatures", token], () =>
    GetCandidaturesByCandidat(candidate?.id, token)
  );
  const filterJobs = (jobs) => {
    if (!user) return jobs;

    const { roles } = user;
    const isRecruiter = roles?.includes("recruteur");
    const isCandidate = roles?.includes("candidat");

    return jobs.filter((job) => {
      if (isRecruiter && isCandidate) {
        return (
          job?.societe?.id !== company?.id &&
          !data?.some((candidature) => candidature?.offreId === job?.id)
        );
      } else if (isRecruiter) {
        return job?.societe?.id !== company?.id;
      } else if (isCandidate) {
        return !data?.some((candidature) => candidature?.offreId === job?.id);
      }
      return true;
    });
  };

  const fetchJobsByCategory = async () => {
    try {
      const res = await GetOffresByCategorie(categoryId);
      const updatedJobs = filterJobs(res);
      setFilteredJobs(updatedJobs);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (data) {
      fetchJobsByCategory();
    }
  }, [categoryId, company, candidate, data, user]);

  const jobOffersList = filteredJobs?.slice(0, showCount); // Integrate showCount here
  const handleLoadMore = () => {
    setShowCount(showCount + 9);
  };
  // isLoading ? (
  //   <LoadingSpinner />
  // ) : !jobOffers.length > 0 ? (
  //   <div>{t("jobsByCategory.noJob")}</div>
  // ) :
  return (
    <Layout>
      <div className="my-8 mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          {t("jobsByCategory.unlockYour")}
        </h2>
      </div>
      {/* <Search placeholder={t("jobsByCategory.searchPlaceholder")} /> */}
      {jobOffersList?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {jobOffersList?.map((jobOffer) => (
            <JobOfferCard key={jobOffer.id} jobOffer={jobOffer} />
          ))}
        </div>
      ) : (

      <div className="flex flex-col items-center h-full">
          <div className="flex gap-12 justify-center flex-wrap items-center py-10 mb-auto">
            <p className="text-2xl font-bold text-gray-500">
              No job offers found
            </p>
          </div>
        </div>)}

      {jobOffersList?.length > showCount && (
        <div className="mt-8 flex justify-center">
          <SecondaryButton onClick={handleLoadMore}>
            {t("jobsByCategory.loadMore")}
          </SecondaryButton>
        </div>
      )}
    </Layout>
  );
};

export default JobsByCategory;
