"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import withAuthRedirect from "@/HOC/withAuthRedirect";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/lib/firebase";
import { Toaster, toast } from "sonner";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");

  console.log(name, email, password, confirmPassword);

  const router = useRouter();

  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      const storageRef = ref(storage, `user-profile-images/${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    file && upload();
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword || !file) {
      setError("All fields are necessary.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/api/register", {
        userName: name,
        email,
        password,
        confirmPassword,
        img: media,
      });

      console.log(res);

      if (res.status === 200) {
        setLoading(false);
        toast.success("Registration successful");
        router.push("/pages/login");
      } else {
        throw new Error("Failed to register");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="h-screen bg-gray-100 text-gray-900 flex justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="p-3 max-w-screen-xl m-0 sm:m-4 sm:rounded-none bg-white shadow flex justify-center flex-1 rounded-[36px] overflow-hidden]">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-4 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Start Your Trip
            </h1>
            <div className="flex items-center flex-col w-full mt-2 text-center">
              <div className="flex flex-col items-center py-0 rounded-full bg-slate-100 w-fit">
                <FcGoogle className="text-2xl" />
              </div>

              <div className="mt-2 mb-6 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or
                </div>
              </div>

              <div className="mx-auto max-w-xs">
                <form onSubmit={handleSubmit}>
                  <input
                    className="w-full px-6 py-3 rounded-[32px] font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 placeholder:font-normal text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className="w-full px-6 py-3 rounded-[32px] font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none placeholder:font-normal focus:border-gray-400 focus:bg-white mt-5"
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="w-full px-6 py-3 rounded-[32px] font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none placeholder:font-normal focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    className="w-full px-6 py-3 rounded-[32px] font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none placeholder:font-normal focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Confrim password"
                    name="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <label className="form-control w-full max-w-xs mt-3">
                    <div className="label">
                      <span className="label-text">Pick a profile image</span>
                      <span className="label-text-alt">Alt label</span>
                    </div>
                    <input
                      type="file"
                      className="file-input file-input-bordered w-full max-w-xs"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                  <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-3 rounded-[32px] hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    {loading === true ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <span className="text-[14px] font-semibold">Start</span>
                    )}
                  </button>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Already have an account?
                    <Link
                      href="/pages/login"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Login
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

export default withAuthRedirect(RegisterPage);
