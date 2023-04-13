import React from "react";

function Profile({ user, candidateInfo, companyInfo }) {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-xl font-medium text-gray-800">User Info</h2>
        <div className="mt-4 flex items-center">
          <img
            className="h-12 w-12 rounded-full object-cover mr-4"
            src={user.photo}
            alt={user.displayName}
          />
          <div>
            <p className="text-lg font-medium text-gray-900">
              {user.displayName}
            </p>
            <p className="text-sm font-medium text-gray-500">
              {user.birthdate}, {user.gender}
            </p>
            <p className="text-sm font-medium text-gray-500">
              {user.phoneNumber}
            </p>
            <p className="text-sm font-medium text-gray-500">{user.address}</p>
          </div>
        </div>
      </div>

      {candidateInfo && (
        <div className="mb-8">
          <h2 className="text-xl font-medium text-gray-800">Candidate Info</h2>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-500">
              Grade: {candidateInfo.grade}
            </p>
            <p className="text-sm font-medium text-gray-500">
              Employment Status: {candidateInfo.employmentStatus}
            </p>
            <p className="text-sm font-medium text-gray-500">
              Skills: {candidateInfo.skills.join(", ")}
            </p>
            <p className="text-sm font-medium text-gray-500">
              <a href={candidateInfo.cv} target="_blank" rel="noreferrer">
                Download CV
              </a>
            </p>
          </div>
        </div>
      )}

      {companyInfo && (
        <div>
          <h2 className="text-xl font-medium text-gray-800">Company Info</h2>
          <div className="mt-4 flex items-center">
            <img
              className="h-12 w-12 rounded-full object-cover mr-4"
              src={companyInfo.logo}
              alt={companyInfo.name}
            />
            <div>
              <p className="text-lg font-medium text-gray-900">
                {companyInfo.name}
              </p>
              <p className="text-sm font-medium text-gray-500">
                {companyInfo.address}
              </p>
              <p className="text-sm font-medium text-gray-500">
                Activity Area: {companyInfo.activityArea}
              </p>
              <p className="text-sm font-medium text-gray-500">
                {companyInfo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
