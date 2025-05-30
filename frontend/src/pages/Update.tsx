import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signin");
          return;
        }

        const response = await axios.get(
          `https://backend.jeevika-sirwani2003.workers.dev/api/v1/blog/${parseInt(id || "0", 10)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTitle(response.data.title);
        setDescription(response.data.description);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to fetch blog");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      await axios.put(
        `https://backend.jeevika-sirwani2003.workers.dev/api/v1/blog/update`,
        {
          id: parseInt(id || "0", 10),
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Blog updated successfully!");
      navigate("/blogs");
    } catch (error) {
      console.error("Error updating blog:", error);
      setError("Failed to update blog");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-3xl">
          <Skeleton className="h-12 mb-4" width="60%" /> 
          <Skeleton className="h-64" width="100%" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <AppBar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title..."
          className="text-3xl font-bold focus:outline-none text-gray-700 w-full mb-4"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell your story..."
          className="w-full min-h-[400px] focus:outline-none resize-none text-gray-700 text-xl mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            disabled={!title || !description}
            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default Update;
