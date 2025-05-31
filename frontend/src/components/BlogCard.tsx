// import React from "react";
import Avatar from "./Avatar";
import { BookMarked, CircleEllipsis, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BlogCardIn {
  authorname: string;
  title: string;
  description: string;
  publishedDate: string;
  id: string;
}

function BlogCard({
  authorname,
  title,
  description,
  publishedDate,
  id,
}: BlogCardIn) {
  const navigate = useNavigate();
  const time: number = Math.ceil(description.length / 100);
  const url: string = "https://random.imagecdn.app/150/150";

const month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Make sure it's a valid date: if publishedDate is undefined, use Date.now()
const date = new Date(publishedDate || Date.now());

// Fallback if date is invalid (e.g. new Date('') gives 'Invalid Date')
const isValidDate = !isNaN(date.getTime());

const month = isValidDate ? date.getMonth() : new Date().getMonth();
const day = isValidDate ? date.getDate() : new Date().getDate();
const year = isValidDate ? date.getFullYear() : new Date().getFullYear();
const monthString = month_names_short[month];

  const handleUpdate = () => {
    navigate(`/blogs/update/${id}`);  
  };

  return (
    <div className="flex flex-col sm:flex-row border-b border-gray-200 py-6">
        <div className="flex-grow pr-4">
            <div className="flex items-center">
                <Avatar name={authorname} size={32}/>
                <span className="ml-2 text-sm font-medium">{authorname}</span>
                <span className="ml-2 text-sm text-gray-500">{`${monthString} ${day} , ${year}`}</span>
            </div>
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <div className="mb-4 overflow-hidden line-clamp-3 text-gray-700">{description}</div>
            <div className="flex justify-between items-center text-sm text-gray-500">
                <span >{time} min read</span>
                <div className="flex space-x-2"
                >
             <BookMarked strokeWidth={1.5} />
            <button onClick={handleUpdate}> <Pencil strokeWidth={1.5} /></button> 
             <CircleEllipsis strokeWidth={1.5} />
             </div>
            </div>
        </div>
        <div className="w-full sm:w-52 h-auto sm:h-34 mt-4 sm:mt-0 flex-shrink-0">
          <img src={url} alt="Blog post" className="w-full h-full object-cover" />
        </div>
    </div>
  );
}

export default BlogCard;
