// BlogHeading.jsx
import  BlogCategory  from "./BlogCategory";

 const BlogHeading = ({ title, categories }) => {
  return (
    <div className="mb-8">
      <div className="flex gap-2 mb-3">
        {categories.map((category, index) => (
          <BlogCategory key={index} category={category} />
        ))}
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
    </div>
  );
};
export default BlogHeading;