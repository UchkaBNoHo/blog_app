"use client";

import withAuthRedirect from "@/HOC/withAuthRedirect";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log(res);
      if (!res.error) {
        setLoading(false);
        console.log("successful login");
        router.replace("/");
      } else {
        setLoading(false);
        throw new Error(res.error);
      }
    } catch (error) {
      setLoading(false);
      console.log("aldaa", error);
    }
  };
  return (
    <div className="h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="p-3 max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 rounded-[36px] overflow-hidden">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-4 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Welcome my friend
            </h1>
            <div className="flex items-center flex-col w-full mt-8 text-center">
              <div className="flex flex-col items-center p-3 rounded-full bg-slate-100 w-fit">
                <FcGoogle className="text-2xl" />
              </div>

              <div className="mt-5 mb-6 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or
                </div>
              </div>

              <div className="mx-auto max-w-xs">
                <form onSubmit={handleLogin}>
                  <input
                    className="w-full px-6 py-3 rounded-[32px] font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 placeholder:font-normal text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="w-full px-6 py-3 rounded-[32px] font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none placeholder:font-normal focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-3 rounded-[32px] hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    {loading === true ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <span className="text-[14px] font-semibold">Start</span>
                    )}
                  </button>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Don&apos;t have an account?
                    <Link
                      href="/pages/register"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Register
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex-1 w-full rounded-[4px] overflow-hidden">
          <Image src="/loginImage.jpg" alt="" fill objectFit="cover" />
        </div>
      </div>
    </div>
  );
};

export default withAuthRedirect(LoginPage);
