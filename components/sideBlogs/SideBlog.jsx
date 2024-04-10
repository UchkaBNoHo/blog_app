import Image from "next/image";
import React from "react";

const SideBlog = (props) => {
  return (
    <div className="flex gap-4 items-center py-3 border-b sm:max-md:w-[48%]">
      <div className="relative h-[70px] min-w-[70px] rounded-[8px] overflow-hidden">
        <Image
          src={props.image}
          alt="image"
          fill
          objectFit="cover"
          className="cursor-pointer hover:scale-105 duration-300"
        />
        <div className="absolute top-0 right-0 bg-green-400 text-white py-[2px] px-[6px] rounded-[4px] text-[9px] font-normal">
          <span>new</span>
        </div>
      </div>
      <div className="">
        <h2 className="font-semibold text-[14px] cursor-pointer hover:underline hover:duration-300 max-lg:text-[12px] max-md:text-[13px]">
          {props.title}
        </h2>
        <span className="text-[13px] text-[#7b7b7b]">{props.date}</span>
      </div>
    </div>
  );
};

export default SideBlog;
