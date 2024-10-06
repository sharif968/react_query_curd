import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
export default function PaginatedQueries() {
  const fetchFruits = async (pageNum) => {
    return axios.get(
      `http://localhost:4000/fruits?_page=${pageNum}&_per_page=6`
    );
  };

  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fruits", page],
    queryFn: () => fetchFruits(page),
    // keepPreviousData: true,
    placeholderData:keepPreviousData,
    refetchOnMount: false,
    staleTime: Infinity,
  
  });
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      {data?.data?.data.map((fruit) => (
        <div
          className=" my-2 min-w-[500px] rounded-md mx-10  flex flex-col justify-center items-center  bg-white   p-4 hover:z-20 hover:scale-105 transition-all duration-300 hover: cursor-pointer"
          key={fruit.id}
        >
          {fruit.name}{" "}
          <span className="text-gray-300 font-extralight ml-4">{`Color:${fruit.color}`}</span>
        </div>
      ))}
      <div className=" flex  justify-evenly items-center">
        <button
          disabled={page === 1 ? true : false}
          onClick={() => setPage((prev) => prev - 1)}
          className={`mx-6 my-2 p-3 w-20 rounded-md font-bold 
            ${
              page === 1
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-white text-red-500"
            }`}
        > 
          prev
        </button>
        <button
          disabled={page === 10 ? true : false}
          onClick={() => {
            setPage((prev) => prev + 1);
            console.log("click next vtn");
          }}
          className={`mx-6 my-2 p-3 w-20 rounded-md font-bold 
            ${
              page === 10
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-white text-red-500"
            }`}
        >
          next
        </button>
      </div>
    </div>
  );
}
