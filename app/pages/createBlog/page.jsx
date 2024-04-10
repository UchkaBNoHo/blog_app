"use client";

import axios from "axios";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [slug, setSlug] = useState("");

  const { data: session } = useSession();

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/api/blog", {
      title,
      desc,
      session,
      slug,
    });
    console.log(session);

    console.log(res);
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
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default CreateBlog;
