import React from "react";
import Layout from "../../components/layout/Layout";
import Hero from "../../components/sections/Hero";
import JobCard from "../../components/jobcard/JobCard";
import Search from "../../components/sections/Search";
import JobCategoryCard from "../../components/category/Category";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Search />
      <JobCard />
      <JobCategoryCard />
    </Layout>
  );
};

export default Home;
