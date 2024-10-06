import Home from "./components/Home";
import PostsTraditional from "./components/PostsTraditional";
import PostsRQ from "./components/PostsRQ";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PostDetailsRQ from "./components/PostDetailsRQ";
import PaginatedQueries from "./components/PaginatedQueries";
import InfiniteQueries from "./components/InfiniteQueries";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-300 min-h-screen ">
        <nav className="bg-gray-200 p-2 md-2 ">
          <ul className="flex flex-row justify-evenly m-6 font-extrabold text-gray-700 items-center">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Traditional Posts</Link>
            </li>
            <li>
              <Link to="/rq-posts">RQ Posts</Link>
            </li>
            <li>
              <Link to="/paginated-fruits">Paginated Queries</Link>
            </li>
            <li>
              <Link to="/infinite-fruits">Infinite Queries</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/posts" element={<PostsTraditional />} />
          <Route exact path="/rq-posts" element={<PostsRQ />} />
          <Route exact path="/rq-posts/:postId" element={<PostDetailsRQ />} />
          <Route
            exact
            path="/paginated-fruits"
            element={<PaginatedQueries />}
          />
          <Route exact path="/infinite-fruits" element={<InfiniteQueries />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
