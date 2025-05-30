import React, { useState } from "react";
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
import axios from "axios";
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

  const menuItems = [
    { icon: PenLine, label: "Write" },
    { icon: Image, label: "Image" },
    { icon: Video, label: "Video" },
    { icon: Link2, label: "Link" },
    { icon: MoreHorizontal, label: "More" },
  ];

  return (
    <div>
      <AppBar />
      <div className="p-6 pl-70 flex flex-row justify-between">
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
            <div className="text-gray-400">
                
            Tell Your story...
        </div>
        {/* publish div */}
        <div className=" bg-green-400 rounded-3xl h-8 w-20">
          <button
            className="pl-4 pt-1 cursor-pointer"
            onClick={() =>
              axios.post(
                "https://backend-jeevikahttps://backend.jeevika-sirwani2003.workers.dev"
              )
            }
          >
            Publish
          </button>
        </div>


    
      </div>
    </div>
  );
}

export default Create;
