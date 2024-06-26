"use client";

import Link from "next/link";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TfiWrite } from "react-icons/tfi";
import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const { user, setSearchValue } = useAuthContext();
  // console.log(user);

  const isAdmin = true;

  const handleLogout = async () => {
    setLoading(true);
    await signOut({ redirect: false });
    setLoading(false);
    router.push("/pages/login");
  };
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search);
    // setSearchValue(search);
  };
  return (
    <section className="w-full py-3 max-xl:px-9 max-w-[500px]:bg-sky-300 max-sm:px-4">
      <div className="max-w-[1160px] mx-auto h-full flex justify-between items-center cursor-pointer">
        <form
          action=""
          className="flex gap-2 bg-[#F8F8F8] w-fit px-3 py-2 rounded-[24px] hover:bg-gray-200 duration-200"
        >
          <label htmlFor="my_modal_7" className="">
            <CiSearch className="text-2xl cursor-pointer " />
          </label>

          <input type="checkbox" id="my_modal_7" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <input
                type="text"
                className="bg-transparent border-none outline-none placeholder:text-[14px] w-[10rem] placeholder:text-[#646464]"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" onClick={() => handleSearch()}>
                Search
              </button>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_7">
              Close
            </label>
          </div>
        </form>
        {user ? (
          <div className="flex gap-6 items-center">
            {isAdmin === true && (
              <Link href="/pages/createBlog">
                <div className="p-4 hover:bg-slate-200 rounded-full duration-200">
                  <TfiWrite className="text-xl cursor-pointer text-gray-600 hover:text-black" />
                </div>
              </Link>
            )}
            <button
              className="py-[8px] px-[20px] bg-black text-white text-[14px] font-normal rounded-[24px] duration-200 hover:bg-[#424242] max-sm:py-1 max-sm:px-3 max-sm:text-[13px]"
              onClick={handleLogout}
            >
              {loading === true ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <span>Logout</span>
              )}
            </button>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button">
                <div className="p-[6px] hover:bg-slate-200 rounded-full duration-200">
                  <div className="w-10 h-10 rounded-full relative overflow-hidden">
                    <div className="avatar">
                      <div className="w-12 relative">
                        <Image src={user.img} alt="" fill objectFit="cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href={`/pages/userProfile/${user.email}`}>Profile</Link>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              href="/pages/register"
              className="py-[8px] px-[20px] bg-black text-white text-[14px] font-normal rounded-[24px] duration-200 hover:bg-[#424242] max-sm:py-1 max-sm:px-3 max-sm:text-[13px]"
            >
              Sign up
            </Link>
            <Link
              href="/pages/login"
              className="py-[8px] px-[20px] bg-[#F8F8F8] text-black text-[14px] font-normal rounded-[24px] duration-200 hover:bg-[#dcdcdc] cursor-pointer max-sm:py-1 max-sm:px-3 max-sm:text-[13px]"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Navbar;
