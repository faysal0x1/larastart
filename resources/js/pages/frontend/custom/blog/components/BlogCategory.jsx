// BlogCategory.jsx
const BlogCategory = ({ category }) => {
    return (
      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs inline-block">
        {category}
      </span>
    );
  };
  export default BlogCategory;