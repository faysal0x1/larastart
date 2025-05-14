import React, { useState, useEffect } from 'react';
import { FiClock, FiDollarSign, FiUsers, FiArrowLeft, FiEdit, FiTrash2, FiMessageSquare } from 'react-icons/fi';
// import { useParams } from 'react-router-dom';

const EmployeeJobDetails = () => {
  const id=1;
  // const { id } = useParams();
  // const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('submissions');

  // Simulate data fetching
  useEffect(() => {
    if (id) {
      setLoading(true);
      setTimeout(() => {
        const mockJobData = {
          id: parseInt(id),
          title: `Job #${id}`,
          description: `Description for job ${id}`,
          thumbnail: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          budget: 2500,
          deadline: "2023-06-20",
          totalSubmissions: 24,
          approvedSubmissions: 18,
          status: "active",
          requirements: [
            "5+ years of experience with React",
            "Proficiency in Next.js",
            "Strong UI/UX sensibilities"
          ],
          submissions: [
            { id: 1, freelancer: "Alex Johnson", date: "2023-05-15", status: "approved", rating: 4.8 },
            { id: 2, freelancer: "Sarah Williams", date: "2023-05-16", status: "approved", rating: 4.5 }
          ]
        };
        setJob(mockJobData);
        setLoading(false);
      }, 500);
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!job) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
        <a
          href={route('jobList')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <FiArrowLeft className="mr-2" /> Back to Jobs
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <a
          href={route('jobList')}
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <FiArrowLeft className="mr-2" /> Back to My Jobs
        </a>
      </div>

      {/* Job Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-8">
        <div className="h-64 overflow-hidden">
          <img src={job.thumbnail} alt={job.title} className="w-full h-full object-cover" />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
            <div className="flex space-x-2">
              <button className="p-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100">
                <FiEdit />
              </button>
              <button className="p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100">
                <FiTrash2 />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
              {job.status === 'active' ? 'Active' : 'Completed'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-3">
                <FiDollarSign size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Budget</p>
                <p className="text-lg font-semibold">${job.budget.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-3">
                <FiClock size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Deadline</p>
                <p className="text-lg font-semibold">{new Date(job.deadline).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-3">
                <FiUsers size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Submissions</p>
                <p className="text-lg font-semibold">{job.approvedSubmissions}/{job.totalSubmissions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
          <p className="text-gray-700 mb-6">{job.description}</p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Requirements</h3>
          <ul className="list-disc pl-5 mb-6 text-gray-700">
            {job.requirements.map((req, index) => (
              <li key={index} className="mb-1">{req}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Progress</h3>
          <div className="mb-6">
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
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'submissions'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Submissions ({job.submissions.length})
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'messages'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Messages
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'submissions' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Freelancer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {job.submissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{submission.freelancer}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{new Date(submission.date).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                            submission.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                          }`}>
                          {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {submission.rating ? `${submission.rating}/5.0` : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <FiMessageSquare />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="text-center py-8">
              <FiMessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No messages yet</h3>
              <p className="mt-1 text-sm text-gray-500">Start a conversation with freelancers about this job.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeJobDetails;