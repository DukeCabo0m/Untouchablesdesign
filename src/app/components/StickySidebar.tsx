interface StickySidebarProps {
  children: React.ReactNode;
}

export function StickySidebar({ children }: StickySidebarProps) {
  return (
    <div className="sticky bottom-4 self-end">
      {/* 
        sticky bottom-4 : fixe le bas à 16px du bord inférieur du viewport
        self-end : crucial dans un conteneur flex pour que l'élément 
                   commence à "coller" par le bas
      */}
      {children}
    </div>
  );
}
