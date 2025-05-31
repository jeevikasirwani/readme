import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";

interface Blog {
  id: string;
  title: string;
  description: string;
  User?: {
    name?: string;
  };
  createdAt: string;
}

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signup");
          return;
        }

        const response = await axios.get(
          "https://backend.jeevika-sirwani2003.workers.dev/api/v1/blog/allPosts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Response:", response.data);

        if (!Array.isArray(response.data)) {
          throw new Error("Invalid response format");
        }

        setBlogs(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate("/signup");
          return;
        }
        setError("Failed to load blogs");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [navigate]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="border-b border-gray-200 py-6 animate-pulse">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <div className="ml-2 flex-grow">
                <div className="w-32 h-4 bg-gray-200 rounded" />
              </div>
              <div className="w-24 h-4 bg-gray-200 rounded" />
            </div>
            <div className="w-4/5 h-8 bg-gray-200 rounded mb-4" />
            <div className="w-full h-48 bg-gray-200 rounded mb-4" />
            <div className="space-y-2 mb-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-full h-4 bg-gray-200 rounded" />
              ))}
            </div>
            <div className="flex justify-between items-center">
              <div className="w-16 h-4 bg-gray-200 rounded" />
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4 max-w-3xl mx-auto">{error}</div>;
  }

  return (
    <div>
      <AppBar/>
      <div className="max-w-3xl mx-auto px-4">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorname={blog.User?.name || "Anonymous"}
              title={blog.title}
              description={blog.description}
              publishedDate={blog.createdAt}
            />
          ))
        ) : (
          <div className="text-center py-4">No blogs found</div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
