import React from "react";
import Layout from "../../components/layout/Layout";
import Hero from "../../components/sections/Hero";
import Jobs from "../../components/sections/Jobs";
import Search from "../../components/sections/Search";
import CategoryList from "../../components/sections/CategoryList";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Search />
      <Jobs />
      <CategoryList />
    </Layout>
  );
};

export default Home;
