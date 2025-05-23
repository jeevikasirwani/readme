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
      <div>{description}</div>
    </>
  );
}

export default BlogCard;
