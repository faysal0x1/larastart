import React, { useState } from 'react';
import HeroSlider from './components/HeroSlider';
import FeaturedTagsNav from './components/FeaturedTagsNav';
import BlogPostCard from './components/BlogPostCard';
import AuthorProfile from './components/AuthorProfile';
import Pagination from './components/Pagination';
import Newsletter from './components/Newsletter';
import RecentExperience from './components/RecentExperience';
import Partners from './components/Partners';



// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: 'How Tech Shapes the Future of Work in 2024',
    excerpt: 'To explore transformative work and how the traditional office has become obsolete...',
    date: 'October 15, 2024',
    author: 'Ethan Caldwell',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['Future', 'Tech']
  },
  {
    id: 2,
    title: 'The Future of Work: Tech and Remote Trends',
    excerpt: 'Explore how a paradigm shift has provided new opportunities for individuals...',
    date: 'September 28, 2024',
    author: 'Ethan Caldwell',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['Work', 'Remote']
  },
  {
    id: 3,
    title: 'Remote Work Trends in the Digital Age',
    excerpt: 'Discover the rapidly changing work culture, provider, and more convenient in 2024...',
    date: 'September 27, 2024',
    author: 'Ethan Caldwell',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['Work', 'Remote']
  },
  {
    id: 4,
    title: 'Business Travel Trends for the Digital Age',
    excerpt: 'Exploring new business travel trends in light of recent shifts to rely on digital communications...',
    date: 'September 25, 2024',
    author: 'Ethan Caldwell',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['Business']
  },
  {
    id: 5,
    title: 'Key Sports Trends for 2024: From AI to Virtual Reality',
    excerpt: 'How new fan key sports trends like AI and virtual reality are to define the sports industry in 2024...',
    date: 'September 20, 2024',
    author: 'Ethan Caldwell',
    image: 'https://images.unsplash.com/photo-1543357480-c60d400e7ef6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['Sports']
  },
  {
    id: 6,
    title: 'The Impact of Automation on Business Management Efficiency',
    excerpt: 'Examining how automation is enhancing business management efficiency and helping to increase...',
    date: 'September 18, 2024',
    author: 'Ethan Caldwell',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['Management']
  },
  {
    id: 7,
    title: 'Startups Disrupting the Sports Industry with Innovative Tech',
    excerpt: 'Discover how startups are leveraging technology to transform traditional sports experiences...',
    date: 'September 15, 2024',
    author: 'Ethan Caldwell',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['Sports']
  },
  {
    id: 8,
    title: 'Travel Trends in 2024: Virtual Tours and Immersive Experiences',
    excerpt: 'Looking at how digital innovation is reshaping travel and tourism in 2024...',
    date: 'September 10, 2024',
    author: 'Ethan Caldwell',
    image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['Travel']
  },
  {
    id: 9,
    title: 'Why Data Security is a Priority for Business Management in 2024',
    excerpt: 'Examining why data security has become essential for business management in today\'s digital world...',
    date: 'September 5, 2024',
    author: 'Ethan Caldwell',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['Business']
  },
  {
    id: 10,
    title: 'Startups and AI: How Artificial Intelligence Drives Innovation',
    excerpt: 'How new startups are harnessing the power of AI to drive business growth and creative solutions...',
    date: 'September 1, 2024',
    author: 'Ethan Caldwell',
    image: 'https://images.unsplash.com/photo-1677442135136-760c813a743e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['Startups', 'AI']
  },
  {
    id: 11,
    title: 'Top Business Management Software Solutions of 2024',
    excerpt: 'Learn about the top management software solutions driving efficiency and growth in businesses...',
    date: 'August 25, 2024',
    author: 'Ethan Caldwell',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['Management']
  },
  {
    id: 12,
    title: 'How iOS Technology Will Impact the Travel Industry in 2024',
    excerpt: 'Discover how iOS advancements are driving travel innovations, connectivity, and enhanced travel experiences...',
    date: 'August 20, 2024',
    author: 'Ethan Caldwell',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['Technology']
  },
  {
    id: 13,
    title: 'Startups and AI: How Artificial Intelligence Drives Innovation',
    excerpt: 'How new startups are harnessing the power of AI to drive business growth and creative solutions...',
    date: 'September 1, 2024',
    author: 'Ethan Caldwell',
    image: 'https://images.unsplash.com/photo-1677442135136-760c813a743e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['Startups', 'AI']
  },
  {
    id: 14,
    title: 'Top Business Management Software Solutions of 2024',
    excerpt: 'Learn about the top management software solutions driving efficiency and growth in businesses...',
    date: 'August 25, 2024',
    author: 'Ethan Caldwell',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['Management']
  },
  {
    id: 15,
    title: 'How iOS Technology Will Impact the Travel Industry in 2024',
    excerpt: 'Discover how iOS advancements are driving travel innovations, connectivity, and enhanced travel experiences...',
    date: 'August 20, 2024',
    author: 'Ethan Caldwell',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['Technology']
  }
];


// Author data
const authorData = {
  name: 'Ethan Caldwell',
  title: 'Technology and Design Enthusiast',
  bio: 'A writer with a passion for technology insights and reflections on life, culture, and creativity. Currently based in San Francisco.',
  avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&facepad=3&fit=facearea',
  social: {
    twitter: 'https://twitter.com',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:example@domain.com'
  }
};

const BlogPage = () => {
  // pegination 
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // Calculate current posts to display
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  return (
    <div className="bg-white">
      {/* Hero Slider Section */}
      <section className="max-w-8xl mx-auto px-4 sm:px-6">
        <HeroSlider />
      </section>

      {/* Featured Tags Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <h2 className="text-center text-sm uppercase tracking-wider text-gray-500 mb-3">
          Popular Category Choice
        </h2>
        <FeaturedTagsNav />
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Pagination */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </section>

      {/* Newsletter Subscription */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 my-8 bg-gray-50 rounded-lg">
        <Newsletter />
      </section>

      {/* Author Profile */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="lg:grid lg:grid-cols-3 gap-6">
          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-3">Recent Experience</h2>
            <RecentExperience />
          </div>
          <div>
            <AuthorProfile author={authorData} />
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <h2 className="text-lg font-semibold mb-3">Partners</h2>
        <Partners />
      </section>
    </div>
  );
};

export default BlogPage;