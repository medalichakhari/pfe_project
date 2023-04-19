import React from "react";
import Layout from "../../components/layout/Layout";
import Search from "../../components/sections/Search";
import JobOfferCard from "../../components/jobcard/JobOfferCard";
import { useParams } from "react-router-dom";
import { GetOffresByCategorie } from "../../lib/fetch";
import { useState } from "react";
import { useQuery } from "react-query";
import SecondaryButton from "../../components/buttons/secondarybutton/SecondaryButton";

const JobsByCategory = () => {
  const [showCount, setShowCount] = useState(8);
  const { categoryId } = useParams();
  console.log(categoryId);
  const { data: jobOffers, isLoading } = useQuery(
    ["jobOffers", categoryId],
    () => GetOffresByCategorie(categoryId)
  );
  console.log(jobOffers);
  const jobOffersList = jobOffers && jobOffers?.slice(0, showCount);
  const handleLoadMore = () => {
    setShowCount(showCount + 8);
  };
  return isLoading ? (
    <div>Loading...</div>
  ) : !jobOffers.length > 0 ? (
    <div>no job aviailable</div>
  ) : (
    <Layout>
      <div className="text-center my-8">
        <h2 className="text-gray-900 text-3xl font-bold">
          Unlock Your Dream Career: Explore Our Diverse and Exciting Job
          Opportunities!
        </h2>
      </div>
      <Search />
      {jobOffersList?.map((jobOffer) => (
        <JobOfferCard key={jobOffer.id} jobOffer={jobOffer} />
      ))}

      {jobOffers.length > showCount && (
        <div className="mt-auto">
          <SecondaryButton onClick={handleLoadMore}>Load more</SecondaryButton>
        </div>
      )}
    </Layout>
  );
};

export default JobsByCategory;
