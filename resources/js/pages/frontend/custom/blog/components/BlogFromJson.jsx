// Example of how to handle JSON response with HTML content
import React, { useEffect, useState } from "react";
import parse from 'html-react-parser'; // You'll need to install this package

/**
 * This function demonstrates how to handle JSON response where content is HTML string
 * and extract headings to create a table of contents
 */
const processJsonContent = (jsonResponse) => {
  // 1. Parse HTML content from JSON response
  const htmlContent = jsonResponse.content; // Assuming content is a HTML string in your JSON
  
  // 2. Extract headings and create TOC
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const toc = [];
  
  // Process each heading
  headings.forEach((heading, index) => {
    // Generate ID if not present
    if (!heading.id) {
      const headingText = heading.textContent;
      const id = headingText
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');
      
      heading.id = id;
    }
    
    // Add to TOC
    toc.push({
      id: heading.id,
      title: heading.textContent
    });
  });
  
  // 3. Return modified HTML content and TOC
  return {
    htmlWithIds: tempDiv.innerHTML,
    tableOfContents: toc
  };
};

// Example component using the function above
const BlogFromJson = ({ jsonResponse }) => {
  const [content, setContent] = useState("");
  const [toc, setToc] = useState([]);
  
  useEffect(() => {
    if (jsonResponse) {
      const { htmlWithIds, tableOfContents } = processJsonContent(jsonResponse);
      setContent(htmlWithIds);
      setToc(tableOfContents);
    }
  }, [jsonResponse]);
  
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8">
          <div className="prose prose-lg max-w-none">
            {parse(content)} {/* Convert HTML string to React components */}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="hidden lg:block lg:col-span-4">
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
        </div>
      </div>
    </div>
  );
};

export default BlogFromJson;