import { useState } from 'react';
import { Edit2, Video, Plus } from 'lucide-react';

const VideoIntro = () => {
  const [hasVideo, setHasVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [tempUrl, setTempUrl] = useState('');

  const handleSave = () => {
    setVideoUrl(tempUrl);
    setHasVideo(true);
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Intro video</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
        >
          {hasVideo ? <Edit2 size={16} /> : <Plus size={16} />}
          <span>{hasVideo ? 'Edit' : 'Add'} video</span>
        </button>
      </div>
      
      {hasVideo ? (
        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
          <Video size={48} className="text-gray-400" />
          <p className="ml-2 text-gray-600">Video URL: {videoUrl}</p>
        </div>
      ) : (
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <p className="text-gray-600 mb-4">
            Make a connection with potential buyers while building credibility and gaining trust.
          </p>
          <button 
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus size={16} className="mr-2" />
            Add Intro Video
          </button>
        </div>
      )}

      {/* Video Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-contrast-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{hasVideo ? 'Edit' : 'Add'} Intro Video</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Video URL</label>
                <input
                  type="text"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  placeholder="Enter video URL"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoIntro;