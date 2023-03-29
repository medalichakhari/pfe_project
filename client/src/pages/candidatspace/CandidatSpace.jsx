import React from "react";
import Layout from "../../components/layout/Layout";
import { Tabs } from "flowbite-react";

const CandidatSpace = () => {
  return (
    <Layout>
      <h1 className="text-4xl font-bold ml-3 mt-8">Candidat Space</h1>
      <Tabs.Group style="underline">
      <Tabs.Item title="Profile" active={true}>Profile content</Tabs.Item>
      <Tabs.Item title="Applications">Applications</Tabs.Item>
      <Tabs.Item title="Accepted">Accepted</Tabs.Item>
      <Tabs.Item title="Refused">Refused</Tabs.Item>
    </Tabs.Group>
    </Layout>
  );
};

export default CandidatSpace;
