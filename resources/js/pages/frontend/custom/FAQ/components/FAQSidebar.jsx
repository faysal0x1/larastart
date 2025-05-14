export default function FAQSidebar({ 
  sections, 
  activeSection, 
  setActiveSection,
  isSidebarOpen,
  closeSidebar
}) {
  return (
    <aside className={`
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
      md:translate-x-0 transform transition-transform duration-200 ease-in-out
      fixed md:static w-72 h-full bg-white border-r border-gray-200 z-40 shadow-md
    `}>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">FAQs for Freelancers</h1>
        <nav>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section}>
                <button
                  onClick={() => {
                    setActiveSection(section);
                    closeSidebar();
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {section}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}