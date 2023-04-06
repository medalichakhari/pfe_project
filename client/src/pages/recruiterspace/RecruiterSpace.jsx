import React from "react";
import Layout from "../../components/layout/Layout";
import { Tabs } from "flowbite-react";
import PostedJobCard from "../../components/jobcard/PostedJobCard";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import { useQuery } from "react-query";
import { GetOffresBySociete } from "../../lib/fetch";

const CandidatSpace = () => {
  const { token } = useAuth();
  const { company } = useUser();
  console.log(company);

  const {
    isLoading,
    error,
    data: jobsList,
  } = useQuery(["candidates", company.id, token], () =>
    GetOffresBySociete(company.id, token)
  );
  console.log(jobsList?.candidature?.length());
  return (
    <Layout>
      <h1 className="text-4xl font-bold ml-3 mt-8">Recruiter Space</h1>
      <Tabs.Group style="underline">
        <Tabs.Item title="Profile" active={true}>
          Profile content
        </Tabs.Item>
        <Tabs.Item title="Jobs">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {!jobsList || jobsList.length === 0 ? (
                <div className="pt-4 pb-80 text-center">
                  <p className="text-lg font-senibold mb-4">
                    There are no posted jobs.
                  </p>
                  <SecondaryButton>Post a job</SecondaryButton>
                </div>
              ) : (
                jobsList.map(
                  (job) => (
                    console.log("job", job),
                    (
                      <PostedJobCard
                        key={job?.id}
                        jobTitle={job?.titre}
                        jobType={job?.type}
                        numCandidates={job?.candidature?.length}
                      />
                    )
                  )
                )
              )}
            </div>
          )}
        </Tabs.Item>
        <Tabs.Item title="Candidates">Candidates</Tabs.Item>
        <Tabs.Item title="Interviews">Interviews</Tabs.Item>
      </Tabs.Group>
    </Layout>
  );
};

export default CandidatSpace;
