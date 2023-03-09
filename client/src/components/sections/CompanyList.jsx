import React from "react";
import CustomerIcon from "../../assets/svg/CustomerIcon";
import BusinessIcon from "../../assets/svg/BusinessIcon";
import FinanceIcon from "../../assets/svg/FinanceIcon";
import HRIcon from "../../assets/svg/HRIcon";
import DesignIcon from "../../assets/svg/DesignIcon";
import MarketingIcon from "../../assets/svg/MarketingIcon";
import CategoryCard from "../categorycard/CategoryCard";
import GovernmentIcon from "../../assets/svg/Government";
import ManagmentIcon from "../../assets/svg/ManagmentIcon";
import CompanyCard from "../companycard/CompanyCard";

const comapanies = [
  {
    id: 1,
    name: "Technology",
    logo: <MarketingIcon />,
    location: "New York",
    count: 25,
  },
  {
    id: 2,
    name: "Finance",
    logo: <DesignIcon />,
    location: "New York",
    count: 15,
  },
  {
    id: 3,
    name: "Retail",
    logo: <HRIcon />,
    location: "New York",
    count: 10,
  },
  {
    id: 4,
    name: "Retail",
    logo: <FinanceIcon />,
    location: "New York",
    count: 10,
  },
  {
    id: 5,
    name: "Retail",
    logo: <GovernmentIcon />,
    location: "New York",
    count: 10,
  },
  {
    id: 6,
    name: "Retail",
    logo: <BusinessIcon />,
    location: "New York",
    count: 10,
  },
  {
    id: 7,
    name: "Retail",
    logo: <CustomerIcon />,
    location: "New York",
    count: 10,
  },
  {
    id: 8,
    name: "Retail",
    logo: <ManagmentIcon />,
    location: "New York",
    count: 10,
  },
];

const CompanyList = () => {
  return (
    <div className="container mx-auto my-6 sm:my-4 lg:my-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-4">
        <h2 className="text-gray-900 text-2xl font-bold">
          Our comapanies
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {comapanies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
