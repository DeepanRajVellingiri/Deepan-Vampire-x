import { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

interface FeedbackProps {
  pageId: string;
}

export function Feedback({ pageId }: FeedbackProps) {
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState<'helpful' | 'unhelpful' | null>(null);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', { pageId, rating, comment });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-green-800 text-sm">
          Thank you for your feedback! We'll use it to improve our documentation.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-medium text-gray-900">
          Was this helpful?
        </h3>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => {
            setRating('helpful');
            setShowForm(true);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            rating === 'helpful'
              ? 'bg-green-100 text-green-800'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ThumbsUp className="h-5 w-5" />
          Yes
        </button>
        <button
          onClick={() => {
            setRating('unhelpful');
            setShowForm(true);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            rating === 'unhelpful'
              ? 'bg-red-100 text-red-800'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ThumbsDown className="h-5 w-5" />
          No
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Additional comments (optional)
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Tell us more about your experience..."
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
}