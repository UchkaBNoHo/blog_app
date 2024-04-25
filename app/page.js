import BlogsContainer from "@/components/blog/blogsContainer";
import CategoryContainer from "@/components/category/CategoryContainer";
import Navbar from "@/components/navbar/Navbar";
import { Suspense } from "react";

export const metadata = {
  title: "Home Page",
  description: "Generated by create next app",
};

export default function Home() {
  // const { PageLoading, setPageLoading } = useAuthContext();
  return (
    <>
      <Suspense
        fallback={
          <div class="flex justify-center items-center h-[100vh]">
            <span className="loading loading-spinner text-accent loading-lg"></span>
          </div>
        }
      >
        <Navbar />
        <main className="max-w-[1160px] mx-auto max-xl:px-9">
          <CategoryContainer />
          <div className="flex justify-between max-md:flex-col">
            <BlogsContainer />
          </div>
        </main>
      </Suspense>
    </>
  );
}
