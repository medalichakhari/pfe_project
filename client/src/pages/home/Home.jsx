import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Hero from "../../components/sections/Hero";
import JobList from "../../components/sections/JobList";
import Search from "../../components/sections/Search";
import CategoryList from "../../components/sections/CategoryList";
import { useQuery } from "react-query";
import { GetOffres } from "../../lib/fetch";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const { token } = useAuth();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const { data: jobs, isLoading } = useQuery(["jobs", token], () =>
    GetOffres(token)
  );

  useEffect(() => {
    if (!isLoading && jobs) {
      setFilteredJobs(jobs);
    }
  }, [isLoading, jobs]);

  return (
    <Layout>
      <Hero />
      <Search jobs={jobs} setFilteredJobs={setFilteredJobs} />
      <JobList filteredJobs={filteredJobs} isLoading={isLoading} />
      <CategoryList />
    </Layout>
  );
};

export default Home;
