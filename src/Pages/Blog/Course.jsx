import React, { useEffect, useState } from "react";
import NavWrapper from "../../Components/NavWrapper";
import { fetchCourse, fetchPosts } from "../../api/blog";

export default function Course() {
  
  const [course, setCourse] = useState([]);
  const [error, setError] = useState([])


  useEffect(() => {
    const loadCourse = async () => {
      try {
        const fetchedCourse = await fetchCourse();
        setCourse(fetchedCourse);
        console.log("Course", fetchedCourse);
      } catch (error) {
        setError("Failed to fetch Course.");
      }
    };
    loadCourse();
  }, []);

 
  return (
    <NavWrapper>
      <div className="px-4 md:px-8 lg:px-12 pt-32 pb-16 bg-gray-50">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">course</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
           course
          </p>
        </div>

   

        <div className="grid lg:grid-cols-4 gap-8">
       

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            

            {/* Recent Posts Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {course.map((course, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={course.Image}
                    alt={course.title}
                    className="h-48 w-full object-cover"
                  />
                  <p className="text-center">{course?.title}</p>
                 
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </NavWrapper>
  );
}
