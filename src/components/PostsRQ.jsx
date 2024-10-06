import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function PostsRQ() {
  // add post function
  const addPost = (newPost) => {
    return axios.post("http://localhost:4000/posts", newPost);
  };

  // delete post function
  // const deletePost = (id) => {
  //   return axios.delete(`http://localhost:4000/posts/${id}`);
  // };
  const fetchPosts = () => {
    return axios.get("http://localhost:4000/posts");
  };
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const queryClient = useQueryClient();
  const { mutate: addMutate } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  // const { mutate: deleteMutate } = useMutation({
  //   mutationFn: deletePost,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["posts"]);
  //   },
  // });
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      body,
    };
    setBody("");
    setTitle("");
    addMutate(newPost);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex flex-col  justify-center items-center   ">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-row justify-center items-center"
      >
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
            className="p-2 rounded-lg"
          />
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="body"
            className="p-2 rounded-lg ml-2"
          />
          <button
            className="bg-white p-2 rounded-lg font-bold text-green-400 mt-4 ml-2"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      <button
        className="bg-white p-2 rounded-lg font-bold text-green-500 mt-4"
        onClick={refetch}
      >
        Fetch Posts
      </button>
      {data.data.map((post) => (
        <Link to={`/rq-posts/${post.id}`} key={post.id}>
          <div className=" flex flex-col justify-center items-center my-2 min-w-[600px] rounded-md   bg-white   p-4 hover:z-20 hover:scale-110 transition-all duration-300 hover: cursor-pointer">
            <h2 className="font-bold text-green-700">{post.title}</h2>
            <p className="text-blue-700">{post.body}</p>
            {/* <button
              className="bg-white p-2 rounded-lg font-bold text-red-500 mt-4"
              onClick={(e) => {
                deleteMutate(post.id);
                e.stopPropagation();
              }}
            >
              Delete
            </button> */}
          </div>
        </Link>
      ))}
    </div>
  );
}
