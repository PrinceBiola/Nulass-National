import React, { useEffect, useState } from "react";
import NavWrapper from "../../Components/NavWrapper";
import { FaArrowRight, FaClock, FaFire, FaTag, FaSearch } from "react-icons/fa";
import { FaCalendarWeek, FaPerson } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Blog1 from "../../assets/Images/Blog1.jpeg";
import { fetchPosts } from "../../api/blog";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [posts, setPosts] = useState([]);

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

  const categories = ["all", ...new Set(posts.map((post) => post.category))];

  const Filteredpost  = activeCategory === "all" ? posts : posts.filter(post => post.category === activeCategory)

  // const categories = [
  //   { id: 'all', name: 'All Posts' },
  //   { id: 'news', name: 'News & Announcements' },
  //   { id: 'spotlights', name: 'Student Spotlights' },
  //   { id: 'events', name: 'Events Highlights' },
  //   { id: 'academic', name: 'Academic Tips' },
  //   { id: 'culture', name: 'Cultural Heritage' }
  // ];

  // const featuredPost = {
  //   title: "Celebrating Lagos Heritage: Highlights from NULASS National Day 2023",
  //   excerpt: "Discover the rich culture and unity displayed at this year's celebration, featuring traditional performances, academic achievements, and community building initiatives.",
  //   image: Blog1,
  //   date: "December 15, 2023",
  //   author: "NULASS Media Team",
  //   category: "Events Highlights",
  //   readTime: "5 min read"
  // };

  // const recentPosts = [
  //   {
  //     title: "How NULASS Supports Lagos State Students Nationwide",
  //     excerpt: "Learn about the programs and initiatives that help Lagos State students thrive academically and socially.",
  //     image: Blog1,
  //     date: "December 10, 2023",
  //     author: "Admin",
  //     category: "News",
  //     readTime: "4 min read"
  //   },
  //   {
  //     title: "Top 5 Cultural Festivals Every Lagos Student Should Experience",
  //     excerpt: "Celebrate the vibrant traditions of Lagos with these must-see festivals that showcase our rich heritage.",
  //     image: Blog1,
  //     date: "December 5, 2023",
  //     author: "Cultural Team",
  //     category: "Culture",
  //     readTime: "3 min read"
  //   }
  //   // Add more posts as needed
  // ];

  return (
    <NavWrapper>
      <div className="px-4 md:px-8 lg:px-12 pt-32 pb-16 bg-gray-50">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">NULASS Blog</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay updated with the latest news, events, and stories from the
            NULASS community.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-4 py-3 pl-12 rounded-lg border focus:ring-2 focus:ring-customGreen focus:outline-none"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <div className="flex items-center gap-2 mb-6">
                  <FaFire className="text-customGreen text-xl" />
                  <h2 className="text-xl font-semibold">Categories</h2>
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        activeCategory === category
                          ? "bg-customGreen text-white"
                          : "bg-transparent text-black"
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            {/* <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="h-64 w-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-1/2">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <FaCalendarWeek />
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <FaClock />
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 hover:text-customGreen transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                  <Link to="/blog/post-slug" className="inline-flex items-center gap-2 text-customGreen font-semibold hover:gap-3 transition-all">
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div> */}

            {/* Recent Posts Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {Filteredpost.map((post, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <FaCalendarWeek />
                      <span>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <FaClock />
                      <span>
                        {new Date(post.postTime).toLocaleTimeString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 hover:text-customGreen transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-customGreen bg-green-50 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <Link
                        to={`/blog/${post._id}`}
                        className="inline-flex items-center gap-2 text-customGreen font-semibold hover:gap-3 transition-all"
                      >
                        Read More <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </NavWrapper>
  );
}
