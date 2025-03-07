import React, { useState, useEffect } from "react";
import { fetchPosts, deletePost } from "../../api/blog";
import { FiPlusCircle, FiEdit2, FiTrash2, FiEye, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { FaFilter, FaSearch, FaCalendarAlt, FaUser } from "react-icons/fa";
import AddBlogModal from "../../Components/Modals/AddBlogModal";

function BlogManagement() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    postId: null,
    postTitle: ""
  });
  const [messageTimeout, setMessageTimeout] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (success || error) {
      // Clear any existing timeout
      if (messageTimeout) {
        clearTimeout(messageTimeout);
      }

      // Set new timeout
      const timeout = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);

      setMessageTimeout(timeout);

      // Cleanup on unmount or when success/error changes
      return () => {
        if (messageTimeout) {
          clearTimeout(messageTimeout);
        }
      };
    }
  }, [success, error]);

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

  const handleDeleteClick = (post) => {
    setDeleteConfirmation({
      isOpen: true,
      postId: post._id,
      postTitle: post.title
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await deletePost(deleteConfirmation.postId);
      setPosts(posts.filter((post) => post._id !== deleteConfirmation.postId));
      setSuccess("Post deleted successfully!");
    } catch (error) {
      setError("Failed to delete post.");
    } finally {
      setDeleteConfirmation({ isOpen: false, postId: null, postTitle: "" });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation({ isOpen: false, postId: null, postTitle: "" });
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || post.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Blog Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-customGreen text-white px-6 py-2.5 rounded-lg hover:bg-green-600 transition-all transform hover:scale-105"
        >
          <FiPlusCircle size={20} />
          <span>Create New Post</span>
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-customGreen focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {["all", "published", "draft"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === filter
                  ? "bg-customGreen text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Status Messages with Animation */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {error && (
          <div 
            className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg shadow-lg animate-slideIn"
            style={{
              animation: 'slideIn 0.5s ease-out, fadeOut 0.5s ease-in 2.5s forwards'
            }}
          >
            <div className="flex items-center">
              <FiAlertCircle className="mr-2" />
              {error}
            </div>
          </div>
        )}
        {success && (
          <div 
            className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg shadow-lg"
            style={{
              animation: 'slideIn 0.5s ease-out, fadeOut 0.5s ease-in 2.5s forwards'
            }}
          >
            <div className="flex items-center">
              <FiCheckCircle className="mr-2" />
              {success}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 transform transition-all">
            <div className="flex items-center justify-center mb-4 text-red-500">
              <FiAlertCircle size={48} />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete "{deleteConfirmation.postTitle}"? 
              This action cannot be undone.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleDeleteCancel}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={post.image || 'https://via.placeholder.com/400x200'}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  post.status === "published" 
                    ? "bg-green-500 text-white" 
                    : "bg-yellow-500 text-white"
                }`}>
                  {post.status || "Draft"}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                {post.title}
              </h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-500 text-sm">
                  <FaUser className="mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <FaCalendarAlt className="mr-2" />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">
                {post.description || "No description available"}
              </p>

              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  {post.category || "Uncategorized"}
                </span>
                <div className="flex gap-2">
                  <button 
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                    title="View"
                  >
                    <FiEye size={18} />
                  </button>
                  <button 
                    className="p-2 text-yellow-500 hover:bg-yellow-50 rounded-full transition-colors"
                    title="Edit"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(post)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-customGreen border-t-transparent"></div>
        </div>
      )}

      {/* No Results Message */}
      {!loading && filteredPosts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No blog posts found.
        </div>
      )}

      {/* Add Blog Modal */}
      {isModalOpen && (
        <AddBlogModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            loadPosts();
            setSuccess("Post created successfully!");
          }}
        />
      )}
    </div>
  );
}

// Add these animations to your global CSS or tailwind.config.js
const styles = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }
`;

export default BlogManagement;
