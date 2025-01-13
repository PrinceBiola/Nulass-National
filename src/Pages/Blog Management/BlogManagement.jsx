import React, { useState, useEffect } from "react";
import { fetchPosts, createPost, updatePost, deletePost } from "../../api/blog";

function BlogManagement() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    category: "",
    postTime: "",
    author: "",
    createdAt: new Date(),
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        setError("Failed to fetch posts.");
      }
    };
    loadPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const createdPost = await createPost(newPost);
      setPosts([...posts, createdPost]);
      setNewPost({
        title: "",
        description: "",
        category: "",
        postTime: "",
        author: "",
        createdAt: new Date(),
      }); // Reset form
      setSuccess("Post created successfully!");
    } catch (error) {
      setError("Failed to create post.");
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter((post) => post._id !== postId)); // Update state to remove deleted post
      setSuccess("Post deleted successfully!");
    } catch (error) {
      setError("Failed to delete post.");
    }
  };


  return (
    <div className="space-y-8">
      {/* Add New Blog Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-semibold mb-4">Add New Blog</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <form onSubmit={handleCreatePost} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:outline-none"
          />
          <input
            type="text"
            placeholder="Category"
            value={newPost.category}
            onChange={(e) =>
              setNewPost({ ...newPost, category: e.target.value })
            }
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:outline-none"
          />
          <input
            type="text"
            placeholder="Author"
            value={newPost.author}
            onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:outline-none"
          />
          <textarea
            placeholder="Description"
            value={newPost.description}
            onChange={(e) =>
              setNewPost({ ...newPost, description: e.target.value })
            }
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:outline-none"
          />
          <input type="file" required className="block w-1/4 text-gray-500" />

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-customGreen text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Publish Now
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Save As Draft
            </button>
          </div>
        </form>
      </div>

      {/* Existing Blogs Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-semibold mb-4">Existing Blogs</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div className="overflow-x-auto scrollbar-hide">
          <table className="min-w-full table-auto  border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Author</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">
                  Published Date
                </th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {post.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {post.author}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {post.category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {post.status || "Draft"}
                  </td>
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
      </div>
    </div>
  );

 
  // return (
  //   <div className="space-y-5">
  //     <div className="bg-white p-7 rounded-lg">
  //       <div className="flex items-center justify-between">
  //         <h1 className="font-bold text-2xl ">Add New Blog </h1>
  //         <div className="space-x-3">
  //           {/* <input
  //           type="search"
  //           name=""
  //           id=""
  //           className="inline-flex bg-slate-100 p-2 rounded-lg focus:ring-2 focus:ring-customGreen focus:outline-none"
  //           placeholder="Search "
  //         /> */}
  //           {/* <button className="bg-customGreen p-2 rounded-lg text-white hover:bg-green-600">Add New Post</button> */}
  //         </div>
  //       </div>
  //       {error && <p style={{ color: "red" }}>{error}</p>}
  //       {success && <p style={{ color: "green" }}>{success}</p>}

  //       <form
  //         onSubmit={handleCreatePost}
  //         className="flex flex-col pt-5 space-y-5"
  //       >
  //         <input
  //           type="text"
  //           placeholder="Title"
  //           value={newPost.title}
  //           onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
  //           required
  //           className="bg-slate-100 p-2 rounded-lg focus:ring-2 focus:ring-customGreen focus:outline-none"
  //         />
  //         <input
  //           type="text"
  //           placeholder="Category"
  //           value={newPost.category}
  //           onChange={(e) =>
  //             setNewPost({ ...newPost, category: e.target.value })
  //           }
  //           required
  //           className="bg-slate-100 p-2 rounded-lg focus:ring-2 focus:ring-customGreen focus:outline-none"
  //         />
  //         <input
  //           type="text"
  //           placeholder="Author"
  //           value={newPost.author}
  //           onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
  //           required
  //           className="bg-slate-100 p-2 rounded-lg focus:ring-2 focus:ring-customGreen focus:outline-none"
  //         />

  //         <textarea
  //           placeholder="Description"
  //           value={newPost.description}
  //           onChange={(e) =>
  //             setNewPost({ ...newPost, description: e.target.value })
  //           }
  //           required
  //           className="bg-slate-100 p-2 rounded-lg focus:ring-2 focus:ring-customGreen focus:outline-none"
  //         />
  //         <input type="file" required />

  //         <div className="space-x-4">
  //           <button
  //             type="submit"
  //             className="bg-customGreen p-2 rounded-lg text-white hover:bg-green-600"
  //           >
  //             Publish Now
  //           </button>
  //           <button
  //             type="submit"
  //             className="bg-red-500 p-2 rounded-lg text-white hover:bg-red-600"
  //           >
  //             Save As Draft
  //           </button>
  //         </div>
  //       </form>

  //       {/* <h2>Existing Posts</h2>
  //     <ul>
  //       {posts.map((post) => (
  //         <li key={post._id}>
  //           <h3>{post.title}</h3>
  //           <p>{post.description}</p>
  //           <button onClick={() => handleDeletePost(post._id)}>Delete</button>
  //         </li>
  //       ))}
  //     </ul> */}
  //     </div>

  //     <div className="bg-white p-7 rounded-lg">
  //       <div className="flex items-center justify-between">
  //         <h1 className="font-bold text-2xl ">Existing Blog</h1>
  //       </div>
  //       {error && <p style={{ color: "red" }}>{error}</p>}
  //       {success && <p style={{ color: "green" }}>{success}</p>}

  //       <table>
  //         <thead>
  //           <tr>
  //             <th>Title</th>
  //             <th>Author</th>
  //             <th>Category</th>
  //             <th>Status</th>
  //             <th>Published Date</th>
  //             <th>Actions</th>
  //           </tr>
  //         </thead>

  //         <tbody>
  //         {posts.map((post) => (
  //         <tr>

  //         </tr>
  //       ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
}

export default BlogManagement;
