import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { createPost } from "../../api/blog";
import SammyModal from "../General/SammyModal";
import { MdOutlineCameraAlt } from "react-icons/md"; 
import Editor from 'react-simple-wysiwyg';

const AddBlogModal = ({ isOpen, onClose }) => {
  const { token } = useAuthContext();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    author: "",
    image: "",
    postTime: new Date(),
    createdAt: new Date(),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prevForm) => ({
        ...prevForm,
        image: URL.createObjectURL(file),
      }));
    }
  };

  // const handleEditorChange = (value) => {
  //   setForm((prevForm) => ({
  //     ...prevForm,
  //     description: value,
  //   }));
  // };

  const validate = () => {
    if (
      form.title !== "" &&
      form.description !== "" &&
      form.category !== "" &&
      form.author !== "" &&
      form.image !== ""
    ) {
      return true;
    }
    setError("Please fill in all fields.");
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validate()) return;

    setLoading(true);

    try {
      
      const createdPost = await createPost(form);  
      setForm({
        title: "",
        description: "",
        category: "",
        author: "",
        image: "",
        postTime: new Date(),
        createdAt: new Date(),
      });
      setSuccess("Post created successfully!");
      onClose();
    } catch (error) {
      setError("Failed to create post.");
    }

    setLoading(false);
  };

  return (
    <>
      <SammyModal
        isOpen={isOpen}
        onClose={onClose}
        clickBackgroundToClose={true}
        modalClass={"lg:w-[800px] w-screen"}
      >
        <h2 className="font-extrabold text-lg mb-2">Add Blog</h2>
        <p className="mb-2 text-sm text-gray-400">Fill in the details for the blog post</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 p-2 rounded">
            {success}
          </div>
        )}

        <div className="pt-4 px-2 max-h-[400px] overflow-y-auto space-y-4 ">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 mb-2 text-sm">Image Url</p>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleFormChange}
                className="border rounded-lg py-2 px-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter blog image URL"
              />
            </div>

            <div>
              <p className="text-gray-600 mb-2 text-sm">Title</p>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleFormChange}
                className="border rounded-lg py-2 px-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter blog title"
              />
            </div>

            <div>
              <p className="text-gray-600 mb-2 text-sm">Category</p>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleFormChange}
                className="border rounded-lg py-2 px-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category"
              />
            </div>

            <div>
              <p className="text-gray-600 mb-2 text-sm">Author</p>
              <input
                type="text"
                name="author"
                value={form.author}
                onChange={handleFormChange}
                className="border rounded-lg py-2 px-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter author name"
              />
            </div>
          </div>

          <div>
            <p className="text-gray-600 mb-2 text-sm">Blog Description</p>
            
            <Editor containerProps={{ style: { height: '1000px' } }} name="description" value={form.description} onChange={handleFormChange} />

            
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-green-600 bg-green-600 px-8 py-3 text-white hover:bg-transparent hover:text-green-600 focus:outline-none"
          >
            <span className="text-sm font-medium">Submit</span>
          </button>
        </div>
      </SammyModal>
    </>
  );
};

export default AddBlogModal;
