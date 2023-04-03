import React, { useState } from "react";
import { useQuery } from "react-query";
import SecondaryButton from "../buttons/SecondaryButton";
import JobCard from "../jobcard/JobCard";
import { GetOffres } from "../../lib/fetch";
import { useAuth } from "../../context/AuthContext";

const JobList = () => {
  const { token } = useAuth();
  const [showCount, setShowCount] = useState(5);
  console.log(token);
  const {
    data: jobs,
    isLoading,
    error,
  } = useQuery(["jobs", token], () => GetOffres(token));
  const jobsList = jobs && jobs?.slice(0, showCount);
  const handleLoadMore = () => {
    setShowCount(showCount + 5);
  };
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col items-center h-full">
      <div className="flex gap-6 justify-center flex-wrap items-center py-10 mb-auto">
        {jobsList?.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      {jobs.length >showCount && (
        <div className="mt-auto">
          <SecondaryButton onClick={handleLoadMore}>Load more</SecondaryButton>
        </div>
      )}
    </div>
  );
};

export default JobList;
