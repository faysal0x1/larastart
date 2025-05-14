// BlogDetails.jsx
import React from "react";
import AuthorInfoCard from "./components/AuthorInfoCard";
import BlogHeading from "./components/BlogHeading";
import BlogImage from "./components/BlogImage";
import BlogContent from "./components/BlogContent";
import ShareButtons from "./components/ShareButtons";
import Tags from "./components/Tags";
import RelatedArticles from "./components/RelatedArticles";
import Comments from "./components/Comments";
import CommentForm from "./components/CommentForm";
import TableOfContents from "./components/TableOfContents";
import NewsletterSignup from "./components/NewsletterSignup";

const BlogDetails = ({ blog }) => {
    // This would normally come from props via Inertia.js
    // We're using mock data for demonstration
    const blogData = blog || {

        title: "How to Master Modern Web Development Techniques in 2025",
        categories: ["Web Development", "Technology"],
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", // Web development image
        date: "May 9, 2025",
        author: {
            name: "Jane Developer",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2" // Professional portrait
        },

        content: (
            <>
                <h2 id="introduction">Introduction to Modern Web Development</h2>
                <p>
                    Web development has evolved significantly over the past decade. Today's developers
                    need to master a wide range of tools and techniques to build robust,
                    scalable, and user-friendly applications.
                </p>

                <p>
                    In this article, we'll explore the most important aspects of modern web development
                    and provide practical tips for mastering them.
                </p>

                <h2 id="frontend-frameworks">Frontend Frameworks in 2025</h2>
                <p>
                    Frontend frameworks continue to evolve rapidly. React remains a dominant force,
                    but with substantial improvements in its core architecture. Vue and Angular
                    have also seen significant updates that make them more compelling choices
                    for certain use cases.
                </p>

                <p>
                    The trend toward component-based architecture has become standard across
                    all major frameworks, allowing for better code organization and reusability.
                </p>

                <h2 id="backend-technologies">Backend Technologies and APIs</h2>
                <p>
                    The backend landscape has shifted toward more specialized and efficient solutions.
                    Microservices architecture continues to gain popularity, allowing teams to develop
                    and deploy independent services that together form a cohesive application.
                </p>

                <p>
                    API design has become increasingly important, with GraphQL and REST both offering
                    powerful options for different use cases. The ability to create well-designed,
                    efficient APIs is now a crucial skill for web developers.
                </p>

                <h2 id="performance-optimization">Performance Optimization Techniques</h2>
                <p>
                    Website performance remains critical for user experience and SEO. Techniques like
                    code splitting, lazy loading, and image optimization have become standard practice.
                </p>

                <p>
                    The Core Web Vitals metrics provide a structured approach to measuring and improving
                    performance, focusing on loading speed, interactivity, and visual stability.
                </p>

                <h2 id="conclusion">Conclusion</h2>
                <p>
                    Mastering modern web development requires a commitment to continuous learning and
                    adaptation. By staying current with the latest tools and techniques, developers
                    can create better experiences for users and more maintainable codebases for teams.
                </p>
            </>
        ),
        tags: ["React", "JavaScript", "Web Development", "Frontend", "Performance"],
        tableOfContents: [
            { id: "introduction", title: "Introduction to Modern Web Development" },
            { id: "frontend-frameworks", title: "Frontend Frameworks in 2025" },
            { id: "backend-technologies", title: "Backend Technologies and APIs" },
            { id: "performance-optimization", title: "Performance Optimization Techniques" },
            { id: "conclusion", title: "Conclusion" }
        ],
        relatedArticles: [
            {
                title: "10 Essential JavaScript Libraries for 2025",
                excerpt: "Discover the most powerful and useful JavaScript libraries that will help you build better web applications faster.",
                image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=300&h=200&fit=crop", // JavaScript code image
                category: "JavaScript",
                author: {
                    name: "Alex Smith",
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop" // Male developer portrait
                }
            },
            {
                title: "Getting Started with Tailwind CSS v4",
                excerpt: "Learn how to set up and use the latest version of Tailwind CSS to create beautiful, responsive user interfaces.",
                image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop", // CSS/design image
                category: "CSS",
                author: {
                    name: "Maria Rodriguez",
                    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop" // Female developer portrait
                }
            },
            {
                title: "The Future of Backend Development",
                excerpt: "Explore upcoming trends and technologies that will shape the future of backend development in the next few years.",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop", // Server/backend image
                category: "Backend",
                author: {
                    name: "John Developer",
                    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=50&h=50&fit=crop" // Male developer portrait
                }
            }
        ],
        comments: [
            {
                author: {
                    name: "Mike Johnson",
                    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=50&h=50&fit=crop" // Male portrait
                },
                date: "May 8, 2025",
                content: "This is an excellent overview of modern web development techniques. I especially appreciated the section on performance optimization.",
                replies: [
                    {
                        author: {
                            name: "Jane Developer",
                            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&h=50&fit=crop" // Professional female portrait
                        },
                        date: "May 8, 2025",
                        content: "Thanks Mike! Performance is definitely a critical aspect that every developer should focus on."
                    }
                ]
            },
            {
                author: {
                    name: "Sarah Williams",
                    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop" // Female portrait
                },
                date: "May 7, 2025",
                content: "Great article! Would love to see a follow-up piece that dives deeper into microservices architecture and best practices.",
                replies: []
            }
        ]
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-8">
                    <BlogHeading
                        title={blogData.title}
                        categories={blogData.categories}
                    />

                    <AuthorInfoCard
                        author={blogData.author}
                        date={blogData.date}
                    />

                    <div className="my-8">
                        <BlogImage
                            src={blogData.image}
                            alt={blogData.title}
                        />
                    </div>

                    <BlogContent content={blogData.content} />

                    <ShareButtons />

                    <Tags tags={blogData.tags} />

                    <hr className="my-10 border-gray-200" />

                    <NewsletterSignup />

                    <Comments comments={blogData.comments} />

                    <CommentForm />
                </div>

                {/* Sidebar */}
                <div className="hidden lg:block lg:col-span-4">
                    <TableOfContents toc={blogData.tableOfContents} />
                </div>
            </div>

            <RelatedArticles articles={blogData.relatedArticles} />
        </div>
    );
};

export default BlogDetails;