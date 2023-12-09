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
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../shared/LoadingSpinner";

const CategoryList = () => {
  const { t } = useTranslation();
  const categoriesInfo = [
    {
      id: 1,
      categoryName: t("categoryList.marketing"),
      logo: <MarketingIcon />,
    },
    { id: 2, categoryName: t("categoryList.design"), logo: <DesignIcon /> },
    { id: 3, categoryName: t("categoryList.hr"), logo: <HRIcon /> },
    { id: 4, categoryName: t("categoryList.finance"), logo: <FinanceIcon /> },
    {
      id: 5,
      categoryName: t("categoryList.government"),
      logo: <GovernmentIcon />,
    },
    { id: 6, categoryName: t("categoryList.business"), logo: <BusinessIcon /> },
    { id: 7, categoryName: t("categoryList.customer"), logo: <CustomerIcon /> },
    {
      id: 8,
      categoryName: t("categoryList.managment"),
      logo: <ManagmentIcon />,
    },
  ];
  const { token } = useAuth();
  const { data: categories, isLoading } = useQuery(["catgories", token], () =>
    GetCategories(token)
  );
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="container mx-auto my-6 sm:my-4 lg:my-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-4">
        <h2 className="text-gray-900 text-2xl font-bold">{t("categoryList.browseCategory")}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories?.map((category) => (
          <CategoryCard
            key={category.id}
            category={categoriesInfo[category.id - 1].categoryName}
            logo={categoriesInfo[category.id - 1].logo}
            count={category.offres?.length || 0}
            categoryId={category.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
