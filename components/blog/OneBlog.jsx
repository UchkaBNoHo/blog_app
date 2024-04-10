import Image from "next/image";
import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
const OneBlog = (props) => {
  const words = props.desc.split(" ");

  // Get the first 25 words
  const first25Words = words.slice(0, 25).join(" ");
  return (
    <div className="flex h-[280px] py-4 gap-9 border-b-[1px] max-lg:flex-col max-lg:h-fit max-lg:gap-4 max-lg:py-6">
      <div className="w-[35%] h-[100%] rounded-[8px] relative overflow-hidden max-lg:w-full max-lg:h-[280px] max-md:h-[300px]">
        <Image
          src={props.image}
          alt="image"
          fill
          objectFit="cover"
          className="cursor-pointer hover:scale-105 duration-300"
        />
      </div>
      <div className="py-4 flex-1">
        <h4 className="text-[#8d8d8d] text-[12px] font-light tracking-[0.6px] mb-3">
          {props.date}
        </h4>
        <Link
          href={`/pages/${props.post.slug}`}
          className="text-[1.4rem] font-semibold w-[90%] capitalize cursor-pointer hover:underline hover:duration-300"
        >
          {props.title}
        </Link>
        <hr className="mt-3 max-w-16" />
        <p className="mt-4 text-[14px] text-gray-600 leading-6 font-normal">
          {first25Words}
        </p>
        <div className="flex gap-10 mt-4">
          <div className="flex gap-2 items-center">
            <MdOutlineRemoveRedEye className="text-xl text-gray-600" />
            <span>0</span>
          </div>
          <div className="flex gap-2 items-center">
            <FaHeart className="text-[1rem] text-gray-600 cursor-pointer hover:text-black" />
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneBlog;
