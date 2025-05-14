// TableOfContents.jsx
import React from "react";

const TableOfContents = ({ toc }) => {
  if (!toc || toc.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 p-6 bg-gray-50 rounded-lg sticky top-8">
      <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
      <ul className="space-y-3">
        {toc.map((item, index) => (
          <li key={index}>
            <a 
              href={`#${item.id}`} 
              className="text-blue-600 hover:underline"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;