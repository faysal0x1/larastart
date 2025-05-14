// Tags.jsx
const Tags = ({ tags }) => {
    return (
      <div className="my-8">
        <h3 className="text-lg font-semibold mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-4 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 cursor-pointer transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  };
  export default Tags ;