import React, { useState, useEffect } from "react";
import Layout from "@/layout/Layout";
import Hero from "@/sections/Hero";
import JobList from "@/sections/JobList";
import Search from "@/sections/Search";
import CategoryList from "@/sections/CategoryList";
import { GetCandidaturesByCandidat, GetOffres } from "../../lib/fetch";
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../context/AuthContext";
import { useQuery } from "react-query";
const Home = () => {
  const { token, user } = useAuth();
  const { candidate, company } = useUser();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  // const [recommendedJobs, setRecommendedJobs] = useState([]);
  const { data, isLoading } = useQuery(
    ["candidatures", token],
    () => GetCandidaturesByCandidat(candidate?.id, token),
    {
      enabled: !!candidate?.id,
    }
  );

  const filterJobs = (jobs) => {
    if (!user) return jobs;

    const { roles } = user;
    const isRecruiter = roles?.includes("recruteur");
    const isCandidate = roles?.includes("candidat");

    return jobs.filter((job) => {
      if (isRecruiter && isCandidate) {
        return (
          job.societe?.id !== company?.id &&
          !data?.some((candidature) => candidature?.offreId === job?.id)
        );
      } else if (isRecruiter) {
        return job?.societe?.id !== company?.id;
      } else if (isCandidate) {
        return !data?.some((candidature) => candidature?.offreId === job?.id);
      }
      return true;
    });
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoadingJobs(true);
        const res = await GetOffres();
        const updatedJobs = filterJobs(res);
        setFilteredJobs(updatedJobs);
        setIsLoadingJobs(false);
      } catch (err) {
        console.log(err);
        setIsLoadingJobs(false);
      }
    };

    if (!isLoading) {
      fetchJobs();
    }
  }, [company, candidate, data, user]);

  return (
    <Layout>
      <Hero />
      <Search filteredJobs={filteredJobs} setFilteredJobs={setFilteredJobs} />
      <JobList isLoadingJobs={isLoadingJobs} filteredJobs={filteredJobs} />
      <CategoryList />
      {/* {candidate && <RecommendedJobs recommendedJobs={recommendedJobs} />} */}
    </Layout>
  );
};

export default Home;
