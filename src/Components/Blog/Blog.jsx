import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { fetchBlogs } from "../../api/blog";

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const fetchedBlog = await fetchBlogs();
        setBlogPosts(fetchedBlog);
        console.log("blog", fetchedBlog);
      } catch (error) {
        setError("Failed to fetch blogs.");
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, []);

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-sm md:text-base text-customGreen font-semibold uppercase tracking-wider mb-2">
            Latest Updates
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            News & Announcements
          </h3>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Stay informed about the latest developments, achievements, and
            opportunities within NULASS.
          </p>
        </motion.div>

        {/* Blog Grid */}
        {loading ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
              >
                <Link to={`/blog/${post._id}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-customGreen text-white text-sm px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <FaCalendarAlt />
                      <span>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-customGreen transition-colors">
                      {post.title}
                    </h4>
                    <p
                      className="mb-4 text-gray-600"
                      dangerouslySetInnerHTML={{
                        __html: post.description
                          ? post.description.substring(0, 100) + "..."
                          : "No description available.",
                      }}
                    />
                    <div className="flex items-center text-customGreen font-semibold group-hover:gap-2 transition-all">
                      Read More
                      <FaArrowRight className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* See More Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-customGreen font-semibold hover:text-green-700 transition-colors group"
          >
            See More News
            <FaArrowRight className="transform group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Blog;
