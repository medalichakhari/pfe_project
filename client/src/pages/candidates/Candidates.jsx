import React from "react";
import CandidatesTable from "../../components/candidatestable/CandidatesTable";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Layout from "../../components/layout/Layout";
import { GetCandidaturesByOffre } from "../../lib/fetch";
import { useAuth } from "../../context/AuthContext";

const Candidates = () => {
  const { jobId } = useParams();
  const { token } = useAuth();
  const { isLoading, data: candidatures, refetch } = useQuery(
    ["candidatures", jobId, token],
    () => GetCandidaturesByOffre(jobId, token)
  );
  console.log("data", candidatures);
  return (
    <Layout>{!isLoading && <CandidatesTable data={candidatures} refetch={refetch}/>}</Layout>
  );
};

export default Candidates;
