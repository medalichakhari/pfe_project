import React from "react";
import Layout from "../../components/layout/Layout";
import Search from "../../components/sections/Search";
import JobOfferCard from "../../components/jobcard/JobOfferCard";
import { useParams } from "react-router-dom";
import { GetOffresByCategorie } from "../../lib/fetch";
import { useState } from "react";
import { useQuery } from "react-query";
import SecondaryButton from "../../components/buttons/secondarybutton/SecondaryButton";
import { useTranslation } from "react-i18next";

const JobsByCategory = () => {
  const { t } = useTranslation();
  const [showCount, setShowCount] = useState(9);
  const { categoryId } = useParams();
  const { data: jobOffers, isLoading } = useQuery(
    ["jobOffers", categoryId],
    () => GetOffresByCategorie(categoryId)
  );
  const jobOffersList = jobOffers && jobOffers?.slice(0, showCount);
  const handleLoadMore = () => {
    setShowCount(showCount + 8);
  };
  return isLoading ? (
    <div>Loading...</div>
  ) : !jobOffers.length > 0 ? (
    <div>{t("jobsByCategory.noJob")}</div>
  ) : (
    <Layout>
<div className="my-8 mx-auto max-w-4xl">
  <h2 className="text-center text-3xl font-bold text-gray-900">
    {t("jobsByCategory.unlockYour")}
  </h2>
</div>
      <Search placeholder={t("jobsByCategory.searchPlaceholder")} />
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
