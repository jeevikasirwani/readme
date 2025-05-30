import React from "react";
import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";

function AppBar() {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/blogs/create");
  };

  return (
    <div className="border-b border-gray-200 flex justify-between px-10 py-4">
      <div className="font-bold text-3xl text-gray-700">Medium</div>
      
      <div className="flex flex-row items-center gap-4">
        <button
          onClick={handleCreate}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Create new post"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-gray-600"
          >
            <path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path>
          </svg>
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
        <Avatar />
      </div>
    </div>
  );
}

export default AppBar;
