import React from "react";
import Views from "../Logic/Views";
import Image from "next/image";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { format } from "date-fns";

const OneCategory = (props) => {
  const words = props.desc.split(" ");
  // console.log(props.post.img);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd - MMM");
  };

  // const originalDateString = "2024-04-20T12:20:47.670+00:00";
  const formattedDate = formatDate(props.post.createdAt);

  // Get the first 25 words
  const first25Words = words.slice(0, 16).join(" ");
  return (
    <div className="flex h-[280px] py-4 gap-9 border-b-[1px] max-lg:flex-col max-lg:h-fit max-lg:gap-4 max-lg:py-6">
      <div className="w-[35%] h-[100%] rounded-[8px] relative overflow-hidden max-lg:w-full max-lg:h-[280px] max-md:h-[300px]">
        <Image
          src={props.image}
          alt={props.post.slug}
          fill
          objectFit="cover"
          className="cursor-pointer hover:scale-105 duration-300"
        />
      </div>
      <div className="flex-1">
        <h4 className="text-[#8d8d8d] text-[12px] font-light tracking-[0.6px] mb-3">
          {formattedDate}
        </h4>
        <Views post={props.post} title={props.title} />
        <hr className="mt-3 max-w-16" />
        <p className="mt-4 text-[14px] text-gray-600 leading-6 font-normal">
          {first25Words}
        </p>
        <div className="flex gap-10 mt-4">
          <div className="flex gap-2 items-center">
            <MdOutlineRemoveRedEye className="text-xl text-gray-600" />
            <span>{props.post.views}</span>
          </div>
          <div className="flex gap-2 items-center">
            <FaHeart className="text-[1rem] text-gray-600 cursor-pointer hover:text-black" />
            <span>{props.post.loved.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneCategory;
