import  { useState } from "react";
import AppBar from "../components/AppBar";
import { AnimatePresence, motion } from "framer-motion";
import {
  PenLine,
  Image,
  Video,
  Link2,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const item = {
  closed: {
    opacity: 0,
    x: 0,
  },
  open: (i: number) => ({
    opacity: 1,
    x: (i + 1) * 50,
    transition: {
      delay: i * 0.1,
      duration: 0.2,
    },
  }),
};

function Create() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const menuItems = [
    { icon: PenLine, label: "Write" },
    { icon: Image, label: "Image" },
    { icon: Video, label: "Video" },
    { icon: Link2, label: "Link" },
    { icon: MoreHorizontal, label: "More" },
  ];

  const handlePublish = async () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      alert("Please sign in to publish your blog");
      navigate("/signin");
      return;
    }

    try {
      const response = await axios.post(
        "https://backend.jeevika-sirwani2003.workers.dev/api/v1/blog/create",
        {
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
      
      if (response.status === 200) {
        setTitle("");
        setDescription("");
        setIsEditing(false);
        alert("Blog published successfully!");
      }
    } catch (error) {
      console.error("Error publishing blog:", error);
      if ((error as AxiosError)?.response?.status === 401) {
        alert("Your session has expired. Please sign in again.");
        navigate("/signin");
      } else {
        alert("Failed to publish blog. Please try again.");
      }
    }
  };

  return (
    <div>
      <AppBar />
      <div className="p-6 pl-70 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          {!isEditing && (
            <div className="relative flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors z-10 bg-white"
              >
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Plus className="w-6 h-6 text-gray-700" strokeWidth={2} />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <div className="absolute left-12 flex items-center">
                    {menuItems.map((items, index) => {
                      const Icon = items.icon;
                      return (
                        <motion.button
                          key={index}
                          custom={index}
                          variants={item}
                          initial="closed"
                          animate="open"
                          exit="closed"
                          className="absolute p-2 rounded-full hover:bg-gray-100 transition-colors bg-white"
                          whileHover={{ y: -4 }}
                        >
                          <Icon className="w-6 h-6 text-gray-700" strokeWidth={2} />
                          <span className="sr-only">{items.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}

          <div className="bg-green-400 rounded-3xl h-8 w-20">
            <button
              className="pl-4 pt-1 cursor-pointer"
              onClick={handlePublish}
              disabled={!title || !description}
            >
              Publish
            </button>
          </div>
        </div>

        {/* Editor area */}
        <div 
          className="flex flex-col gap-4 mt-8"
          onClick={() => setIsEditing(true)}
        >
          {!isEditing ? (
            <div className="text-gray-400 text-2xl">Tell your story...</div>
          ) : (
            <>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title..."
                className="text-3xl font-bold focus:outline-none text-gray-700 w-full"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell your story..."
                className="w-full min-h-[200px] focus:outline-none resize-none text-gray-700 text-xl"
                autoFocus
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Create;
