import React from "react";
import Layout from "../../components/layout/Layout";
import CompanyList from "../../components/sections/CompanyList";
import Search from "../../components/sections/Search";

const Companies = () => {
  return (
    <Layout>
      <Search />
      <CompanyList />
    </Layout>
  );
};

export default Companies;
