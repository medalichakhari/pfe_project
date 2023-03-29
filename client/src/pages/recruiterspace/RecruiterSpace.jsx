import React from "react";
import Layout from "../../components/layout/Layout";
import { Tabs } from "flowbite-react";

const CandidatSpace = () => {
  return (
    <Layout>
      <h1 className="text-4xl font-bold ml-3 mt-8">Recruiter Space</h1>
      <Tabs.Group style="underline">
        <Tabs.Item title="Profile" active={true}>
          Profile content
        </Tabs.Item>
        <Tabs.Item title="Jobs">Jobs</Tabs.Item>
        <Tabs.Item title="Candidates">Candidates</Tabs.Item>
        <Tabs.Item title="Interviews">Interviews</Tabs.Item>
      </Tabs.Group>
    </Layout>
  );
};

export default CandidatSpace;
