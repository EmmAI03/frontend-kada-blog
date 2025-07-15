import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../api/posts";
import { Link, useNavigate } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const checkAuthAndFetchUser = async () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        try {
          const res = await fetch("http://localhost:5173/auth/me", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
          if (res.ok) {
            const userData = await res.json();
            setLoggedInUser(userData.username);
            localStorage.setItem('username', userData.username);
          } else {
            localStorage.clear();
            navigate("/login");
          }
        } catch (error) {
          localStorage.clear();
          navigate("/login");
        }
      }
    };
    checkAuthAndFetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await fetch("http://localhost:5173/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.clear();
    setLoggedInUser(null);
    navigate("/login");
  };

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  const handleDelete = async (id) => {
    await deletePost(id);
    setPosts(posts.filter((p) => p._id !== id));
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / pageSize);
  const currentPosts = filteredPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="min-h-screen bg-blue-100 px-4 pb-10">
      <nav className="bg-white p-4 shadow flex justify-between items-center rounded">
        <h1 className="text-xl font-bold text-blue-700"><Link to="/">Here's The List of Posts</Link></h1>
        <div className="flex gap-4">
          {loggedInUser ? (
            <>
              <span>Welcome, {loggedInUser}</span>
              <button onClick={handleLogout} className="text-blue-600 hover:underline">Logout</button>
            </>
          ) : <Link to="/login" className="text-blue-600 hover:underline">Login</Link>}
        </div>
      </nav>

      <div className="my-4">
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by title or content..."
          className="w-full border px-3 py-2 rounded shadow"
        />
      </div>

      <div className="flex justify-end mb-4">
        <Link to="/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ New Post</Link>
      </div>

      <div className="grid gap-4">
        {currentPosts.map(post => (
          <div key={post._id} className="bg-white shadow rounded p-4">
            <Link to={`/posts/${post._id}`}>
              <h3 className="text-xl font-semibold text-blue-700 hover:underline">{post.title}</h3>
            </Link>
            <p className="text-gray-700 line-clamp-3">{post.content}</p>
            {loggedInUser && (
              <div className="flex gap-2 mt-2">
                <button onClick={() => navigate(`/edit/${post._id}`)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(post._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="text-blue-600 px-3 py-1">&lt;</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button key={page} onClick={() => setCurrentPage(page)} className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border'}`}>{page}</button>
          ))}
          <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="text-blue-600 px-3 py-1">&gt;</button>
        </div>
      )}
    </div>
  );
}

export default PostList;
