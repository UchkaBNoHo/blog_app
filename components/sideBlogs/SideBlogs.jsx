"use client"
import SideBlog from "./SideBlog";
import { useSession} from "next-auth/react";

const SideBlogs = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="sticky top-4 w-[30%] mt-[2rem] max-md:w-full">
      <div className="mb-[28px]">
        <h3 className="font-semibold uppercase tracking-[2px] mb-3">
          Most Popular
        </h3>
        <hr className="w-full" />
      </div>
      <div className="flex flex-col gap-5 sm:max-md:flex-wrap sm:max-md:flex-row">
        <SideBlog
          image="/blog2.jpg"
          title="Sports Match Of The Century "
          date="1 week ago"
        />
        <SideBlog
          image="/blog3.jpg"
          title="Smart Watches That Will Make You Spend Some Money"
          date="4 weeks ago"
        />
        <SideBlog
          image="/blog4.jpg"
          title="Best Portable Bluetooth Speakers In 2018"
          date="1 month ago"
        />
      </div>
    </div>
  );
};

export default SideBlogs;
