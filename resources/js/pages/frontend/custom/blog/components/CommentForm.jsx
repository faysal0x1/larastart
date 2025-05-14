// CommentForm.jsx
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CommentForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, comment });
    setSubmitted(true);
    // Reset form
    setName("");
    setEmail("");
    setComment("");
  };

  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-6">Leave a Comment</h2>
      
      {submitted && (
        <Alert className="mb-6 bg-green-50 border-green-100">
          <AlertDescription>
            Your comment has been submitted and is awaiting moderation.
          </AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Name*
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email*
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label htmlFor="comment" className="block mb-2 text-sm font-medium">
            Comment*
          </label>
          <textarea
            id="comment"
            rows="6"
            value={comment}
            onChange={e => setComment(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
};
export default CommentForm;