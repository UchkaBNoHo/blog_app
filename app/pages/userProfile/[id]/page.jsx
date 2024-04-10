"use client";

import { useParams } from "next/navigation";
import React from "react";

const UserProfile = () => {
  const params = useParams();
  console.log(params.id);
  return (
    <div>
      <h1>UserProfile</h1>
    </div>
  );
};

export default UserProfile;
