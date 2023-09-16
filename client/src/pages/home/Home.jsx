import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Hero from "../../components/sections/Hero";
import JobList from "../../components/sections/JobList";
import Search from "../../components/sections/Search";
import CategoryList from "../../components/sections/CategoryList";
import { GetOffres, GetRecommendedJobs } from "../../lib/fetch";
import { useUser } from "../../context/UserContext";
import RecommendedJobs from "../../components/sections/RecommendedJobs";

const Home = () => {
  const { candidate, company } = useUser();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);

  // useEffect(() => {
  //   const candidateData = {
  //     niveau: candidate?.niveau,
  //     specialite: candidate?.specialite,
  //     competences: candidate?.competences,
  //     experience: candidate?.experience,
  //     cv: candidate?.cv,
  //   };

  //   const fetchRecommendedJobs = async () => {
  //     try {
  //       const res = await GetRecommendedJobs(candidateData);
  //       const filteredRecommendedJobs = res.data.filter(
  //         (recommendedJob) => recommendedJob.societe.id !== company?.id
  //       );
  //       setRecommendedJobs(filteredRecommendedJobs);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   if (candidate) {
  //     fetchRecommendedJobs();
  //   }
  // }, [candidate]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await GetOffres();
        const filteredJobs = res.filter(
          (job) => job.societe.id !== company?.id
        );
        setFilteredJobs(filteredJobs);
        setAllJobs(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchJobs();
  }, [company]);

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
