import React from "react";
import JobCard from "../jobcard/JobCard";
import { useTranslation } from "react-i18next";

const RecommendedJobs = ({ recommendedJobs }) => {
  const { t } = useTranslation();
  const recommendedJobsList = recommendedJobs && recommendedJobs.slice(0, 4);
  return (
    <>
      {recommendedJobsList.length > 0 && (
        <div>
          <div className="text-center">
            <h2 className="text-gray-900 text-2xl font-bold">
              {t("recommendation.recommendedJobs")}
            </h2>
          </div>
          <div className="flex gap-12 justify-center flex-wrap items-center py-10 mb-auto">
            {recommendedJobsList.map((recommendedJob) => (
              <JobCard key={recommendedJob.id} job={recommendedJob} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RecommendedJobs;
