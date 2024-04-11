"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/lib/firebase";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [slug, setSlug] = useState("");

  const { data: session } = useSession();

  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

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

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/api/blog", {
      title,
      desc,
      img: media,
      session,
      slug,
    });
    console.log(session);

    if (res.status === 200) {
      console.log("success");
    }
  };
  return (
    <div>
      <h1>Create blog here</h1>
      <form onSubmit={handleCreateBlog}>
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="desc"
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="text"
          placeholder="slug"
          onChange={(e) => setSlug(e.target.value)}
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default CreateBlog;
