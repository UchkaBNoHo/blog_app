"use client";

import React, { useEffect, useState } from "react";
import PublishedPost from "./PublishedPost";
import { useParams } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

const PublishedPosts = () => {
  const { id } = useParams();
  // console.log(id);
  const { userPosts, setUserPosts } = useAuthContext();

  useEffect(() => {
    const AllUserPosts = async () => {
      const response = await fetch(
        `http://localhost:3000/api/blog/allUserPosts/${id}`
      );
      const data = await response.json();
      // console.log(data);

      if (response.error) {
        // console.log(response);
        console.log("ERROR GET USER");
      }
      setUserPosts(data);
    };
    AllUserPosts();
  }, [id, setUserPosts]);
  return (
    <div className="gap-3 flex-col w-[60%] mt-[2rem] max-md:w-full">
      <div className="">
        <h3 className="font-semibold uppercase tracking-[2px] mb-3">
          Blogs Published
        </h3>
        <hr className="w-full" />
      </div>
      <div className="h-fit flex flex-wrap justify-between">
        {userPosts.length === 0 && (
          <div className="w-full py-3 bg-gray-100 rounded-[28px] mt-4">
            <div className="text-center">No Posts Published yet</div>
          </div>
        )}
        {userPosts &&
          userPosts.map((d) => (
            <PublishedPost
              key={d._id}
              image={d.img}
              date="2 FEBRUARY"
              title={d.title}
              desc={d.desc}
              post={d}
            />
          ))}
      </div>
    </div>
  );
};

export default PublishedPosts;
