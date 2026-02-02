interface StickySidebarProps {
  children: React.ReactNode;
}

export function StickySidebar({ children }: StickySidebarProps) {
  return (
    <div>
      {children}
    </div>
  );
}