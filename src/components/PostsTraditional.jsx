import React, { useState, useEffect ,useCallback} from "react";
import axios from "axios";

export default function PostsTraditional() {
    
  const [posts, setPosts] = useState([]);
  const [isLoading, setIdsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const fetchData  = useCallback(
    async () => {
    
            try {
              const response = await axios.get("http://localhost:4000/posts");
              setPosts(response.data);
            } catch (error) {
              setIsError(error.message);
            } finally {
              setIdsLoading(false);
            }
          },
    
    [],
  )
  

  useEffect(() => {
   

    fetchData();

}, [fetchData]);

  if (isLoading) {
   
    return <div >Loading...</div>;
  }
  if (isError) {
    return <div>{isError}</div>;
  }

  return (
    <div className="flex flex-col  justify-center items-center   ">
      {posts.map((post) => (
        <div
        key={post.id}
            className=" my-4 min-w-[600px] rounded-md mx-10  flex flex-col justify-center items-center  bg-white   p-4 hover:z-20 hover:scale-105 transition-all duration-300 hover: cursor-pointer"
         
        >
          <h2 className="font-bold text-green-500">{post.title}</h2>
          <p className="text-blue-500">{post.body}</p>
        </div>
      ))}
    </div>
  );
}
