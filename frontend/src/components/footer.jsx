import React from 'react';
import logo from '../assets/clublogo.png'; 

const Footer = () => {
  return (
    <>
      {/* STATIC TECH-BLUE LINE
          h-[1px]: Keeps it sharp and thin
          bg-cyan-500/30: Set to 30% opacity for that perfect "dark blue" look 
          that isn't too bright but still clearly blue.
      */}
      <div className="h-[1px] w-full bg-[#00D1FF]/30"></div>

      <footer className="bg-[#020617] text-white pt-16 pb-8 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1: Brand */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img src={logo} alt="CSC NITJ Logo" className="w-12 h-12 object-contain bg-white p-1 rounded-sm" />
                <h2 className="text-xl font-bold tracking-tight">
                  CSC <span className="text-[#00D1FF]">NITJ</span>
                </h2>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs mt-2">
                Cyber Security Club of NIT Jalandhar working to build ethical hackers, secure developers, and cyber awareness.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 tracking-wide text-gray-200">Quick Links</h3>
              <ul className="flex flex-col gap-4 text-gray-400 text-sm">
                <li><a href="#home" className="hover:text-[#00D1FF] transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-[#00D1FF] transition-colors">About</a></li>
                <li><a href="#team" className="hover:text-[#00D1FF] transition-colors">Teams</a></li>
                <li><a href="#" className="hover:text-[#00D1FF] transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Column 3: Explore */}
            <div>
              <h3 className="text-lg font-bold mb-6 tracking-wide text-gray-200">Explore</h3>
              <ul className="flex flex-col gap-4 text-gray-400 text-sm">
                <li><a href="#events" className="hover:text-[#00D1FF] transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-[#00D1FF] transition-colors">Projects</a></li>
                <li><a href="#" className="hover:text-[#00D1FF] transition-colors">Workshops</a></li>
                <li><a href="#" className="hover:text-[#00D1FF] transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Column 4: Connect */}
            <div>
              <h3 className="text-lg font-bold mb-6 tracking-wide text-gray-200">Connect</h3>
              <ul className="flex flex-col gap-4 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-[#00D1FF] transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-[#00D1FF] transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-[#00D1FF] transition-colors">GitHub</a></li>
                <li><a href="mailto:contact@cscnitj.com" className="hover:text-[#00D1FF] transition-colors">Email</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-8 border-t border-white/5 flex justify-center items-center">
            <p className="text-gray-500 text-[11px] tracking-[0.1em] uppercase">
              © 2025 CSC NITJ. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
