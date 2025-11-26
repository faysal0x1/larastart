

import { useState } from "react"
import { usePage, router } from '@inertiajs/react'

import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import RenderedContent from '@/components/RenderedContent';

const ReviewCard = ({ review, onHelpful }) => {
    const [isHelpful, setIsHelpful] = useState(false);
    const [helpfulCount, setHelpfulCount] = useState(review.helpful);

    const handleHelpful = () => {
        if (!isHelpful) {
            setIsHelpful(true);
            setHelpfulCount(helpfulCount + 1);
            onHelpful && onHelpful(review.id);
        }
    };

    return (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-2 flex items-center justify-between">
                <div>
                    <h4 className="font-semibold text-gray-900">{review.title}</h4>
                    <div className="flex items-center text-sm text-gray-500">
                        {review.verified && (
                            <span className="mr-2 rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                                Verified Owner
                            </span>
                        )}
                        <span>{review.author}</span> · <span>{review.date}</span>
                    </div>
                </div>
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-5 w-5 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Content */}
            <p className="mb-3 text-sm text-gray-700">{review.content}</p>

            {/* Pros & Cons */}
            {review.pros && review.cons && (
                <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-2">
                    {review.pros.length > 0 && (
                        <div>
                            <h5 className="font-medium text-green-600">Pros</h5>
                            <ul className="list-disc pl-5 text-sm text-gray-700">
                                {review.pros.map((pro, i) => (
                                    <li key={i}>{pro}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {review.cons.length > 0 && (
                        <div>
                            <h5 className="font-medium text-red-600">Cons</h5>
                            <ul className="list-disc pl-5 text-sm text-gray-700">
                                {review.cons.map((con, i) => (
                                    <li key={i}>{con}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {/* Helpful button */}
            <button
                onClick={handleHelpful}
                disabled={isHelpful}
                className={`rounded-md border px-3 py-1 text-sm transition-colors ${isHelpful
                    ? 'bg-green-100 text-green-700 border-green-300'
                    : 'text-gray-600 hover:bg-gray-100 border-gray-300'
                    }`}
            >
                👍 Helpful ({helpfulCount})
            </button>
        </div>
    );
};

const ReviewForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        content: '',
        rating: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.rating === 0) {
            alert('Please select a rating');
            return;
        }

        const review = {
            ...formData,
            id: Date.now(),
            verified: true,
            date: new Date().toLocaleDateString(),
            author: '', // Will be set by backend
            title: '', // Not used in our schema
            pros: [], // Not used in our schema
            cons: [], // Not used in our schema
            helpful: 0
        };

        onSubmit(review);
        setFormData({ content: '', rating: 0 });
    };

    return (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Write a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating *</label>
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setFormData({ ...formData, rating: star })}
                                className="focus:outline-none"
                            >
                                <Star
                                    className={`h-6 w-6 ${star <= formData.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Review *</label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={4}
                        placeholder="Share your experience with this product..."
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        required
                    />
                </div>

                <div className="flex space-x-3">
                    <button
                        type="submit"
                        className="bg-blue-600 px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Submit Review
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

const QuestionForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        question: '',
        author: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.question.trim()) {
            alert('Please enter a question');
            return;
        }

        const newQuestion = {
            id: Date.now(),
            q: formData.question,
            a: '', // No answer yet
            author: formData.author || 'Anonymous',
            date: new Date().toLocaleDateString(),
            hasAnswer: false
        };

        onSubmit(newQuestion);
        setFormData({ question: '', author: '' });
    };

    return (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Ask a Question</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name (Optional)</label>
                    <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        placeholder="Enter your name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Question</label>
                    <textarea
                        value={formData.question}
                        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                        rows={4}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        placeholder="Ask a question about this product..."
                        required
                    />
                </div>

                <div className="flex space-x-3">
                    <button
                        type="submit"
                        className="bg-blue-600 px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Submit Question
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

const QuestionCard = ({ question }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [reply, setReply] = useState('');
    const [answers, setAnswers] = useState(question.answers || []);

    const handleReply = (e) => {
        e.preventDefault();
        if (!reply.trim()) return;

        const newAnswer = {
            id: Date.now(),
            answer: reply,
            author: 'Admin', // In a real app, this would be the logged-in user
            date: new Date().toLocaleDateString(),
            isOfficial: true
        };

        setAnswers([...answers, newAnswer]);
        setReply('');
        setShowReplyForm(false);
    };

    return (
        <div className="border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-4 transition-shadow duration-300 hover:shadow-lg md:p-6">
            <div className="mb-3 flex items-start gap-2 text-base font-bold text-gray-900 md:mb-4 md:gap-3 md:text-lg">
                <span className="text-lg text-blue-600 md:text-xl">Q:</span>
                <span className="flex-1">{question.q}</span>
            </div>

            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <span>Asked by {question.author}</span>
                <span>·</span>
                <span>{question.date}</span>
            </div>

            {answers.length > 0 ? (
                <div className="space-y-3">
                    {answers.map((answer, index) => (
                        <div key={answer.id} className="pl-6 text-sm leading-relaxed text-gray-700 md:pl-8 md:text-base">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-green-700">
                                    {answer.isOfficial ? 'Official Answer' : 'Answer'}:
                                </span>
                                <span className="text-xs text-gray-500">
                                    by {answer.author} · {answer.date}
                                </span>
                            </div>
                            <p>{answer.answer}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="pl-6 text-sm text-gray-500 md:pl-8">
                    No answers yet. Be the first to answer!
                </div>
            )}

            <div className="mt-4 pl-6 md:pl-8">
                <button
                    onClick={() => setShowReplyForm(!showReplyForm)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                    {showReplyForm ? 'Cancel Reply' : 'Reply to this question'}
                </button>

                {showReplyForm && (
                    <form onSubmit={handleReply} className="mt-3 space-y-3">
                        <textarea
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            rows={3}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                            placeholder="Write your answer..."
                        />
                        <div className="flex space-x-2">
                            <button
                                type="submit"
                                className="bg-green-600 px-3 py-1 text-xs font-medium text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                Submit Answer
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowReplyForm(false)}
                                className="bg-gray-300 px-3 py-1 text-xs font-medium text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default function ProductTabs({ activeTab, onTabChange }) {
    const { props, flash } = usePage();
    const dbProduct = props?.products;

    // Build Specs from backend spec_values -> grouped table rows
    const dbSpecs = (() => {
        // First try specs_by_group from the product data
        if (dbProduct?.specs_by_group) {
            const specsByGroup = {};
            Object.entries(dbProduct.specs_by_group).forEach(([groupName, attributes]) => {
                const rows = Object.entries(attributes).map(([label, value]) => ({
                    label,
                    value: String(value)
                }));
                specsByGroup[groupName] = rows;
            });
            return specsByGroup;
        }

        // Fallback to spec_values if specs_by_group is not available
        const specValues = dbProduct?.spec_values;
        if (!Array.isArray(specValues) || specValues.length === 0) return null;
        const rows = specValues
            .filter((sv) => sv && sv.attribute && sv.attribute.name)
            .map((sv) => ({ label: sv.attribute.name, value: sv.value }))
            .filter((r) => r.label || r.value);
        if (rows.length === 0) return null;
        return { Specifications: rows };
    })();

    // Get long description from backend data
    const longDescription = dbProduct?.long_descp || dbProduct?.short_descp || null;

    // Get product specifications data from backend
    const productSpecsData = dbProduct?.product_specs_data || null;

    const product = {
        overview: [
            // Long Description Section
            ...(longDescription ? [{
                type: "description",
                title: "Product Description",
                content: longDescription,
            }] : []),

        ],
        // specs: dbSpecs || {
        //     "Audio Specifications": [
        //         { label: "Driver Size", value: "40mm Dynamic" },
        //         { label: "Frequency Response", value: "20Hz - 20kHz" },
        //         { label: "Impedance", value: "32 Ohms" },
        //         { label: "Sensitivity", value: "105 dB SPL" },
        //     ],
        //     Connectivity: [
        //         { label: "Bluetooth Version", value: "5.3" },
        //         { label: "Codecs Supported", value: "SBC, AAC, aptX HD" },
        //         { label: "Range", value: "30 feet (10m)" },
        //         { label: "Multipoint Connection", value: "Yes (2 devices)" },
        //     ],
        //     "Physical Specifications": [
        //         { label: "Weight", value: "280g" },
        //         { label: "Dimensions", value: "7.9 x 6.7 x 3.2 inches" },
        //         { label: "Foldable Design", value: "Yes" },
        //         { label: "Color Options", value: "Black, Silver, Rose Gold" },
        //     ],
        // },
        // qa: [
        //     {
        //         q: "How long does it take to fully charge the headphones?",
        //         a: "The headphones take approximately 2 hours to fully charge from 0%. A quick 15-minute charge provides up to 3 hours of playback time.",
        //     },
        //     {
        //         q: "Are these headphones compatible with all devices?",
        //         a: "Yes, these headphones work with any Bluetooth-enabled device including smartphones, tablets, laptops, and gaming consoles.",
        //     },
        //     {
        //         q: "Can I use them while exercising?",
        //         a: "While they're not specifically designed for sports, they have an IPX4 water resistance rating, making them suitable for light workouts and protection against sweat.",
        //     },
        // ],
    }

    // Get reviews from database or fallback to demo reviews
    const dbReviews = dbProduct?.product_reviews?.map(review => ({
        id: review.id,
        author: review.user?.name || 'Anonymous',
        verified: true,
        date: new Date(review.created_at).toLocaleDateString(),
        title: '', // We don't have title in our DB schema
        rating: parseInt(review.rating),
        pros: [], // We don't have pros in our DB schema
        cons: [], // We don't have cons in our DB schema
        content: review.comment,
        helpful: 0, // We don't have helpful count in our DB schema
    })) || [];

    const [userReviews, setUserReviews] = useState(dbReviews);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [questions, setQuestions] = useState(product.qa || []);
    const [showQuestionForm, setShowQuestionForm] = useState(false);

    const handleAddReview = (newReview) => {
        // Use Inertia router to submit the review
        router.post(`/product/${dbProduct?.id}/review`, {
            comment: newReview.content,
            rating: newReview.rating,
            images: null,
        }, {
            onSuccess: (page) => {
                // The page will be refreshed with the new review data
                setShowReviewForm(false);
            },
            onError: (errors) => {
                console.error('Error submitting review:', errors);
            },
            preserveState: false, // This will refresh the page to get updated data
        });
    };

    const handleAddQuestion = (newQuestion) => {
        setQuestions([newQuestion, ...questions]);
        setShowQuestionForm(false);
    };

    return (
        <div className="mt-8 md:mt-16">
            {/* Simplified Tabs */}
            <div className="border-b border-gray-200 bg-white">
                <div className="flex gap-8 overflow-x-auto p-4 md:p-6">
                    {["Overview", ...(productSpecsData ? ["Product Specification"] : []), "Reviews", "Q&A"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => onTabChange(tab)}
                            className={`whitespace-nowrap pb-2 text-sm font-medium transition-all duration-200 md:text-base ${activeTab === tab
                                ? "font-bold text-gray-900 border-b-2 border-blue-600"
                                : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab content */}
            <div className="border border-t-0 border-gray-200 bg-white p-4 md:p-8">
                {activeTab === "Overview" && Array.isArray(product.overview) && product.overview.length > 0 && (
                    <div className="space-y-8 md:space-y-12">
                        {product.overview.map((block, idx) => {
                            if (block.type === "description") {
                                return (
                                    <div
                                        key={idx}
                                        className="border border-gray-200 bg-white p-6 shadow-sm md:p-8"
                                    >
                                        <h3 className="mb-4 text-xl font-bold text-gray-900 md:mb-6 md:text-2xl">
                                            {block.title}
                                        </h3>
                                        <div
                                            className="prose prose-sm max-w-none text-gray-700 md:prose-base"
                                            dangerouslySetInnerHTML={{ __html: block.content }}
                                        />
                                    </div>
                                )
                            }

                            // Fallback renderer for any unknown/malformed blocks
                            return (
                                <div
                                    key={idx}
                                    className="border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-4 transition-shadow duration-300 hover:shadow-lg md:p-6"
                                >
                                    {block.image && (
                                        <div className="mb-4 overflow-hidden md:mb-6">
                                            <img
                                                src={block.image || "/placeholder.svg"}
                                                alt={block.title || `overview-${idx}`}
                                                className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    {block.title && (
                                        <div className="mb-2 text-lg font-bold text-gray-900 md:mb-3 md:text-xl">{block.title}</div>
                                    )}
                                    {block.desc && <div className="text-sm leading-relaxed text-gray-700 md:text-base">{block.desc}</div>}
                                </div>
                            )
                        })}
                    </div>
                )}

                {activeTab === "Product Specification" && productSpecsData && (
                    <div className="space-y-6 md:space-y-8">
                        <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 md:px-6 md:py-4 border-b border-gray-200">
                                <h3 className="text-base font-bold text-gray-900 md:text-lg flex items-center gap-2">
                                    Product Specification
                                </h3>
                            </div>
                            <div className="p-4 md:p-6">
                                <RenderedContent
                                    html={productSpecsData}
                                    className="prose-sm md:prose-base prose-headings:text-gray-900 prose-a:text-blue-600 prose-strong:text-gray-900 prose-p:text-gray-700"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "Specs" && product.specs && (
                    <div className="space-y-6 md:space-y-8">
                        {Object.entries(product.specs).map(([group, rows]) => (
                            <div key={group} className="overflow-hidden border border-gray-200 bg-white shadow-sm">
                                <div className="bg-gray-100 px-4 py-3 md:px-6 md:py-4 border-b border-gray-200">
                                    <h3 className="text-base font-bold text-gray-900 md:text-lg">{group}</h3>
                                </div>
                                <div className="p-0">
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-full text-left">
                                            <tbody>
                                                {rows.map((r, idx) => (
                                                    <tr
                                                        key={idx}
                                                        className="border-b border-gray-100 transition-colors duration-200 last:border-b-0 hover:bg-gray-50"
                                                    >
                                                        <th className="w-1/3 bg-gray-50 p-3 text-xs font-semibold text-gray-700 md:p-4 md:text-sm border-r border-gray-200">
                                                            {r.label}
                                                        </th>
                                                        <td className="p-3 text-xs text-gray-900 md:p-4 md:text-sm">{r.value}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "Reviews" && (
                    <div>
                        {/* Success/Error Messages */}
                        {flash?.success && (
                            <div className="mb-4 rounded-md bg-green-50 p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-green-800">
                                            {flash.success}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {flash?.error && (
                            <div className="mb-4 rounded-md bg-red-50 p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-red-800">
                                            {flash.error}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                            <h3 className="text-2xl font-bold text-gray-900">
                                Customer Reviews ({userReviews.length})
                            </h3>
                            <button
                                onClick={() => setShowReviewForm(!showReviewForm)}
                                className="bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 rounded-md"
                            >
                                {showReviewForm ? 'Cancel' : 'Write a Review'}
                            </button>
                        </div>

                        {showReviewForm && (
                            <ReviewForm
                                onSubmit={handleAddReview}
                                onCancel={() => setShowReviewForm(false)}
                            />
                        )}

                        {userReviews.map((review) => (
                            <ReviewCard key={review.id} review={review} onHelpful={() => { }} />
                        ))}
                    </div>
                )}

                {activeTab === "Q&A" && (
                    <div className="space-y-4 md:space-y-6">
                        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center md:mb-8">
                            <h3 className="text-lg font-bold text-gray-900 md:text-xl">
                                Questions & Answers ({questions.length})
                            </h3>
                            <button
                                onClick={() => setShowQuestionForm(!showQuestionForm)}
                                className="bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 md:px-6 md:py-3 md:text-base rounded-md"
                            >
                                {showQuestionForm ? 'Cancel' : 'Ask a Question'}
                            </button>
                        </div>

                        {showQuestionForm && (
                            <QuestionForm
                                onSubmit={handleAddQuestion}
                                onCancel={() => setShowQuestionForm(false)}
                            />
                        )}

                        {questions.map((item, i) => (
                            <QuestionCard key={i} question={item} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}
