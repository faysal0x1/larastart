// BlogContent.jsx
import React from "react";

const BlogContent = ({ content }) => {
  return (
    <div className="prose prose-lg max-w-none">
      {content}
    </div>
  );
};

export default BlogContent;