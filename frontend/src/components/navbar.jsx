import React, { useState } from 'react';
import clubLogo from '../assets/clublogo.png';


const Navbar = ({ currentPath, isLoggedIn, onLogin, onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 1. Changed state from rollNo to email
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // 2. Updated Validation Logic
    // Check if email is empty or doesn't end with the specific domain
    if (!email.trim().endsWith('@nitj.ac.in')) {
      setError('Access Denied: Email must end with @nitj.ac.in');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    setError('');
    onLogin(); 
    setIsModalOpen(false);
    setEmail(''); // Reset email
    setPassword('');
  };

  const navLinks = [
    { name: 'HOME', hash: '#home' },
    { name: 'ABOUT', hash: '#about' },
    { name: 'TEAM', hash: '#team' },
    { name: 'BLOG', hash: '#blog' }
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] bg-[#010714]/80 backdrop-blur-xl border-b border-white/5 px-6 md:px-16 py-5 flex justify-between items-center">
        
        {/* LOGO SECTION */}
        <div className="flex flex-col cursor-pointer group"
  onClick={() => window.location.hash = '#home'}
>
  <h1 className="text-white font-black text-xl tracking-tighter leading-none group-hover:text-cyan-400 transition">
    CSC <span className="text-cyan-400 italic">NITJ</span>
  </h1>
  <p className="text-[8px] text-gray-500 font-bold tracking-[0.3em] uppercase">
    Cyber Security Club
  </p>
</div>


        {/* NAVIGATION & AUTH */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-8">

            {isLoggedIn && (
              <>
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.hash}
                    className={`text-[10px] font-black tracking-[0.25em] transition-all duration-300 relative py-2 ${
                      currentPath === link.hash ? 'text-white' : 'text-gray-500 hover:text-cyan-400'
                    }`}
                  >
                    {link.name}
                    {currentPath === link.hash && (
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-pulse" />
                    )}
                  </a>
                ))}
                
                {/* DASHBOARD AS A BUTTON */}
                <a 
                  href="#dashboard"
                  className={`px-4 py-1.5 rounded text-[9px] font-black tracking-[0.2em] uppercase transition-all duration-300 border ${
                    currentPath === '#dashboard' 
                    ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.3)]' 
                    : 'border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/10'
                  }`}
                >
                  DASHBOARD
                </a>
                <a
  href="#Profile"
  className="px-4 py-1.5 rounded text-[9px] font-black tracking-[0.2em] uppercase border border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/10"
>
  PROFILE
</a>


              </>
            )}
          </div>

          <button
            onClick={isLoggedIn ? onLogout : () => {
                                window.location.hash = '#home';
                                setIsModalOpen(true);
                                }}

            className={`px-6 py-2 rounded-sm text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 border ${
              isLoggedIn 
                ? 'border-red-500/30 text-red-500 hover:bg-red-500/10' 
                : 'border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.1)]'
            }`}
          >
            {isLoggedIn ? 'SIGN OUT' : 'SIGN IN'}
          </button>
        </div>
      </nav>

      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => {
                        setIsModalOpen(false);
                        window.location.hash = '#home';
                        }}
 />
          <div className="relative w-full max-w-sm bg-[#0a0f1d] border border-cyan-500/30 p-10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="flex justify-center mb-6 opacity-80">
               <img src={clubLogo} alt="CSC Logo" className="w-16 h-16 object-contain" />
            </div>
            <div className="mb-8 text-center">
              <h2 className="text-white text-3xl font-black italic uppercase tracking-tighter">Terminal <span className="text-cyan-400">Login</span></h2>
              <p className="text-gray-500 text-[9px] font-bold tracking-[0.3em] uppercase mt-2">Authorization Required</p>
            </div>
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              
              {/* 3. Updated Input Field for Email */}
              <div className="space-y-2">
                <label className="text-[9px] text-cyan-500 font-black tracking-widest uppercase ml-1">Student Email</label>
                <input
                  type="email"
                  required
                  placeholder="student@nitj.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white text-xs font-mono focus:border-cyan-500/50 outline-none transition-all placeholder:text-gray-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] text-cyan-500 font-black tracking-widest uppercase ml-1">Security Key</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white text-xs font-mono focus:border-cyan-500/50 outline-none transition-all placeholder:text-gray-700"
                />
              </div>
              
              {error && (
                <div className="text-red-500 text-[9px] font-bold tracking-widest uppercase bg-red-500/5 p-2 border-l-2 border-red-500">
                  ⚠️ {error}
                </div>
              )}
              
              <div className="pt-4 flex flex-col gap-3">
                <button type="submit" className="w-full bg-cyan-500 text-black font-black py-4 rounded-lg text-xs tracking-[0.2em] uppercase hover:bg-cyan-400 transition-all">
                  Verify Identity
                </button>
                <button type="button" onClick={() => {
  setIsModalOpen(false);
  window.location.hash = '#home';
}}
 className="w-full py-2 text-gray-500 text-[9px] font-black tracking-widest uppercase hover:text-white transition-colors">
                  Cancel Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;