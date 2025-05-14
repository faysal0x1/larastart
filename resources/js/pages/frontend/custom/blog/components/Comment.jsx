// Comment.jsx
const Comment = ({ comment }) => {
    return (
      <div className="py-6 border-b border-gray-100">
        <div className="flex justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img 
                src={comment.author.avatar || "/api/placeholder/50/50"} 
                alt={comment.author.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium">{comment.author.name}</h4>
              <p className="text-sm text-gray-600">{comment.date}</p>
            </div>
          </div>
          <button className="text-sm text-blue-600 hover:underline">Reply</button>
        </div>
        <div className="pl-0 md:pl-12">
          <p className="text-gray-700">{comment.content}</p>
          
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-6 space-y-6">
              {comment.replies.map((reply, index) => (
                <div key={index} className="pl-0 md:pl-6 pt-6 border-t border-gray-100">
                  <div className="flex justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img 
                          src={reply.author.avatar || "/api/placeholder/50/50"} 
                          alt={reply.author.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{reply.author.name}</h4>
                        <p className="text-sm text-gray-600">{reply.date}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pl-0 md:pl-10">
                    <p className="text-gray-700">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  export default Comment ;