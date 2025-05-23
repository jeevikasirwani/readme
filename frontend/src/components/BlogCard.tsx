import React from "react";

interface BlogCardIn {
  authorname: string;
  title: string;
  description: string;
  publishedDate: string;
}
function BlogCard({
  authorname,
  title,
  description,
  publishedDate,
}: BlogCardIn) {
  return (
    <>
      <div>
        <div>
          {authorname} . {publishedDate}
        </div>
      </div>
      <div>{title}</div>
      <div>{description.slice(0,100)+"..."}</div>
      <div>
        {`${Math.ceil(description.length/100)}minutes`}
      </div>
    </>
  );
}

export default BlogCard;
