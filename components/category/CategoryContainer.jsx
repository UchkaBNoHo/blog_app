import React from "react";
import Category from "./Category";

const CategoryContainer = () => {
  return (
    <div className="flex gap-5 mt-4 overflow-hidden max-md:gap-2 max-md:mt-5">
      <Category category="All" />
      <Category category="Travel" />
      <Category category="Technology" />
      <Category category="Health" />
      <Category category="Humanity" />
      <Category category="Coding" />
      <Category category="Fashion" />
    </div>
  );
};

export default CategoryContainer;
