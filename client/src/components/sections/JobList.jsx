import React, { useState } from "react";
import SecondaryButton from "../buttons/secondarybutton/SecondaryButton";
import JobCard from "../jobcard/JobCard";
import { useTranslation } from "react-i18next";

const JobList = ({ filteredJobs }) => {
  const { t } = useTranslation();
  const [showCount, setShowCount] = useState(8);
  const jobsList =
    filteredJobs &&
    filteredJobs
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, showCount);
  const handleLoadMore = () => {
    setShowCount(showCount + 8);
  };
  return  (
    <div className="flex flex-col items-center h-full">
      <div className="flex gap-12 justify-center flex-wrap items-center py-10 mb-auto">
        {jobsList?.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      {filteredJobs?.length > showCount && (
        <div className="mt-auto">
          <SecondaryButton onClick={handleLoadMore}>
            {t("loadMore")}
          </SecondaryButton>
        </div>
      )}
    </div>
  );
};

export default JobList;
