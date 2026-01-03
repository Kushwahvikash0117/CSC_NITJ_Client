import React, { useState, useEffect, useRef } from 'react';

// --- NEURAL NETWORK BACKGROUND (Unchanged) ---
const NeuralNetwork = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };
    class Particle {
      constructor(x, y) {
        this.x = x; this.y = y;
        this.vx = (Math.random() - 0.5) * 0.25; 
        this.vy = (Math.random() - 0.5) * 0.25;
        this.radius = 2;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#22d3ee';
        ctx.fill();
      }
    }
    const init = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 18000);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
      }
    };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]; p1.update();
        ctx.shadowBlur = 15; ctx.shadowColor = '#22d3ee';
        p1.draw();
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x; const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) {
            ctx.shadowBlur = 0; ctx.beginPath();
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.7 * (1 - dist / 220)})`;
            ctx.lineWidth = 1.2; ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          }
        }
      }
      ctx.globalCompositeOperation = 'source-over';
      animationFrameId = requestAnimationFrame(animate);
    };
    window.addEventListener('resize', resize);
    resize(); animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
};

const EducationPage = () => {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  // --- FORCE SCROLL TO TOP ON LOAD ---
  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  const allThreats = [
    { id: 'ALRT-202', title: 'UPI Scams', target: 'Payment Apps', status: 'CRITICAL', color: 'text-red-500' },
    { id: 'ALRT-105', title: 'Session Hijacking', target: 'Public Wi-Fi', status: 'HIGH', color: 'text-orange-400' },
    { id: 'ALRT-098', title: 'Phishing 2.0', target: 'Student Portals', status: 'MODERATE', color: 'text-yellow-400' },
    { id: 'ALRT-312', title: 'Ransomware', target: 'Lab Servers', status: 'CRITICAL', color: 'text-red-500' },
    { id: 'ALRT-404', title: 'Credential Stuffing', target: 'Library Wifi', status: 'HIGH', color: 'text-orange-400' },
    { id: 'ALRT-112', title: 'Social Mining', target: 'WhatsApp Groups', status: 'MODERATE', color: 'text-yellow-400' },
    { id: 'ALRT-501', title: 'SQL Injection', target: 'Event Portal', status: 'HIGH', color: 'text-orange-400' },
    { id: 'ALRT-667', title: 'Evil Twin AP', target: 'Hostel Block A', status: 'CRITICAL', color: 'text-red-500' },
    { id: 'ALRT-009', title: 'PDF Malware', target: 'Email Attachments', status: 'MODERATE', color: 'text-yellow-400' },
  ];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 3) % allThreats.length);
      setIsSyncing(false);
    }, 500);
  };

  const visibleThreats = allThreats.slice(currentIndex, currentIndex + 3);

  const handleReturn = () => {
    window.location.hash = '#about';
    setTimeout(() => {
      const target = document.getElementById('about') || document.getElementById('about-grid');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 10);
  };

  return (
    <div className="bg-[#010714] text-white min-h-screen relative overflow-x-hidden selection:bg-cyan-500/30 font-sans">
      <NeuralNetwork />

      {/* 1. HERO HEADER (Increased pt-32 to clear navbar) */}
      <section id="education-top" className="relative z-10 pt-32 pb-4 px-6 max-w-7xl mx-auto">
        <div className={`transition-all duration-1000 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block px-4 py-1 border border-cyan-500/30 bg-cyan-500/5 rounded mb-4">
            <span className="text-cyan-500 font-mono text-[10px] tracking-[0.4em] uppercase">
              CSC_NITJ // KNOWLEDGE_ARCHIVE
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase leading-none">
            EDU<span className="text-cyan-400">CATION</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-xl font-light leading-relaxed italic border-l-2 border-cyan-500/20 pl-6">
            Establishing the baseline for technical resilience through unified awareness.
          </p>
        </div>
      </section>

      {/* 2. CORE CONTENT GRID */}
      <section className="relative z-10 py-8 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-8">
          
          {/* LEFT: SURVIVAL CURRICULUM */}
          <div className="lg:col-span-2 bg-[#0a1628]/40 backdrop-blur-3xl border border-white/5 p-10 md:p-14 rounded-[3.5rem] shadow-2xl">
            <h2 className="group mb-12 flex flex-col items-start gap-2">
              <div className="flex items-center gap-4">
                <span className="h-[2px] w-12 bg-cyan-500 shadow-[0_0_15px_#22d3ee] group-hover:w-24 transition-all duration-700 ease-in-out" />
                <span className="text-2xl font-black uppercase tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-cyan-500/50 group-hover:tracking-[0.5em] transition-all duration-700 ease-in-out">
                  Survival Curriculum
                </span>
              </div>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Identify Phishing", desc: "Recognize malicious link structures and spoofed headers instantly.", icon: "🔍" },
                { title: "Social Engineering", desc: "Protect against psychological manipulation and OTP baiting.", icon: "🧠" },
                { title: "Privacy Audit", desc: "Lock down your social footprints and manage data exposure.", icon: "🛡️" },
                { title: "Public Wi-Fi Safety", desc: "Implement VPN tunnels and encrypted DNS while on campus.", icon: "📶" }
              ].map((item, i) => (
                <div key={i} className="group/card relative p-8 rounded-[2.5rem] bg-[#0d1b2e]/60 border border-white/5 hover:border-cyan-500/50 hover:bg-[#0d1b2e]/90 transition-all duration-500 ease-out cursor-pointer shadow-xl hover:-translate-y-3 hover:scale-[1.03]">
                  <div className="relative z-10 flex items-center justify-between mb-8">
                    <div className="text-4xl filter grayscale group-hover/card:grayscale-0 transition-all duration-500">
                      {item.icon}
                    </div>
                    <span className="font-mono text-[10px] text-cyan-500/30 tracking-[0.4em] group-hover/card:text-cyan-400 uppercase">MOD_0{i + 1}</span>
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-black text-white group-hover/card:text-cyan-400 uppercase tracking-[0.25em] text-[14px] mb-3 transition-all duration-300">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-[12px] leading-relaxed font-light tracking-wide group-hover/card:text-gray-200">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: TACTICAL THREAT FEED */}
          <div className="bg-[#0a1628]/60 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] shadow-2xl relative flex flex-col min-h-[600px]">
            <h2 className="text-xl font-black mb-12 flex items-center gap-4">
              <span className="h-2 w-8 bg-red-500 rounded-full animate-pulse shadow-[0_0_15px_#ef4444]" />
              <span className="tracking-[0.2em] uppercase text-white/80 text-sm">Threat Intelligence</span>
            </h2>
            
            <div className={`space-y-10 font-mono flex-grow transition-all duration-500 ${isSyncing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              {visibleThreats.map((alert) => (
                <div key={alert.id} className="group/alert border-l-2 border-white/5 pl-6 py-2 hover:border-cyan-500/40 transition-colors">
                  <div className="flex justify-between items-end mb-3 text-[10px] uppercase tracking-tighter">
                    <span className="text-gray-600 group-hover/alert:text-gray-400">{alert.id}</span>
                    <span className={`${alert.color} text-[12px] font-black tracking-[0.15em] transition-all duration-300 uppercase`}>
                      {alert.status}
                    </span>
                  </div>
                  <h4 className="text-white font-bold text-base mb-1 tracking-tight group-hover/alert:text-cyan-400">{alert.title}</h4>
                  <p className="text-gray-500 text-[10px] italic font-sans uppercase tracking-[0.1em]">Vector: {alert.target}</p>
                </div>
              ))}
            </div>

            <button onClick={handleSync} disabled={isSyncing} className="w-full mt-12 py-5 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-500 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300 relative group overflow-hidden">
               <span className="relative z-10">{isSyncing ? 'Pulling Data...' : 'Synchronize Data'}</span>
            </button>
          </div>
        </div>

        {/* RETURN BUTTON */}
        <div className="text-center pt-4 pb-10">
          <button 
            onClick={handleReturn}
            className="group relative px-10 py-3.5 bg-[#0a1628]/60 border border-cyan-500/20 rounded-full 
                       text-cyan-500/60 text-[10px] font-black uppercase tracking-[0.5em] 
                       hover:text-cyan-300 hover:border-cyan-400/60 hover:shadow-[0_0_35px_rgba(34,211,238,0.2)]
                       transition-all duration-500 overflow-hidden active:scale-95"
          >
            <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent group-hover:animate-[scan_1.5s_infinite]" />
            <span className="relative z-10 flex items-center gap-2.5 justify-center">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Return to Hub
            </span>
          </button>
        </div>
      </section>

      <style>{`
        @keyframes scan {
          from { left: -100%; }
          to { left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default EducationPage;
