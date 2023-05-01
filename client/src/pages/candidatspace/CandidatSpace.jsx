import React from "react";
import Layout from "../../components/layout/Layout";
import { Tabs } from "flowbite-react";
import AppliedJobs from "../../components/appliedjobs/AppliedJobs";
import { GetCandidaturesByCandidat } from "../../lib/fetch";
import { useUser } from "../../context/UserContext";
import { useQuery } from "react-query";
import { useAuth } from "../../context/AuthContext";

const CandidatSpace = () => {
  const { token } = useAuth();
  const { candidate } = useUser();
  const {
    isLoading,
    data: candidatures,
    refetch,
  } = useQuery(["candidatures", candidate?.id, token], () =>
    GetCandidaturesByCandidat(candidate?.id, token)
  );
  return (
    <Layout>
      <h1 className="text-4xl font-bold ml-3 mt-8">Candidat Space</h1>
      <Tabs.Group style="underline">
        <Tabs.Item title="Profile">
          Profile content
        </Tabs.Item>
        <Tabs.Item title="Applications" active={true}>
          {!isLoading && candidatures && (
            <AppliedJobs data={candidatures} refetch={refetch} />
          )}
        </Tabs.Item>
        <Tabs.Item title="Accepted">Accepted</Tabs.Item>
        <Tabs.Item title="Refused">Refused</Tabs.Item>
      </Tabs.Group>
    </Layout>
  );
};

export default CandidatSpace;
