"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { parseISO, format, isValid } from "date-fns";

const UserInfo = ({ publisherEmail, userPosts }) => {
  const [userData, setUserData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/user/${publisherEmail}`
        );
        console.log(res);
        setUserData(res.data);
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    getData();
  }, [publisherEmail]);

  // Date
  const dateString = userData.createdAt ? userData.createdAt : "";

  // Format the dateObject into a string
  let formattedDate = "";

  if (dateString) {
    const dateObject = parseISO(dateString);

    if (isValid(dateObject)) {
      formattedDate = format(dateObject, "yyyy-MM-dd");
    } else {
      console.error("Invalid date string:", dateString);
    }
  } else {
    console.warn("User creation date not available.");
  }

  return (
    <div className="flex flex-col items-center mt-[2rem] w-[30%]">
      <div className=" border-b-[1px] pb-3 w-full flex flex-col items-center">
        <div className="w-[70px] aspect-[1/1] rounded-full bg-black relative overflow-hidden mt-[2rem]">
          <Image src={userData.img} alt="profile" fill objectFit="cover" />
        </div>
        <h3 className="text-[21px] font-medium mt-4">{userData.userName}</h3>
        <p className="text-[14px] text-gray-500 mt-2">
          {userPosts.length} blogs published
        </p>
        <div className="pt-6 text-[16px]">
          <p>Joined on {formattedDate}</p>
        </div>
      </div>
      <p className="italic text-gray-500 mt-3 text-center text-[15px]">
        John Smith is a results-driven digital marketing strategist with over a
        decade of experience. Specializing in SEO, PPC, and social media
        marketing, John has a proven track record of delivering measurable
        results for diverse clientele. Known for his analytical approach and
        passion for staying ahead of trends, he is a trusted advisor in the
        industry.
      </p>
      <label htmlFor="profile" className="">
        Open modal
      </label>

      <input type="checkbox" id="profile" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Update Profile
            </h3>
          </div>
          <form action="#">
            <div class="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  UserName
                </label>
                <input
                  type="text"
                  name="username"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder:italic"
                  placeholder="Ex. Apple iMac 27&ldquo;"
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-90"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder:italic"
                  placeholder="Ex. Apple"
                />
              </div>
              <div class="sm:col-span-2">
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Bio
                </label>
                <textarea
                  id="description"
                  rows="5"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 placeholder:italic"
                  placeholder="Write bio here..."
                ></textarea>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <button
                type="submit"
                class="py-[8px] px-[20px] bg-black text-white text-[14px] font-normal rounded-[24px] duration-200 hover:bg-[#424242] max-sm:py-1 max-sm:px-3 max-sm:text-[13px]"
              >
                Update
              </button>
            </div>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="profile">
          Close
        </label>
      </div>
    </div>
  );
};

export default UserInfo;
