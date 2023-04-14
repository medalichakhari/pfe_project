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
import { useQuery } from "react-query";
import { GetCategories } from "../../lib/fetch";
import { useAuth } from "../../context/AuthContext";

const logoMap = {
  1: <MarketingIcon />,
  2: <DesignIcon />,
  3: <HRIcon />,
  4: <FinanceIcon />,
  5: <GovernmentIcon />,
  6: <BusinessIcon />,
  7: <CustomerIcon />,
  8: <ManagmentIcon />,
};

const CategoryList = () => {
  const { token } = useAuth();
  const { data: categories, isLoading } = useQuery(["catgories", token], () =>
    GetCategories(token)
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto my-6 sm:my-4 lg:my-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-4">
        <h2 className="text-gray-900 text-2xl font-bold">
          Our job's categories
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories?.map((category) => (
          <CategoryCard
            key={category.id}
            category={category.nom}
            logo={logoMap[category.id]}
            count={category.offres?.length || 0}
            categoryId={category.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
