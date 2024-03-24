import React, { useState } from "react";
import SecondaryButton from "../buttons/secondarybutton/SecondaryButton";
import JobCard from "../jobcard/JobCard";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const JobList = ({ isLoadingJobs, filteredJobs }) => {
  const { t } = useTranslation();
  const [showCount, setShowCount] = useState(8);
  const jobsList =
    filteredJobs &&
    filteredJobs
      ?.sort((a, b) => new Date(b?.updatedAt) - new Date(a?.updatedAt))
      ?.slice(0, showCount);
  const handleLoadMore = () => {
    setShowCount(showCount + 8);
  };
  // Define the initial and animate values for opacity
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return !isLoadingJobs && jobsList.length > 0 ? (
    // Wrap the div with motion.div and add the initial and animate props
    <motion.div
      className="flex flex-col items-center h-full"
      initial="hidden"
      animate="visible"
      variants={variants}
    >
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
    </motion.div>
  ) : (
    <div className="flex flex-col items-center h-full">
      <div className="flex gap-12 justify-center flex-wrap items-center py-10 mb-auto">
        <p className="text-2xl font-bold text-gray-500">{t("noJobsFound")}</p>
      </div>
    </div>
  );
};

export default JobList;
