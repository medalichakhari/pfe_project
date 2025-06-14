import React from "react";
import UserInfo from "@/userform/userInfo";
import Layout from "@/layout/Layout";
import CandidatInfo from "@/candidatinfo/CandidatInfo";
import CompanyInfo from "@/companyform/CompanyInfo";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  return (
    <Layout>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <UserInfo />
          {user.roles.includes("candidat") && <CandidatInfo />}
          {user.roles.includes("recruteur") && <CompanyInfo />}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
