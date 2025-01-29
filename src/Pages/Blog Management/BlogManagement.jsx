import React, { useState, useEffect } from "react";
import { fetchPosts, createPost, updatePost, deletePost } from "../../api/blog";
import { FiPlusCircle } from "react-icons/fi";
import AddBlogModal from "../../Components/Modals/AddBlogModal";

function BlogManagement() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        setError("Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer); 
    }
  }, [success, error]);

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter((post) => post._id !== postId));
      setSuccess("Post deleted successfully!");
    } catch (error) {
      setError("Failed to delete post.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold mb-4">Existing Blogs</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-customGreen text-white py-2 px-4 rounded-full hover:bg-green-600 transition"
        >
          <FiPlusCircle size={20} />
          <span>Add Blog</span>
        </button>
      </div>

      {/* Success & Error Messages with Timer */}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
            <p className="text-white text-lg font-semibold">Loading...</p>
          </div>
        </div>
      )}

      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Author</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Published Date</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{post.title}</td>
                <td className="border border-gray-300 px-4 py-2">{post.author}</td>
                <td className="border border-gray-300 px-4 py-2">{post.category}</td>
                <td className="border border-gray-300 px-4 py-2">{post.status || "Draft"}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2 space-x-2 flex items-center">
                  <button className="bg-customGreen text-white py-1 px-2 rounded hover:bg-green-600">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <AddBlogModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default BlogManagement;
