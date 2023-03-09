import React, { useState } from "react";
import { useQuery } from "react-query";
import SecondaryButton from "../buttons/SecondaryButton";
import JobCard from "../jobcard/JobCard";

const JobList = () => {
  const [showCount, setShowCount] = useState(5);
  const {
    data: Data,
    isLoading,
    error,
  } = useQuery("jobs", () => {
    return fetch("http://localhost:3000/jobs")
      .then((res) => res.json())
      .catch((err) => console.log(err));
  });
  const jobsList = Data?.slice(0, showCount);
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
      {jobsList && (
        <div className="mt-auto">
          <SecondaryButton onClick={handleLoadMore}>Load more</SecondaryButton>
        </div>
      )}
    </div>
  );
};

export default JobList;
