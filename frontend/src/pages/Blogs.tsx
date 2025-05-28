import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Spinners from "react-loader-spinner";

interface BackendPostResponse {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  userId: string;
  User: {
    username: string;
  };
}

interface BackendResponse {
  success: boolean;
  data: {
    posts: BackendPostResponse[];
  };
  error?: string;
}

function Blogs() {
  const [posts, setPosts] = useState<BackendPostResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessionAndPosts = async () => {
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

        const result: BackendResponse = response.data;
        console.log("API result:", result);

        if (!result.success || result.data?.posts) {
          setError(result.error || "failed");
          return;
        }

        const formattedPosts: BackendPostResponse[] = result.data.posts.map(
          (post: BackendPostResponse) => ({
            id: post.id,
            title: post.title,
            description: post.description,
            createdAt: post.createdAt,
            userId: post.userId,
            User: {
              username: post.User?.username || "Unknown",
            },
          })
        );

        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching session or posts:", error);
        setError("An error occurred while fetching posts.");
        navigate("/signup");
      } finally {
        setLoading(false);
      }
    };

    fetchSessionAndPosts();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Spinners.Oval
          visible={true}
          height={50}
          width={50}
          color="#000000"
          secondaryColor="#000000"
          strokeWidth={3}
          strokeWidthSecondary={4}
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-grow p-4 sm:p-6 md:p-8 max-w-4xl mx-auto w-full">
        <div>
          {posts
            .slice()
            .reverse()
            .map((posts) => (
              <BlogCard
                key={posts.id}
                authorname={posts.User?.username}
                publishedDate={posts.createdAt}
                title={posts.title}
                description={posts.description}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
