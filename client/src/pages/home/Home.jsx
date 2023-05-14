import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Hero from "../../components/sections/Hero";
import JobList from "../../components/sections/JobList";
import Search from "../../components/sections/Search";
import CategoryList from "../../components/sections/CategoryList";
import { useQuery } from "react-query";
import { GetOffres } from "../../lib/fetch";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";

const Home = () => {
  const { token } = useAuth();
  const { company } = useUser();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const { data: jobs, isLoading } = useQuery(["jobs", token], () =>
    GetOffres(token)
  );
  console.log("jobs", jobs);
  useEffect(() => {
    if (!isLoading && jobs) {
      const filteredJobs = jobs.filter((job) => job.societe.id !== company?.id);
      setFilteredJobs(filteredJobs);
    }
  }, [isLoading, jobs, company?.id]);

  return (
    <Layout>
      <Hero />
      <Search clarifiedJobs={filteredJobs} setFilteredJobs={setFilteredJobs} />
      <JobList filteredJobs={filteredJobs} />
      <CategoryList />
    </Layout>
  );
};

export default Home;
