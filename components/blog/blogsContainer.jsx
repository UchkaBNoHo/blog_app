"use client";

import React from "react";
import Blogs from "./Blogs";
import SideBlogs from "../sideBlogs/SideBlogs";
import CategorySection from "../category/categorySection";
import { useAuthContext } from "@/context/AuthContext";

const BlogsContainer = () => {
  const { selectedCategory } = useAuthContext();
  return (
    <>
      {selectedCategory === "All" ? <Blogs /> : <CategorySection />}
      <SideBlogs />
    </>
  );
};

export default BlogsContainer;
