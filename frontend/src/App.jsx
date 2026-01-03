import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';

// Pages
import Home from './pages/home';
import About from './pages/about';
import Education from './pages/education'; 
import Awareness from './pages/awareness';
import Competitions from './pages/competition';
import TeamsPage from './pages/team';
import Blog from './pages/blog';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  const renderPage = () => {
    if (!isLoggedIn) {
      return (
        <div 
          className="relative min-h-screen flex flex-col items-center justify-center bg-[#00050a] overflow-hidden"
          onMouseMove={handleMouseMove}
        >
          {/* --- ENHANCED MULTI-PATTERN TUNNEL --- */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {[...Array(60)].map((_, i) => {
              // Randomizing properties for "Different Size and Pattern"
              const size = Math.random() * 24 + 8; // Sizes from 8px to 32px
              const duration = Math.random() * 4 + 1.5; // Varied speeds
              const delay = Math.random() * 10;
              const opacity = Math.random() * 0.5 + 0.1;
              const rotation = Math.random() * 360;
              
              // Pattern types: Binary, Square, or Dash
              const rand = Math.random();
              let content;
              if (rand > 0.6) content = Math.random() > 0.5 ? '1' : '0';
              else if (rand > 0.3) content = <div className="w-full h-full border border-cyan-400/40 rotate-45" />;
              else content = <div className="w-full h-[2px] bg-cyan-500/60" />;

              return (
                <div 
                  key={i}
                  className="absolute left-1/2 top-1/2 flex items-center justify-center animate-tunnel"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    fontSize: `${size}px`,
                    color: `rgba(34, 211, 238, ${opacity})`,
                    animationDuration: `${duration}s`,
                    animationDelay: `-${delay}s`,
                    '--start-x': `${(Math.random() - 0.5) * 140}vw`,
                    '--start-y': `${(Math.random() - 0.5) * 140}vh`,
                    transform: `rotate(${rotation}deg)`,
                  }}
                >
                  {content}
                </div>
              );
            })}
          </div>

          {/* --- SECURITY TEXT --- */}
          <div className="relative z-20 text-center pointer-events-none" 
               style={{ 
                 transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
                 transition: 'transform 0.1s ease-out'
               }}>
            <h1 className="text-white text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-none drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              SECURITY <span className="text-cyan-400">CHECKPOINT</span>
            </h1>
            <p className="mt-6 text-cyan-500/40 font-mono text-[10px] tracking-[0.8em] uppercase">
              SCANNING FOR AUTHORIZED CREDENTIALS
            </p>
          </div>

          {/* Central Brightness Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-400/20 blur-[80px] rounded-full z-10" />
          
          {/* Depth Vignette */}
          <div className="absolute inset-0 z-[15] bg-[radial-gradient(circle_at_center,transparent_10%,#00050a_85%)]" />

          <style>{`
            @keyframes tunnel {
              0% {
                transform: translate(-50%, -50%) scale(0) rotate(0deg);
                opacity: 0;
              }
              15% { opacity: 1; }
              85% { opacity: 1; }
              100% {
                transform: translate(calc(-50% + var(--start-x)), calc(-50% + var(--start-y))) scale(4) rotate(180deg);
                opacity: 0;
              }
            }
            .animate-tunnel {
              animation-name: tunnel;
              animation-iteration-count: infinite;
              animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
            }
          `}</style>
        </div>
      );
    }

    // Original Page logic
    switch (currentPath) {
      case '#about': return <About />;
      case '#education': return <Education />; 
      case '#awareness': return <Awareness />; 
      case '#competitions': return <Competitions />;
      case '#team': return <TeamsPage />;
      case '#blog': return <Blog onNavigate={(h) => window.location.hash = h} />;
      case '#home':
      default: return <Home onNavigate={(h) => window.location.hash = h} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#00050a] flex flex-col selection:bg-cyan-500/30">
      <Navbar 
        currentPath={currentPath} 
        isLoggedIn={isLoggedIn} 
        onLogin={() => setIsLoggedIn(true)} 
        onLogout={() => setIsLoggedIn(false)} 
      />
      <main className="flex-grow">{renderPage()}</main>
      {isLoggedIn && <Footer />}
    </div>
  );
}

export default App;
