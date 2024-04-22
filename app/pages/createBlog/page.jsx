"use client";

import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/lib/firebase";
import Image from "next/image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import Navbar from "@/components/navbar/Navbar";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [slug, setSlug] = useState("");
  const [value, setValue] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [readDuration, setReadDuration] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      setLoading(true);
      const storageRef = ref(storage, `post-images/${file.name}`);

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
              setLoading(true);
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
            setLoading(false);
          });
        }
      );
    };

    file && upload();
  }, [file]);

  // console.log(file);

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/api/blog", {
      title,
      desc: value,
      img: media,
      readDuration,
      session,
      slug,
      category: catSlug,
    });
    console.log(session);

    if (res.status === 200) {
      toast.success("Post created successfully");
      router.push("/");
      router.refresh();
    }
  };
  return (
    <>
      <Suspense
        fallback={
          <div class="flex justify-center items-center h-[100vh]">
            <span className="loading loading-spinner text-info loading-lg"></span>
          </div>
        }
      >
        <Navbar />
        <div className="max-w-[700px] mx-auto py-3">
          <Toaster position="top-center" />
          <form
            onSubmit={handleCreateBlog}
            className="flex flex-col items-start w-full"
          >
            <div className="w-full aspect-[7/4] mb-9 relative border-[3px] rounded-[9px] cursor-pointer">
              <input
                type="file"
                className="w-full h-full bg-red-400 opacity-0 cursor-pointer"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {loading === false && (
                <Image
                  className="write-img cursor-pointer"
                  src={file ? media : "/writeImg.jpeg"}
                  alt="write"
                  fill
                  objectFit="cover"
                />
              )}
              {loading === true && (
                <span className="loading-style loading loading-infinity loading-xs"></span>
              )}
            </div>
            <textarea
              name=""
              id=""
              placeholder="Title"
              className="text-[34px] text-black placeholder:text-gray-300 outline-none w-full mb-6"
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
            <select className="" onChange={(e) => setCatSlug(e.target.value)}>
              <option value="style">Style</option>
              <option value="fashion">Fashion</option>
              <option value="food">Food</option>
              <option value="culture">Culture</option>
              <option value="travel">Travel</option>
              <option value="coding">Coding</option>
            </select>
            <div className="w-full mt-3">
              {/* <ReactQuill
              className="w-full italic"
              theme="bubble"
              value={value}
              onChange={setValue}
              placeholder="Write here..."
            /> */}
              <textarea
                type="text"
                className="w-full italic outline-none mb-2 mt-3 h-fit"
                placeholder="Write here..."
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="flex justify-between w-full">
              <input
                type="text"
                placeholder="slug.."
                className="italic border-[2px] py-2 px-3 rounded-[8px] w-[48%]"
                onChange={(e) => setSlug(e.target.value)}
              />
              <input
                type="number"
                placeholder="readTime.."
                className="italic border-[2px] py-2 px-3 rounded-[8px] w-[48%]"
                onChange={(e) => setReadDuration(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="py-[8px] px-[20px] bg-black text-white text-[14px] font-normal rounded-[24px] duration-200 hover:bg-[#424242] max-sm:py-1 max-sm:px-3 max-sm:text-[13px] mt-9"
            >
              Publish
            </button>
          </form>
        </div>
      </Suspense>
    </>
  );
};

export default CreateBlog;
