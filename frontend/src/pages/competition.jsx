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

const CompetitionsPage = () => {
  const [globalIdx, setGlobalIdx] = useState(0);
  const [internalIdx, setInternalIdx] = useState(0);
  const [isFadingGlobal, setIsFadingGlobal] = useState(false);
  const [isFadingInternal, setIsFadingInternal] = useState(false);
  const [mounted, setMounted] = useState(false);

  const globalComps = [
    { title: "Shakti CTF", id: "IN_01", icon: "🇮🇳", status: "India - Online", content: "India's premier women-only CTF focusing on inclusivity and high-level offensive security challenges." },
    { title: "InCTF National", id: "IN_02", icon: "🏆", status: "India - Student", content: "The largest student-level CTF in India with significant industry backing and massive participation." },
    { title: "Nullcon Jailbreak", id: "IN_03", icon: "🚩", status: "India - Goa", content: "Flagship event at Nullcon. Renowned for difficult CTF and innovative hardware hacking challenges." },
    { title: "Google CTF", id: "INT_01", icon: "🔍", status: "Online - Global", content: "Highly technical global competition featuring elite challenges in web, pwn, and advanced cryptography." },
    { title: "picoCTF", id: "INT_02", icon: "🎮", status: "Online - Global", content: "The world's largest online educational hacking platform. Perfect for entry-level hackers worldwide." },
    { title: "Cyber Apocalypse", id: "INT_03", icon: "☄️", status: "Online - Global", content: "A massive, story-driven worldwide event by Hack The Box attracting thousands of global teams." },
    { title: "Flare-On", id: "INT_04", icon: "🔥", status: "Online - Malware", content: "The elite global reverse engineering challenge focusing strictly on binary analysis and malware." },
    { title: "Hack-A-Sat", id: "INT_05", icon: "🛰️", status: "Online - Space", content: "A unique global competition focused on aerospace and satellite cybersecurity, accessible to everyone." },
    { title: "SITCTF India", id: "IN_04", icon: "🎓", status: "India - Pune", content: "Organized by Symbiosis, focusing on forensic analysis and modern cloud security protocols." },
    { title: "DefCamp India", id: "IN_05", icon: "🛡️", status: "India - Regional", content: "Regional competition focusing on web app security and network penetration for Indian students." },
    { title: "NahamCon CTF", id: "INT_06", icon: "🎤", status: "Online - Global", content: "Community-focused global competition featuring a wide range of creative and modern security challenges." },
    { title: "HITB CTF", id: "INT_07", icon: "⚡", status: "Online - Global", content: "Hack In The Box's official CTF. High-speed competition featuring web and binary exploitation." },
    { title: "SECCON CTF", id: "INT_08", icon: "🎌", status: "Online - Global", content: "One of the most prestigious Japanese-hosted global CTFs, open to international participants online." },
    { title: "Dragon CTF", id: "INT_09", icon: "🐉", status: "Online - Global", content: "Organized by Dragon Sector, known for difficult and rewarding binary challenges globally." },
    { title: "HackerOne World", id: "INT_10", icon: "🐞", status: "Online - Global", content: "Global bug bounty leaderboards. Find vulnerabilities in top-tier companies and compete for rankings." },
    { title: "Kaggle Sec", id: "INT_11", icon: "🧠", status: "Online - AI", content: "Global competitions for securing machine learning models against adversarial attacks and poisoning." }
  ];

  const internalEvents = [
    { title: "NITJ Cryptic Hunt", id: "NITJ_01", icon: "🧩", status: "Internal", content: "A multi-level online treasure hunt where clues are hidden in source codes, metadata, and deep-web links." },
    { title: "Fraud-Scan Quiz", id: "NITJ_02", icon: "🧐", status: "NITJ Quiz", content: "Identify real vs fake phishing emails, deepfake audio, and scam UPI requests in this high-speed simulation." },
    { title: "Club Face-Off", id: "NITJ_03", icon: "⚔️", status: "Inter-Club", content: "Inter-club cybersecurity challenge. Clubs battle to secure a vulnerable campus network simulation." },
    { title: "Bug-NITJ", id: "NITJ_04", icon: "🛡️", status: "Vulnerability", content: "Reporting bugs in university-wide portals in a controlled environment to help improve campus safety." }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setMounted(true), 150);

    const gInt = setInterval(() => {
      setIsFadingGlobal(true);
      setTimeout(() => {
        setGlobalIdx((prev) => (prev + 2) % globalComps.length);
        setIsFadingGlobal(false);
      }, 500);
    }, 4500);

    const iInt = setInterval(() => {
      setIsFadingInternal(true);
      setTimeout(() => {
        setInternalIdx((prev) => (prev + 2) % internalEvents.length);
        setIsFadingInternal(false);
      }, 500);
    }, 5500);

    return () => { clearInterval(gInt); clearInterval(iInt); };
  }, [globalComps.length, internalEvents.length]);

  const handleReturn = (e) => {
    e.preventDefault();
    window.location.hash = '#about';
    
    setTimeout(() => {
      // Targets the specific grid ID on your hub/about page
      const target = document.getElementById('about-grid') || 
                     document.getElementById('about');
                     
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <div className="bg-[#010714] text-white min-h-screen relative overflow-x-hidden font-sans">
      <NeuralNetwork />

      {/* 1. HEADER */}
      <section className="relative z-10 pt-32 pb-4 px-6 max-w-7xl mx-auto text-left">
        <div className={`transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'}`}>
          <div className="inline-block px-5 py-2.5 border border-cyan-500/40 bg-[#0a1628]/90 rounded-md mb-8">
            <span className="text-cyan-400 font-mono text-xs tracking-[0.4em] uppercase">
              CSC_NITJ // COMPETITIVE_TRACK
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase leading-none">
            COMPETI<span className="text-cyan-400">TIONS</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xl font-light leading-relaxed italic border-l-2 border-cyan-500/20 pl-6">
            Bridging Indian talent with premier global online arenas. Strengthen your offensive capabilities on a world stage.
          </p>
        </div>
      </section>

      {/* 2. GLOBAL & INDIAN ARENA */}
      <section className={`relative z-10 py-12 px-6 max-w-7xl mx-auto transition-all duration-1000 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="flex items-center gap-4 mb-10">
          <div className="h-[1px] w-12 bg-cyan-500/50" />
          <h2 className="text-[10px] font-mono tracking-[0.5em] text-cyan-400 uppercase">Global & Indian Arena</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {globalComps.slice(globalIdx, globalIdx + 2).map((item) => (
            <div key={item.id} className={`group relative bg-[#0a1628]/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[2.5rem] transition-all duration-700 hover:-translate-y-4 hover:border-cyan-500/30 ${isFadingGlobal ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              <div className="flex justify-between items-start mb-6">
                <div className="text-4xl bg-cyan-500/10 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/5 px-3 py-1 rounded-full border border-cyan-400/20 uppercase tracking-widest">{item.status}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider group-hover:text-cyan-400 transition-colors">{item.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed font-light mb-6 border-l-2 border-cyan-500/20 pl-4">{item.content}</p>
              <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-gray-500 uppercase tracking-[0.4em]">
                <span>UID: {item.id}</span>
                <span className="text-cyan-500/40">{Math.floor(globalIdx / 2) + 1} / {globalComps.length / 2}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INTERNAL OPERATIONS */}
      <section className={`relative z-10 py-12 px-6 max-w-7xl mx-auto transition-all duration-1000 delay-500 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="flex items-center gap-4 mb-10">
          <div className="h-[1px] w-12 bg-red-500/50" />
          <h2 className="text-[10px] font-mono tracking-[0.5em] text-red-500 uppercase">Internal Operations</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {internalEvents.slice(internalIdx, internalIdx + 2).map((item) => (
            <div key={item.id} className={`group relative bg-[#0a1628]/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[2.5rem] transition-all duration-700 hover:-translate-y-4 hover:border-red-500/30 ${isFadingInternal ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              <div className="flex justify-between items-start mb-6">
                <div className="text-4xl bg-red-500/10 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                <span className="text-[10px] font-mono text-red-400 bg-red-400/5 px-3 py-1 rounded-full border border-red-400/20 uppercase tracking-widest">{item.status}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider group-hover:text-red-400 transition-colors">{item.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed font-light mb-6 border-l-2 border-red-500/20 pl-4">{item.content}</p>
              <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-gray-500 uppercase">
                <span>UID: {item.id}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. RETURN BUTTON */}
      <div className="text-center pt-4 pb-20 relative z-10">
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

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan { from { left: -100%; } to { left: 100%; } }
      `}} />
    </div>
  );
};

export default CompetitionsPage;
