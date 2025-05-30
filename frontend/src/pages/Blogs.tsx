import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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
          <div key={index} className="border-b border-gray-200 py-6">
            <div className="flex items-center mb-4">
              <Skeleton circle width={32} height={32} />
              <div className="ml-2 flex-grow">
                <Skeleton width={120} />
              </div>
              <Skeleton width={100} />
            </div>
            <Skeleton height={32} width="80%" className="mb-4" />
            <Skeleton height={200} className="mb-4" />
            <div className="space-y-2 mb-4">
              <Skeleton count={3} />
            </div>
            <div className="flex justify-between items-center">
              <Skeleton width={60} />
              <div className="flex space-x-2">
                <Skeleton width={20} height={20} />
                <Skeleton width={20} height={20} />
                <Skeleton width={20} height={20} />
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
