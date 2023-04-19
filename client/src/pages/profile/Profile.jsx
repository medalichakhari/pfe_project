import React from "react";
import UserInfo from "../../components/userform/userInfo";
import Layout from "../../components/layout/Layout";
import CandidatInfo from "../../components/candidatinfo/CandidatInfo";
import CompanyInfo from "../../components/companyform/CompanyInfo";

const Profile = () => {
  return (
    <Layout>
      <div className="my-6 flex justify-center items-center bg-gray-50">
        <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <UserInfo />
          <CandidatInfo />
          <CompanyInfo />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
