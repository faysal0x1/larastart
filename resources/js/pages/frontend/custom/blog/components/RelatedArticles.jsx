// RelatedArticles.jsx
import  RelatedArticleCard  from "./RelatedArticleCard";

const RelatedArticles = ({ articles }) => {
  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <RelatedArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};
export default RelatedArticles;