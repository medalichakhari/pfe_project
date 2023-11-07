import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Hero from "../../components/sections/Hero";
import JobList from "../../components/sections/JobList";
import Search from "../../components/sections/Search";
import CategoryList from "../../components/sections/CategoryList";
import { GetCandidaturesByCandidat, GetOffres } from "../../lib/fetch";
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../context/AuthContext";
import { useQuery } from "react-query";

const Home = () => {
  const { token, user } = useAuth();
  const { candidate, company } = useUser();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);

  const { data } = useQuery(["candidatures", token], () =>
    GetCandidaturesByCandidat(candidate?.id, token)
  );

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await GetOffres();
        console.log(res);
        let filteredJobs;
        if (user?.roles.includes("candidate")) {
          filteredJobs = res.filter(
            (job) =>
              job.societe.id !== user?.companyId &&
              !data?.some((candidature) => candidature?.offreId === job?.id)
          );
        } else {
          filteredJobs = res.filter(
            (job) => job.societe.id !== user?.companyId
          );
        }

        setFilteredJobs(filteredJobs);
        setAllJobs(res);
      } catch (err) {
        console.log(err);
      }
    };

    if (data) {
      fetchJobs();
    }
  }, [company, data]);

  return (
    <Layout>
      <Hero />
      <Search allJobs={allJobs} setFilteredJobs={setFilteredJobs} />
      <JobList filteredJobs={filteredJobs} />
      <CategoryList />
      {/* {candidate && <RecommendedJobs recommendedJobs={recommendedJobs} />} */}
    </Layout>
  );
};

export default Home;
