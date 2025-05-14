// Comments.jsx
import  Comment  from "./Comment";

const Comments = ({ comments }) => {
  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
      <div className="divide-y divide-gray-100">
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
}; 
export default Comments ;