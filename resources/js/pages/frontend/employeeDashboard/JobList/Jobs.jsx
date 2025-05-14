import React, { useState } from 'react';
import { FiClock, FiDollarSign, FiUsers, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';

const Jobs = () => {
  // const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;
  // Sample job data - replace with your actual data
  const allJobs = [
    // ... (keep your existing job data array)
    // Adding more sample jobs to demonstrate pagination
    {
      id: 1,
      title: "Website Redesign with React",
      thumbnail: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      budget: 2500,
      deadline: "2023-06-20",
      totalSubmissions: 24,
      approvedSubmissions: 18,
      status: "active"
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      budget: 1800,
      deadline: "2023-06-15",
      totalSubmissions: 15,
      approvedSubmissions: 8,
      status: "active"
    },
    {
      id: 3,
      title: "Content Writing for Blog",
      thumbnail: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      budget: 800,
      deadline: "2023-06-10",
      totalSubmissions: 32,
      approvedSubmissions: 25,
      status: "completed"
    },
    {
      id: 4,
      title: "Social Media Marketing",
      thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      budget: 1200,
      deadline: "2023-06-25",
      totalSubmissions: 20,
      approvedSubmissions: 12,
      status: "active"
    },
    {
      id: 5,
      title: "Logo Design",
      thumbnail: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      budget: 500,
      deadline: "2023-06-18",
      totalSubmissions: 15,
      approvedSubmissions: 5,
      status: "active"
    },
    {
      id: 6,
      title: "SEO Optimization",
      thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      budget: 900,
      deadline: "2023-06-12",
      totalSubmissions: 8,
      approvedSubmissions: 6,
      status: "completed"
    }
  ];




   // Pagination logic
   const indexOfLastJob = currentPage * jobsPerPage;
   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
   const currentJobs = allJobs.slice(indexOfFirstJob, indexOfLastJob);
   const totalPages = Math.ceil(allJobs.length / jobsPerPage);
 
   const navigateToJobDetails = (jobId) => {
     navigate(`/my-job-details/${jobId}`);
   };

   return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Job Postings</h1>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div 
              className="h-48 overflow-hidden cursor-pointer"
              onClick={() => navigateToJobDetails(job.id)}
            >
              <img
                src={job.thumbnail}
                alt={job.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Job Info */}
            <div className="p-5">
              <h3
                className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer"
                onClick={() => navigateToJobDetails(job.id)}
              >
                {job.title}
              </h3>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Submissions: {job.approvedSubmissions}/{job.totalSubmissions}</span>
                  <span>{Math.round((job.approvedSubmissions / (job.totalSubmissions || 1)) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${(job.approvedSubmissions / (job.totalSubmissions || 1)) * 100}%`,
                      transition: 'width 0.3s ease'
                    }}
                  ></div>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <FiDollarSign className="mr-1" />
                  <span>${job.budget.toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <FiClock className="mr-1" />
                  <span>{new Date(job.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <FiUsers className="mr-1" />
                  <span className={`${job.status === 'completed' ? 'text-green-600' : 'text-blue-600'}`}>
                    {job.status === 'completed' ? 'Completed' : 'Active'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{indexOfFirstJob + 1}</span> to{' '}
          <span className="font-medium">
            {Math.min(indexOfLastJob, allJobs.length)}
          </span>{' '}
          of <span className="font-medium">{allJobs.length}</span> jobs
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`flex items-center px-3 py-1 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <FiChevronLeft className="mr-1" />
            Previous
          </button>

          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`w-8 h-8 flex items-center justify-center rounded-md ${currentPage === number ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {number}
              </button>
            ))}
          </div>

          <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`flex items-center px-3 py-1 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            Next
            <FiChevronRight className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Jobs;