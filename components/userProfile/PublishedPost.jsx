import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { format } from "date-fns";

const PublishedPost = (props) => {
  const words = props.desc.split(" ");

  // Get the first 25 words
  const first = words.slice(0, 15).join(" ");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd - MMM");
  };

  // const originalDateString = "2024-04-20T12:20:47.670+00:00";
  const formattedDate = formatDate(props.post.createdAt);
  return (
    <div className="pb-10 w-[48%]">
      <div className="w-full aspect-[16/10] relative overflow-hidden rounded-[9px]">
        <Image src={props.image} alt="" fill objectFit="cover" />
      </div>
      <div className="mt-5">
        <Link
          href={`/pages/${props.post.slug}`}
          className="text-[1.4rem] font-semibold w-[90%] capitalize cursor-pointer hover:underline hover:duration-300"
        >
          {props.title}
        </Link>
        <div className="flex gap-4 mt-4 items-center">
          <span className="text-[12px] text-gray-500 font-light">
            {formattedDate}
          </span>
          <span className="text-[12px] text-gray-500 font-light">|</span>
          <div className="flex gap-2 items-center">
            <MdOutlineRemoveRedEye className="text-[12px] text-gray-500" />
            <span className="text-[12px] text-gray-500 font-light">
              {props.post.views}
            </span>
          </div>
        </div>
        <p className="mt-4 text-[14px] text-gray-600 leading-6 font-light">
          {first}
        </p>
      </div>
    </div>
  );
};

export default PublishedPost;
