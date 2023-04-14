import React from "react";
import CandidatesTable from "../../components/candidatestable/CandidatesTable";
import Layout from "../../components/layout/Layout";

const data = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 123-456-7890",
    status: "Pending",
    pictureUrl: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 987-654-3210",
    status: "Rejected",
    pictureUrl: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 123-456-7890",
    status: "Pending",
    pictureUrl: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 987-654-3210",
    status: "Rejected",
    pictureUrl: "https://via.placeholder.com/50",
  },
  {
    id: 5,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 123-456-7890",
    status: "Pending",
    pictureUrl: "https://via.placeholder.com/50",
  },
  {
    id: 6,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 987-654-3210",
    status: "Rejected",
    pictureUrl: "https://via.placeholder.com/50",
  },
  // Add more candidates here...
];

const Candidates = () => {
  return (
    <Layout>
      <CandidatesTable data={data} />
    </Layout>
  );
};

export default Candidates;
