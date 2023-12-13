import React from "react";
import Layout from "@/layout/Layout";
import JobOfferCard from "@/jobcard/JobOfferCard";
import { useParams } from "react-router-dom";
import { GetOffresByCategorie } from "../../lib/fetch";
import { useState } from "react";
import { useQuery } from "react-query";
import SecondaryButton from "@/buttons/secondarybutton/SecondaryButton";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "@/shared/LoadingSpinner";

const JobsByCategory = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { candidate, company } = useUser();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showCount, setShowCount] = useState(9);
  const { categoryId } = useParams();
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await GetOffresByCategorie(categoryId);
        let filteredJobs;

        if (user) {
          const { roles } = user;
          const isRecruiter = roles.includes("recruteur");
          const isCandidate = roles.includes("candidat");

          filteredJobs = res.filter((job) => {
            if (isRecruiter && isCandidate) {
              return (
                job.societe?.id !== company?.id &&
                !data?.some((candidature) => candidature?.offreId === job?.id)
              );
            } else if (isRecruiter) {
              return job.societe.id !== company?.id;
            } else if (isCandidate) {
              return !data?.some(
                (candidature) => candidature?.offreId === job?.id
              );
            }
            return true;
          });
        }

        setFilteredJobs(filteredJobs);
      } catch (err) {
        console.log(err);
      }
    };

    if (data) {
      fetchJobs();
    }
  }, [company, candidate, data, user]);
  const jobOffersList = filteredJobs && filteredJobs?.slice(0, showCount);
  const handleLoadMore = () => {
    setShowCount(showCount + 9);
  };
  return isLoading ? (
    <LoadingSpinner />
  ) : !jobOffers.length > 0 ? (
    <div>{t("jobsByCategory.noJob")}</div>
  ) : (
    <Layout>
      <div className="my-8 mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          {t("jobsByCategory.unlockYour")}
        </h2>
      </div>
      {/* <Search placeholder={t("jobsByCategory.searchPlaceholder")} /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {jobOffersList?.map((jobOffer) => (
          <JobOfferCard key={jobOffer.id} jobOffer={jobOffer} />
        ))}
      </div>
      {jobOffers.length > showCount && (
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
