import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavWrapper from "../../Components/NavWrapper";
import { formatDate } from "../../Helper/helper";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
        if (!response.ok) throw new Error("Blog post not found!");
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <NavWrapper>
      <div className="max-w-5xl mx-auto p-6 mt-28">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-600 text-sm font-semibold mb-2">
          Published on {formatDate(blog.createdAt)}
        </p>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full rounded-lg  mb-3"
        />

        <p className="font-medium border-l-4 border-customGreen pl-3 mb-5">
          By {blog.author}
        </p>
        <p className="mb-4 text-gray-700" dangerouslySetInnerHTML={{ __html: blog.description }} />
      </div>
    </NavWrapper>
  );
};

export default BlogDetails;
