import React from "react";
import CategoryCard from "../category/Category";

const categories = [
  {
    id: 1,
    name: "Technology",
    logo: "https://via.placeholder.com/100x100.png?text=Tech",
    count: 25,
  },
  {
    id: 2,
    name: "Finance",
    logo: "https://via.placeholder.com/100x100.png?text=Finance",
    count: 15,
  },
  {
    id: 3,
    name: "Retail",
    logo: "https://via.placeholder.com/100x100.png?text=Retail",
    count: 10,
  },
  {
    id: 4,
    name: "Retail",
    logo: "https://via.placeholder.com/100x100.png?text=Retail",
    count: 10,
  },
  {
    id: 5,
    name: "Retail",
    logo: "https://via.placeholder.com/100x100.png?text=Retail",
    count: 10,
  },
  {
    id: 6,
    name: "Retail",
    logo: "https://via.placeholder.com/100x100.png?text=Retail",
    count: 10,
  },
];

const CategoryList = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category.name}
            logo={category.logo}
            count={category.count}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;