"use client";

import React from "react";

const Category = (props) => {
  return (
    <div
      className={
        props.category === "All"
          ? `py-2 px-4 bg-black text-white duration-200 rounded-[24px] hover:bg-[#424242] cursor-pointer max-md:py-1 max-md:px-3`
          : `py-2 px-4 bg-[#F8F8F8] duration-200 text-black rounded-[24px] hover:bg-[#dcdcdc] cursor-pointer max-md:py-1 max-md:px-3`
      }
    >
      <h4 className="text-[14px] max-md:text-[12px]">{props.category}</h4>
    </div>
  );
};

export default Category;
