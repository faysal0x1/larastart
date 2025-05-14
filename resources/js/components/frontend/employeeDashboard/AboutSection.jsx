import { useState } from 'react';
import { Edit2 } from 'lucide-react';

const AboutSection = () => {
  const [aboutText, setAboutText] = useState(
    "Hello There, I am Faysal, a dedicated website designer, programmer, and WordPress developer. My Passion is to keep custom are satisfied. I have more than 2 years of experience in WordPress and 3 years of experience in website designing & for me, quality is better than quantity. If you come to me for your project, you will get good service and suggest tovis."
  );
  const [showModal, setShowModal] = useState(false);
  const [tempAbout, setTempAbout] = useState(aboutText);

  const handleSave = () => {
    setAboutText(tempAbout);
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">About</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
        >
          <Edit2 size={16} />
          <span>Edit</span>
        </button>
      </div>
      <p className="text-gray-600">{aboutText}</p>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-contrast-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-2xl">
            <h2 className="text-xl font-bold mb-4">Edit About Section</h2>
            <textarea
              value={tempAbout}
              onChange={(e) => setTempAbout(e.target.value)}
              rows="6"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
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

export default AboutSection;