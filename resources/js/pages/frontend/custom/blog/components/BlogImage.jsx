// BlogImage.jsx
export const BlogImage = ({ src, alt }) => {
    return (
      <div className="rounded-xl overflow-hidden mb-8">
        <img 
          src={src || "/api/placeholder/800/400"} 
          alt={alt} 
          className="w-full h-auto object-cover"
        />
      </div>
    );
  };
  export default BlogImage ;