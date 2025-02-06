import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavWrapper from "../../Components/NavWrapper";
import { formatDate } from "../../Helper/helper";
import { fetchPost } from "../../api/blog";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const fetchedPost = await fetchPost(id);
        setBlog(fetchedPost);
        console.log("post", fetchedPost);
      } catch (error) {
        setError("Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  if (!blog) return <p className="text-center mt-10 text-lg">No post found.</p>;

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
