"use client";

import { useAuthContext } from "@/context/AuthContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import OneCategory from "./OneCategory";

const CategorySection = () => {
  const { selectedCategory } = useAuthContext();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const category = selectedCategory.toLowerCase();
    console.log(category);
    const getData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/category/${category}`
        );
        console.log(res);
        setPosts(res.data);
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    getData();
  }, [selectedCategory]);

  return (
    <div className="gap-3 flex-col w-[65%] mt-[2rem] max-md:w-full">
      <div className="">
        <h3 className="font-semibold uppercase tracking-[2px] mb-3">
          {selectedCategory}
        </h3>
        <hr className="w-full" />
      </div>
      <div className="h-fit">
        {posts.length === 0 && (
          <div className="w-full py-3 bg-gray-100 rounded-[28px] mt-4">
            <div className="text-center">No Posts Published yet</div>
          </div>
        )}
        {posts &&
          posts.map((d) => (
            <OneCategory
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

export default CategorySection;
