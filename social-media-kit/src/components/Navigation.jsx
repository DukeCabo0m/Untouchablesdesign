export default function Navigation({ activeSection, setActiveSection }) {
  const sections = [
    { id: 'avatars', label: 'Avatars / Profils', icon: '👤' },
    { id: 'banners', label: 'Bannières / Covers', icon: '🎨' },
    { id: 'posts', label: 'Posts Carrés', icon: '📱' },
    { id: 'stories', label: 'Stories', icon: '📲' },
  ];

  return (
    <nav className="border-b-3 border-[#8B0000] bg-[#0A0A0A]/90 backdrop-blur-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-2 overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`
                px-6 py-4 font-mono text-sm uppercase tracking-wider whitespace-nowrap
                transition-all duration-200 border-b-3
                ${
                  activeSection === section.id
                    ? 'border-[#8B0000] bg-[#8B0000]/10 text-[#8B0000]'
                    : 'border-transparent hover:border-[#8B0000]/50 hover:bg-[#8B0000]/5'
                }
              `}
            >
              <span className="mr-2">{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
