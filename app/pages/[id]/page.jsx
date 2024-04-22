import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import React, { Suspense } from "react";
import { CiClock2 } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import axios from "axios";
import Link from "next/link";
import { getUser } from "@/lib/action";
import LoveIcon from "@/components/Logic/LoveIcon";

const getData = async (slug) => {
  // console.log(slug);
  const res = await axios.get(`http://localhost:3000/api/blog/${slug}`);

  return res.data;
};

const OneBlog = async ({ params }) => {
  const slug = params.id;
  const data = await getData(slug);
  // console.log(data);

  // console.log(data.userId);
  const publisher = await getUser(data?.userId);

  const text = data.desc;

  let first = "";
  for (let i = 0; i < text.length; i++) {
    first = text[0];
  }
  const text2 = text.slice(1);

  return (
    <>
      <Suspense
        fallback={
          <div class="flex justify-center items-center h-[100vh]">
            <span className="loading loading-spinner text-warning loading-lg"></span>
          </div>
        }
      >
        <Navbar />
        <main className="max-w-[1160px] mx-auto mb-16 max-xl:px-9 max-sm:px-4">
          <div className="mt-6">
            <p className="text-[12px]">
              Home <span className="text-[12px] text-gray-500 mx-2">/</span>
              Lifestyle
              <span className="text-[12px] text-gray-500 mx-2"> /</span>
              <span className="font-semibold">{data.title}</span>
            </p>
          </div>
          <div className="max-w-[820px] mx-auto h-fit mt-20 flex flex-col items-end max-sm:mt-8">
            <div className="w-full relative aspect-[16/9] rounded-[8px] overflow-hidden">
              <Image src={data.img} alt="image" fill objectFit="cover" />
            </div>
            <div className="mt-9 w-[90%]">
              <h5 className="text-gray-400 text-[14px] italic capitalize">
                {data.category}
              </h5>
              <h1 className="font-semibold text-3xl mt-2 leading-10 max-md:text-2xl max-sm:text-[1.3rem]">
                {data.title}
              </h1>
              <div className="flex justify-between my-4">
                <div className="flex gap-10">
                  <div className="flex gap-2 items-center">
                    <CiClock2 className="text-gray-400 text-[17px]" />
                    <span className="text-gray-400 text-[14px] font-light">
                      {data.readDuration} min
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <MdOutlineRemoveRedEye className="text-[17px] text-gray-400" />
                    <span className="text-gray-400 text-[14px] font-light">
                      {data.views}
                    </span>
                  </div>
                  <Link href={`/pages/userProfile/${publisher?.email}`}>
                    <span className="underline">{publisher?.userName}</span>
                  </Link>
                </div>
                <div className="flex gap-2 items-center">
                  <LoveIcon id={data._id} />
                </div>
              </div>
              <div className="mt-8">
                <div className="px-5 h-fit inline text-5xl font-extrabold">
                  {first}
                </div>
                <p className="text-gray-600 font-normal text-[16px] leading-[1.6rem] inline max-md:text-[14px]">
                  {text2}
                </p>
              </div>
            </div>
          </div>
        </main>
      </Suspense>
    </>
  );
};

export default OneBlog;
