"use client";

import Navbar from "@/components/navbar/Navbar";
import PublishedPosts from "@/components/userProfile/PublishedPosts";
import UserInfo from "@/components/userProfile/UserInfo";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const UserProfile = () => {
  const params = useParams();
  console.log(params.id);

  const { pageLoading, userPosts } = useAuthContext();

  return (
    <>
      {pageLoading === true ? (
        <div class="bigContainer flex justify-center items-center h-[100vh]">
          <Image src="/loader.gif" alt="loader" width={500} height={500} />
        </div>
      ) : (
        <>
          <Navbar />
          <main className="max-w-[1160px] mx-auto max-xl:px-9 flex justify-between">
            <PublishedPosts />
            <UserInfo publisherEmail={params.id} userPosts={userPosts} />
          </main>
        </>
      )}
    </>
  );
};

export default UserProfile;
