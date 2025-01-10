import React, { useEffect, useState } from "react";
import { gradientClasses } from "../lib/gradientClasses";
import { StickyScroll } from "./../ui/sticky-scroll-reveal.tsx";
import axios from "axios";

export default function BlogCard() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true); // for loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/blog");

        if (response.data && response.data.length > 0) {
          const transformedContent = response.data.map((blog, index) => {
            const gradientClass =
              gradientClasses[index % gradientClasses.length];
            return {
              title: blog.blogName,
              description: blog.text,
              content: (
                <div
                  className={`h-full w-full ${gradientClass} flex items-center justify-center text-white`}>
                  <img
                    src={blog.image}
                    alt={blog.blogName}
                    className='h-full w-full object-cover'
                  />
                </div>
              ),
            };
          });

          // Update the content state with the transformed data
          setContent(transformedContent);
        } else {
          alert("No blogs found");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to fetch blog data. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {content.length > 0 ? (
        <StickyScroll content={content} />
      ) : (
        <div>No content available.</div>
      )}
    </div>
  );
}
