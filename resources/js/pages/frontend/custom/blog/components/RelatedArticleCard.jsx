import BlogCategory from "./BlogCategory";

// RelatedArticleCard.jsx
const RelatedArticleCard = ({ article }) => {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={article.image || "/api/placeholder/300/200"} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="mb-2">
          
          <BlogCategory category={article.category} />
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{article.excerpt}</p>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img 
              src={article.author.avatar || "/api/placeholder/50/50"} 
              alt={article.author.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm">{article.author.name}</span>
        </div>
      </div>
    </div>
  );
};
export default RelatedArticleCard;