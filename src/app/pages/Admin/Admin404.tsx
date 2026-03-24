import { Link } from 'react-router';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

export function Admin404() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 bg-[#8B0000]/20 border border-[#8B0000] flex items-center justify-center">
            <AlertTriangle size={80} className="text-[#8B0000]" />
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-6">
          <h1 className="text-8xl font-bold text-[#8B0000] mb-2 font-mono">404</h1>
          <h2 className="text-2xl font-bold text-[#F0F0F0] uppercase tracking-wide">
            Page non trouvée
          </h2>
        </div>

        {/* Description */}
        <p className="text-[#808080] mb-8 text-sm max-w-md mx-auto">
          La page d'administration que vous recherchez n'existe pas ou a été déplacée.
        </p>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Link
            to="/admin"
            className="flex items-center gap-2 px-6 py-3 bg-[#8B0000] text-[#F0F0F0] hover:bg-[#6B0000] font-medium text-sm uppercase tracking-wide"
          >
            <Home size={18} />
            Dashboard Admin
          </Link>
          
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 border border-[#8B0000]/50 text-[#8B0000] hover:bg-[#8B0000]/10 font-medium text-sm uppercase tracking-wide"
          >
            <ArrowLeft size={18} />
            Retour au site
          </Link>
        </div>
      </div>
    </div>
  );
}
