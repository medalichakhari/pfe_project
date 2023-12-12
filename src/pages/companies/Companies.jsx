import React from "react";
import Layout from "@/layout/Layout";
import CompanyList from "@/sections/CompanyList";
import Search from "@/sections/Search";

const Companies = () => {
  return (
    <Layout>
      <Search />
      <CompanyList />
    </Layout>
  );
};

export default Companies;
