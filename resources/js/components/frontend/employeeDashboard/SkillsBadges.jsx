import { useState } from 'react';
import { Edit2, Plus, BadgeCheck } from 'lucide-react';

const SkillsBadges = () => {
  const [skills, setSkills] = useState([
    "HTML5 expert",
    "JavaScript developer",
    "Bootstrap expert",
    "WordPress expert",
    "CSS3 expert",
    "jQuery expert"
  ]);

  const [badges, setBadges] = useState([
    {
      id: 1,
      name: "Online Freelancing Essentials: be a successful Fiverr seller",
      date: "Nov 2022"
    }
  ]);

  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [tempBadge, setTempBadge] = useState({
    name: "",
    date: ""
  });

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleAddBadge = () => {
    setTempBadge({
      name: "",
      date: ""
    });
    setShowBadgeModal(true);
  };

  const handleSaveBadge = () => {
    if (tempBadge.name.trim() && tempBadge.date.trim()) {
      setBadges([...badges, {...tempBadge, id: Date.now()}]);
      setShowBadgeModal(false);
    }
  };

  const handleDeleteBadge = (id) => {
    setBadges(badges.filter(badge => badge.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      {/* Skills Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Skills and expertise</h2>
          <button 
            onClick={() => setShowSkillModal(true)}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
          >
            <Edit2 size={16} />
            <span>Edit</span>
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span 
              key={index} 
              className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Badges Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Fiverr Learn badges</h2>
          <button 
            onClick={handleAddBadge}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </div>
        
        <div className="space-y-3">
          {badges.map(badge => (
            <div key={badge.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg group">
              <div className="mt-1 p-2 bg-yellow-100 rounded-full text-yellow-600">
                <BadgeCheck size={18} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{badge.name}</h3>
                <p className="text-gray-500 text-sm">{badge.date}</p>
              </div>
              <button 
                onClick={() => handleDeleteBadge(badge.id)}
                className="text-red-600 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Edit Modal */}
      {showSkillModal && (
        <div className="fixed inset-0 backdrop-contrast-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Skills</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                    <span>{skill}</span>
                    <button 
                      onClick={() => handleRemoveSkill(index)}
                      className="ml-1 text-indigo-600 hover:text-indigo-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add new skill"
                  className="flex-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <button
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSkillModal(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Badges Add Modal */}
      {showBadgeModal && (
        <div className="fixed inset-0 backdrop-contrast-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Badge</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Badge Name</label>
                <input
                  type="text"
                  value={tempBadge.name}
                  onChange={(e) => setTempBadge({...tempBadge, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="text"
                  value={tempBadge.date}
                  onChange={(e) => setTempBadge({...tempBadge, date: e.target.value})}
                  placeholder="e.g. Nov 2022"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowBadgeModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBadge}
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

export default SkillsBadges;