import React, { useState } from "react";
import { useQuery } from "react-query";
import SecondaryButton from "../buttons/secondarybutton/SecondaryButton";
import JobCard from "../jobcard/JobCard";
import { GetOffres } from "../../lib/fetch";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const JobList = () => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const [showCount, setShowCount] = useState(8);
  const {
    data: jobs,
    isLoading,
    error,
  } = useQuery(["jobs", token], () => GetOffres(token));
  const jobsList =
    jobs &&
    jobs
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, showCount);
  const handleLoadMore = () => {
    setShowCount(showCount + 8);
  };
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col items-center h-full">
      <div className="flex gap-10 justify-center flex-wrap items-center py-10 mb-auto">
        {jobsList?.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      {jobs.length > showCount && (
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
