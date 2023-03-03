import React, { useState } from "react";
import { useQuery } from "react-query";
import SecondaryButton from "../buttons/SecondaryButton";
import JobCard from "../jobcard/JobCard";

const Jobs = () => {
  const [showCount, setShowCount] = useState(10);
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
    <div>
      <div className="flex gap-6 justify-center flex-wrap items-center py-10">
        {jobsList?.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
        <SecondaryButton onClick={handleLoadMore}>
          Load more
        </SecondaryButton>
      </div>
    </div>
  );
};

export default Jobs;
