"use client";

import { useAuthContext } from "@/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const Views = ({ post, title }) => {
  const router = useRouter();
  const { user } = useAuthContext();
  // handleView
  const handleView = async (postId) => {
    const response = await axios.post(
      `http://localhost:3000/api/viewLogic/${postId}`,
      {
        userId: user?._id,
      }
    );
    console.log(response);
    router.refresh();
  };
  return (
    <Link
      href={`/pages/${post.slug}`}
      className="text-[1.4rem] font-semibold w-[90%] capitalize cursor-pointer hover:underline hover:duration-300"
      onClick={() => handleView(post._id)}
    >
      {title}
    </Link>
  );
};

export default Views;
