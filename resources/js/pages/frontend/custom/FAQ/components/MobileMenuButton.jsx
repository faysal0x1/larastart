export default function MobileMenuButton({ isSidebarOpen, toggleSidebar }) {
  return (
    <button
      className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
      onClick={toggleSidebar}
    >
      {isSidebarOpen ? (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )}
    </button>
  );
}