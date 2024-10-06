import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import  axios  from "axios";

const fetchPostDeatils = (postId) =>
  axios.get(`http://localhost:4000/posts/${postId}`);

const PostDetailsRQ = () => {
  const { postId } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => fetchPostDeatils(postId),
  });
  console.log(data?.data);
  const { title, body } = data?.data || {};

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }
  if (isError) {
    return <div className="text-white">{error.message}</div>;
  }
  return (
    <div className=" flex flex-col mx-20 justify-center items-center my-2 min-w-[600px] rounded-md   bg-white   p-4 hover:z-20 hover:scale-105 transition-all duration-300 hover: cursor-pointer">
      <h2 className="font-bold text-green-700">{title}</h2>
      <p className="text-blue-700">{body}</p>
    </div>
  );
};

export default PostDetailsRQ;
