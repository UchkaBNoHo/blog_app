import React from "react";
import OneBlog from "./OneBlog";
import axios from "axios";

const getData = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/blog");
    console.log(res);
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const Blogs = async () => {
  const posts = await getData();
  // console.log(posts);
  return (
    <div className="gap-3 flex-col w-[65%] mt-[2rem] max-md:w-full">
      <div className="">
        <h3 className="font-semibold uppercase tracking-[2px] mb-3">Posts</h3>
        <hr className="w-full" />
      </div>
      <div className="h-fit">
        {posts &&
          posts.map((d) => (
            <OneBlog
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

export default Blogs;
