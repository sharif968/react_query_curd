import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export default function InfiniteQueries() {
  // Function to fetch data based on the page number
  const fetchFruits = async ({ pageParam }) => {
    const response = await axios.get(
      `http://localhost:4000/fruits?_page=${pageParam}&_per_page=6`
    );
    return response; // Make sure to return data here
  };

  // Infinite Query
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["fruits"],
      queryFn: fetchFruits, // Pass fetchFruits function directly
      getNextPageParam: (lastPage, allPages) => {
        // Check if there are more pages (assuming 10 pages as an example)
        if (allPages.length < 10) {
          return allPages.length + 1; // Increment page
        } else {
          return undefined; // No more pages to fetch
        }
      },
      initialPageParam: 1, // Start from page 1
    });

  console.log("Fetched data: ", data); // Check if data is being fetched

  // Handling Loading and Error States
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Rendering fruits */}
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.data.data.map((fruit) => (
            <div
              className="my-2 min-w-[500px] rounded-md mx-10 flex flex-col justify-center items-center bg-white p-4 hover:z-20 hover:scale-105 transition-all duration-300 hover: cursor-pointer"
              key={fruit.id}
            >
              <h2 className="font-bold text-green-700">{fruit.name}</h2>
              <p className="text-blue-700">{fruit.color}</p>
            </div>
          ))}
        </div>
      ))}
      {/* Load More Button */}

        <button
          onClick={fetchNextPage}
          className={`bg-blue-500 text-white p-2 mt-4 rounded ${
            (!hasNextPage || isLoading)
              ? "bg-gray-500 text-gray-700 cursor-not-allowed"
              : "hover:bg-blue-700 cursor-pointer"
          }`}
          disabled={!hasNextPage || isLoading}
        >
          Load More
        </button>
      
    </div>
  );
}
