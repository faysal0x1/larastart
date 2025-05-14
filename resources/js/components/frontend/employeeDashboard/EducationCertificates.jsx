import { useState } from 'react';
import { Edit2, Plus, GraduationCap, Award } from 'lucide-react';

const EducationCertificates = () => {
  const [educations, setEducations] = useState([
    {
      id: 1,
      institution: "Begum Cantonment Public School and College",
      degree: "Other Degree, science",
      graduation: "Graduate 2019"
    },
    {
      id: 2,
      institution: "Daffodil International University",
      degree: "B.Sc. Degree, cyber security",
      graduation: "Graduate 2021"
    }
  ]);

  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: "LEDP's ICT Division of Bangladesh",
      year: "2019-2020",
      description: "Web Developer"
    }
  ]);

  const [showEduModal, setShowEduModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [currentEdu, setCurrentEdu] = useState(null);
  const [currentCert, setCurrentCert] = useState(null);
  const [tempEdu, setTempEdu] = useState({
    institution: "",
    degree: "",
    graduation: ""
  });
  const [tempCert, setTempCert] = useState({
    name: "",
    year: "",
    description: ""
  });

  const handleAddEdu = () => {
    setCurrentEdu(null);
    setTempEdu({
      institution: "",
      degree: "",
      graduation: ""
    });
    setShowEduModal(true);
  };

  const handleEditEdu = (edu) => {
    setCurrentEdu(edu);
    setTempEdu({...edu});
    setShowEduModal(true);
  };

  const handleSaveEdu = () => {
    if (currentEdu) {
      setEducations(educations.map(edu => 
        edu.id === currentEdu.id ? {...tempEdu, id: currentEdu.id} : edu
      ));
    } else {
      setEducations([...educations, {...tempEdu, id: Date.now()}]);
    }
    setShowEduModal(false);
  };

  const handleAddCert = () => {
    setCurrentCert(null);
    setTempCert({
      name: "",
      year: "",
      description: ""
    });
    setShowCertModal(true);
  };

  const handleEditCert = (cert) => {
    setCurrentCert(cert);
    setTempCert({...cert});
    setShowCertModal(true);
  };

  const handleSaveCert = () => {
    if (currentCert) {
      setCertifications(certifications.map(cert => 
        cert.id === currentCert.id ? {...tempCert, id: currentCert.id} : cert
      ));
    } else {
      setCertifications([...certifications, {...tempCert, id: Date.now()}]);
    }
    setShowCertModal(false);
  };

  const handleDeleteEdu = (id) => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const handleDeleteCert = (id) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Education Section */}
      <div className='w-full bg-white rounded-xl shadow-md p-6 space-y-6'>
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-xl font-bold text-gray-800">Education</h2>
          <button 
            onClick={handleAddEdu}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {educations.map(edu => (
            <div key={edu.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg group">
              <div className="mt-1 p-2 bg-indigo-100 rounded-full text-indigo-600">
                <GraduationCap size={18} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{edu.institution}</h3>
                <p className="text-gray-600 text-sm">{edu.degree}</p>
                <p className="text-gray-500 text-sm">{edu.graduation}</p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEditEdu(edu)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => handleDeleteEdu(edu.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div className='w-full bg-white rounded-xl shadow-md p-6 space-y-6'>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Certifications</h2>
          <button 
            onClick={handleAddCert}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {certifications.map(cert => (
            <div key={cert.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg group">
              <div className="mt-1 p-2 bg-green-100 rounded-full text-green-600">
                <Award size={18} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{cert.name}</h3>
                <p className="text-gray-600 text-sm">{cert.description}</p>
                <p className="text-gray-500 text-sm">{cert.year}</p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEditCert(cert)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => handleDeleteCert(cert.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education Edit Modal */}
      {showEduModal && (
        <div className="fixed inset-0 backdrop-contrast-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-2xl">
            <h2 className="text-xl font-bold mb-4">{currentEdu ? 'Edit' : 'Add'} Education</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Institution</label>
                <input
                  type="text"
                  value={tempEdu.institution}
                  onChange={(e) => setTempEdu({...tempEdu, institution: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Degree</label>
                <input
                  type="text"
                  value={tempEdu.degree}
                  onChange={(e) => setTempEdu({...tempEdu, degree: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Graduation</label>
                <input
                  type="text"
                  value={tempEdu.graduation}
                  onChange={(e) => setTempEdu({...tempEdu, graduation: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowEduModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdu}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certifications Edit Modal */}
      {showCertModal && (
        <div className="fixed inset-0 backdrop-contrast-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-2xl">
            <h2 className="text-xl font-bold mb-4">{currentCert ? 'Edit' : 'Add'} Certification</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={tempCert.name}
                  onChange={(e) => setTempCert({...tempCert, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Year</label>
                <input
                  type="text"
                  value={tempCert.year}
                  onChange={(e) => setTempCert({...tempCert, year: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={tempCert.description}
                  onChange={(e) => setTempCert({...tempCert, description: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowCertModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCert}
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

export default EducationCertificates;