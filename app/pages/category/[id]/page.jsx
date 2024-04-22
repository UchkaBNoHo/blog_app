// "use client";

// import { useAuthContext } from "@/context/AuthContext";
// import axios from "axios";
// import React, { useEffect } from "react";

// const Category = () => {
//   const { selectedCategory } = useAuthContext();
//   //   const posts = await getData();
//   useEffect(() => {
//     getData();
//   });

//   const category = selectedCategory.toLowerCase();
//   const getData = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:3000/api/category/${category}`
//       );
//       console.log(res);
//       return res.data;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       throw error;
//     }
//   };

//   return (
//     <div>
//       <h1>{selectedCategory}</h1>
//     </div>
//   );
// };

// export default Category;
