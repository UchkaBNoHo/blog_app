import Image from "next/image";
import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const BiggerSideBlog = () => {
  return (
    <div className="border-b-[1px] pb-5">
      <div className="w-full aspect-[16/10] relative overflow-hidden rounded-[9px]">
        <Image src="/blog1.jpg" alt="" fill objectFit="cover" />
      </div>
      <div className="mt-5">
        <h2 className="text-[18px] font-medium">Tasty & Easy To Make Desserts With Blueberries</h2>
        <div className="flex gap-4 mt-4 items-center">
          <span className="text-[12px] text-gray-500 font-light">
            July 17, 2022
          </span>
          <span className="text-[12px] text-gray-500 font-light">|</span>
          <div className="flex gap-2 items-center">
            <MdOutlineRemoveRedEye className="text-[12px] text-gray-500" />
            <span className="text-[12px] text-gray-500 font-light">0</span>
          </div>
        </div>
        <p className="mt-4 text-[14px] text-gray-600 leading-6 font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam laoreet,
          nunc et accumsan cursus, neque eros sodales lectus, in fermentum
          libero dui eu lacus.
        </p>
      </div>
    </div>
  );
};

export default BiggerSideBlog;
