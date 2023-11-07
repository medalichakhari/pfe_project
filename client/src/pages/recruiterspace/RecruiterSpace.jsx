import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { Tabs } from "flowbite-react";
import PostedJobCard from "../../components/jobcard/PostedJobCard";
import SecondaryButton from "../../components/buttons/secondarybutton/SecondaryButton";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import { useQuery } from "react-query";
import { GetOffresBySociete } from "../../lib/fetch";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RecruiterSpace = () => {
  const { token } = useAuth();
  const { company } = useUser();
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: jobsList,
    refetch,
  } = useQuery(["candidates", company?.id, token], () =>
    GetOffresBySociete(company?.id, token)
  );

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredJobsList = jobsList?.filter((job) =>
    job.titre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <h1 className="text-4xl font-bold ml-3 mt-8">Recruiter Space</h1>
      <Tabs.Group style="underline">
        <Tabs.Item title="Jobs" active={true}>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <div className="relative mb-2 md:mb-0 mx-2 md:mx-2 w-full md:w-full">
                <input
                  type="text"
                  placeholder="Chercher un offre d'emploi"
                  className="bg-white text-gray-800 rounded-full py-2 px-10 pl-10 focus:outline-none focus:shadow-outline w-full md:w-full"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <FaSearch className="text-gray-500" />
                </div>
              </div>
              {!filteredJobsList || filteredJobsList.length === 0 ? (
                <div className="pt-4 pb-80 text-center">
                  <p className="text-lg font-senibold mb-4">
                    There are no posted jobs.
                  </p>
                  <SecondaryButton onClick={() => navigate("/postjob")}>
                    Post a job
                  </SecondaryButton>
                </div>
              ) : (
                <div className="flex flex-col items-center h-full">
                  <div className="flex gap-4 justify-center flex-wrap items-center py-4 mb-auto">
                    {filteredJobsList?.map((job) => (
                      <PostedJobCard
                        key={job.id}
                        jobTitle={job.titre}
                        jobType={job.type}
                        numCandidates={job.candidatures?.length || 0}
                        jobId={job.id}
                        refetch={refetch}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Tabs.Item>
        <Tabs.Item title="Interviews">Interviews</Tabs.Item>
      </Tabs.Group>
    </Layout>
  );
};

export default RecruiterSpace;
