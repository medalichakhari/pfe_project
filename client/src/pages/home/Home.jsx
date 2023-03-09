import React from "react";
import Layout from "../../components/layout/Layout";
import Hero from "../../components/sections/Hero";
import JobList from "../../components/sections/JobList";
import Search from "../../components/sections/Search";
import CategoryList from "../../components/sections/CategoryList";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Search />
      <JobList />
      <CategoryList />
    </Layout>
  );
};

export default Home;
