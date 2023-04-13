import React from "react";
import { FaUser } from "react-icons/fa";

function Profile({ userInfo }) {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-xl font-medium text-gray-800">User Info</h2>
        <div className="mt-4 flex items-center">
          {userInfo?.photo === null ? (
            <FaUser className="text-primary h-12 w-12 rounded-full object-cover mr-4" />
          ) : (
            <img
              className="h-12 w-12 rounded-full object-cover mr-4"
              src={userInfo?.photo}
              alt={userInfo?.nom}
            />
          )}

          <div>
            <p className="text-lg font-medium text-gray-900">
              {userInfo?.nom} {userInfo?.prenom}
            </p>
            <p className="text-sm font-medium text-gray-500">
              {userInfo?.dNaissance}, {userInfo?.genre}
            </p>
            <p className="text-sm font-medium text-gray-500">
              {userInfo?.phoneNumber}
            </p>
            <p className="text-sm font-medium text-gray-500">
              {userInfo?.address}
            </p>
          </div>
        </div>
      </div>

      {userInfo && (
        <div className="mb-8">
          <h2 className="text-xl font-medium text-gray-800">Candidate Info</h2>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-500">Grade: Bac =21</p>
            <p className="text-sm font-medium text-gray-500">
              Employment Status: Unemployed
            </p>
            <p className="text-sm font-medium text-gray-500">
              {/* Skills: {candidateInfo.skills.join(", ")} */}
              Skills: ReactJs, finejaavaa, pythonbaga
            </p>
            <p className="text-sm font-medium text-gray-500">
              <a
                href="https://www.clickdimensions.com/links/TestPDFfile.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Download CV
              </a>
            </p>
          </div>
        </div>
      )}

      {userInfo?.societe && (
        <div>
          <h2 className="text-xl font-medium text-gray-800">Company Info</h2>
          <div className="mt-4 flex items-center">
            <img
              className="h-12 w-12 rounded-full object-cover mr-4"
              src={userInfo?.societe?.logo}
              alt={userInfo?.societe?.nom}
            />
            <div>
              <p className="text-lg font-medium text-gray-900">
                {userInfo?.societe?.name}
              </p>
              <p className="text-sm font-medium text-gray-500">
                {userInfo?.societe?.address}
              </p>
              <p className="text-sm font-medium text-gray-500">
                Activity Area: Wlh ma na3ref
              </p>
              <p className="text-sm font-medium text-gray-500">
                {userInfo?.societe?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
