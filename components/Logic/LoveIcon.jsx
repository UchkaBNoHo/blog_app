"use client";

import { handleLoved } from "@/lib/action";
import axios from "axios";
import React from "react";
import { FaHeart } from "react-icons/fa";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

const LoveIcon = ({ id }) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const handle = async (postId) => {
    // console.log(postId);
    // console.log(userId);
    const response = await axios.post(
      `http://localhost:3000/api/love/${postId}`,
      {
        userId: user?._id,
      }
    );
    if (response.status === 200) {
      toast.success(response.data);
      router.refresh();
    }
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <FaHeart
        className="text-[1rem] text-gray-600 cursor-pointer hover:text-black"
        onClick={() => handle(id)}
      />
    </>
  );
};

export default LoveIcon;
