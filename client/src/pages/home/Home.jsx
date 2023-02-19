import React from "react";
import Layout from "../../components/layout/Layout";
import Hero from "../../components/sections/Hero";
import Search from "../../components/sections/Search";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Search />
    </Layout>
  );
};

export default Home;
