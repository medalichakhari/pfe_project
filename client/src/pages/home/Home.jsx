import React from "react";
import Layout from "../../components/layout/Layout";
import Hero from "../../components/sections/Hero";
import Jobs from "../../components/sections/Jobs";
import Search from "../../components/sections/Search";
import JobCategoryCard from "../../components/category/Category";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Search />
      <Jobs />
    </Layout>
  );
};

export default Home;
