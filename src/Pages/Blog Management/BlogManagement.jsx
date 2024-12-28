import React, { useState } from 'react';

function BlogManagement() {
  const [posts, setPosts] = useState([]); // Replace with actual data fetching
  const [newPost, setNewPost] = useState({ title: '', content: '', category: '', tags: [] });
  const [gallery, setGallery] = useState([]); // Replace with actual data fetching
  const [newImage, setNewImage] = useState({ url: '', caption: '', tags: [] });

  // Example functions to handle blog post actions
  const createPost = () => {
    // Logic to create a new blog post
    setPosts([...posts, newPost]);
    setNewPost({ title: '', content: '', category: '', tags: [] }); // Reset form
  };

  const deletePost = (id) => {
    // Logic to delete a blog post
    setPosts(posts.filter((post, index) => index !== id));
  };

  const uploadImage = () => {
    // Logic to upload a new image to the gallery
    setGallery([...gallery, newImage]);
    setNewImage({ url: '', caption: '', tags: [] }); // Reset form
  };

  return (
    <div className="space-y-6">
      {/* Blog Management Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Blog Management</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            className="border rounded-lg p-2 w-full mb-2"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <textarea
            placeholder="Content"
            className="border rounded-lg p-2 w-full mb-2"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            className="border rounded-lg p-2 w-full mb-2"
            value={newPost.category}
            onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="border rounded-lg p-2 w-full mb-2"
            value={newPost.tags.join(', ')}
            onChange={(e) => setNewPost({ ...newPost, tags: e.target.value.split(',').map(tag => tag.trim()) })}
          />
          <button onClick={createPost} className="bg-blue-600 text-white rounded-lg p-2">Create Post</button>
        </div>
        <h3 className="text-lg font-semibold mb-2">Existing Posts</h3>
        <ul className="space-y-2">
          {posts.map((post, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
              <div>
                <h4 className="font-bold">{post.title}</h4>
                <p>{post.content}</p>
                <p className="text-sm text-gray-500">Category: {post.category} | Tags: {post.tags.join(', ')}</p>
              </div>
              <button onClick={() => deletePost(index)} className="text-red-600">Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Gallery Management Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Gallery Management</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Image URL"
            className="border rounded-lg p-2 w-full mb-2"
            value={newImage.url}
            onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
          />
          <input
            type="text"
            placeholder="Caption"
            className="border rounded-lg p-2 w-full mb-2"
            value={newImage.caption}
            onChange={(e) => setNewImage({ ...newImage, caption: e.target.value })}
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="border rounded-lg p-2 w-full mb-2"
            value={newImage.tags.join(', ')}
            onChange={(e) => setNewImage({ ...newImage, tags: e.target.value.split(',').map(tag => tag.trim()) })}
          />
          <button onClick={uploadImage} className="bg-blue-600 text-white rounded-lg p-2">Upload Image</button>
        </div>
        <h3 className="text-lg font-semibold mb-2">Gallery</h3>
        <ul className="space-y-2">
          {gallery.map((image, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
              <div>
                <img src={image.url} alt={image.caption} className="w-16 h-16 object-cover rounded" />
                <p className="font-bold">{image.caption}</p>
                <p className="text-sm text-gray-500">Tags: {image.tags.join(', ')}</p>
              </div>
              <button onClick={() => {/* Logic to delete image */}} className="text-red-600">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BlogManagement;
