import React, { useState, useEffect, useRef } from 'react';

// --- NEURAL NETWORK BACKGROUND ---
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

const AwarenessPage = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const allModules = [
    { title: "UPI & Financial Safety", id: "FIN_SEC", icon: "💳", threat: "High - UPI Fraud", content: "Never enter your UPI PIN to receive money. Scammers use 'Request Money' links to drain accounts. Always verify the receiver." },
    { title: "Social Engineering", id: "SOC_ENG", icon: "🎭", threat: "Critical - Identity Theft", content: "Be wary of urgent calls asking for OTPs. Official departments will never ask for your passwords or sensitive codes over the phone." },
    { title: "Identity Protection", id: "ID_VET", icon: "🆔", threat: "Moderate - Doxing", content: "Avoid sharing photos of ID cards or Aadhaar on social media. Attackers use these details to bypass security questions easily." },
    { title: "Network Hygiene", id: "NET_HYG", icon: "📡", threat: "High - Packet Sniffing", content: "Avoid using open public Wi-Fi for banking. Use a VPN or mobile data to prevent device joining 'Evil Twin' malicious hotspots." },
    { title: "Phishing Links", id: "PHISH_01", icon: "🔗", threat: "Critical - Credential Theft", content: "Check URLs carefully. Lookalike domains (e.g., n1tj.ac.in) are used to capture LDAP credentials and student portal logins." },
    { title: "Juice Jacking", id: "USB_SEC", icon: "🔌", threat: "High - Data Theft", content: "Public USB charging ports can install malware. Use a 'USB Data Blocker' or only use your own power adapter in public areas." },
    { title: "App Permissions", id: "APP_PRIV", icon: "📱", threat: "Moderate - Privacy", content: "Review apps requesting camera or contact access without reason. Revoke unnecessary permissions to prevent background data mining." },
    { title: "Deepfake Awareness", id: "AI_FAKE", icon: "👤", threat: "High - Impersonation", content: "Scammers use AI to mimic voices of family members. Always verify urgent money requests via a secondary communication channel." },
    { title: "Password Strength", id: "PASS_GEN", icon: "🔐", threat: "High - Brute Force", content: "Avoid using birthdates or phone numbers as passwords. Use a mix of symbols and case-sensitive letters for all your campus accounts." },
    { title: "QR Code Scams", id: "QR_FRD", icon: "🔳", threat: "Critical - Payment Fraud", content: "Scanning a QR code should only be for sending money. If a merchant asks you to scan to 'receive' a prize, it is a guaranteed scam." },
    { title: "Cloud Security", id: "CLD_EXP", icon: "☁️", threat: "Moderate - Data Leak", content: "Ensure your Google Drive folders aren't set to 'Anyone with link'. Keep sensitive lab data and project files restricted." },
    { title: "Social Media Mining", id: "SOC_MINE", icon: "🤳", threat: "Moderate - Profiling", content: "Sharing your location in real-time reveals your routine. Post your campus activities after you have left the specific location." },
    { title: "Vishing Attacks", id: "VISH_02", icon: "📞", threat: "High - Voice Fraud", content: "Automated robocalls claiming your bank account is blocked are fake. Hang up and call the official bank number on your card." },
    { title: "Email Spoofing", id: "EML_SPF", icon: "📧", threat: "High - Malware", content: "Attackers can fake the 'Sender' name. Verify the actual email address before clicking on any 'Urgent' attachment from NITJ staff." },
    { title: "Browser Safety", id: "WEB_VET", icon: "🌐", threat: "Moderate - Session Hijack", content: "Always log out from shared library computers. Clear cookies and cache to prevent the next user from accessing your portal." },
    { title: "SIM Swapping", id: "SIM_SWP", icon: "📲", threat: "Critical - Account Takeover", content: "If your mobile signal suddenly disappears for hours, contact your provider immediately. Scammers may be cloning your SIM card." }
  ];

  const currentModules = [
    allModules[visibleIndex % allModules.length],
    allModules[(visibleIndex + 1) % allModules.length],
    allModules[(visibleIndex + 2) % allModules.length],
    allModules[(visibleIndex + 3) % allModules.length],
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setVisibleIndex((prev) => (prev + 4) % allModules.length);
        setIsFading(false);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, [allModules.length]);

  const handleReturn = (e) => {
    e.preventDefault();
    window.location.hash = '#about';
    
    setTimeout(() => {
      // Targets the cards grid on the home page
      const target = document.getElementById('about-grid') || 
                     document.getElementById('about');
                     
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <div className="bg-[#010714] text-white min-h-screen relative overflow-x-hidden selection:bg-cyan-500/30 font-sans">
      <NeuralNetwork />

      {/* 1. HEADER */}
      <section className="relative z-10 pt-32 pb-10 px-6 max-w-7xl mx-auto text-center">
        <div className={`transition-all duration-1000 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block px-4 py-1 border border-red-500/30 bg-red-500/5 rounded mb-6">
            <span className="text-red-500 font-mono text-[10px] tracking-[0.4em] uppercase animate-pulse">
              System Alert: Human Vulnerability Detected
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none">
            AWARE<span className="text-cyan-400">NESS</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed uppercase tracking-widest">
            Technological defense is useless without human vigilance. Strengthen your personal firewall against the evolving threat landscape.
          </p>
        </div>
      </section>

      {/* 2. DEFENSE MODULES GRID */}
      <section className="relative z-10 py-10 px-6 max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 transform ${isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {currentModules.map((mod) => (
            <div key={mod.id} className="group relative bg-[#0a1628]/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[2.5rem] hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03] shadow-xl hover:shadow-cyan-500/10">
              <div className="flex justify-between items-start mb-6">
                <div className="text-4xl bg-cyan-500/10 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                  {mod.icon}
                </div>
                <span className="text-[10px] font-mono text-red-400 bg-red-400/5 px-3 py-1 rounded-full border border-red-400/20 uppercase tracking-wider">
                  {mod.threat}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider group-hover:text-cyan-400 transition-colors">
                {mod.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed font-light mb-6 border-l-2 border-cyan-500/20 pl-4">
                {mod.content}
              </p>

              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-[9px] font-mono text-gray-500 tracking-[0.3em] uppercase">{mod.id}</span>
                <div className="flex gap-1">
                    {[1,2,3].map(dot => <div key={dot} className="h-1 w-4 bg-cyan-500/20 rounded-full" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SCAM ALERT TICKER */}
      <div className="relative z-10 w-full bg-red-500/10 border-y border-red-500/20 py-4 my-10 overflow-hidden whitespace-nowrap">
        <div className="flex animate-[marquee_30s_linear_infinite] gap-12 text-red-500 font-mono text-xs uppercase tracking-[0.2em]">
          <span>[WARNING: New 'Registration Fee' phishing emails reported]</span>
          <span>[ALERT: Fake NITJ login portal detected on unauthorized domains]</span>
          <span>[VIGILANCE: Report any suspicious UPI requests to CSC immediately]</span>
          <span>[WARNING: New 'Registration Fee' phishing emails reported]</span>
          <span>[ALERT: Fake NITJ login portal detected on unauthorized domains]</span>
        </div>
      </div>

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
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes scan { from { left: -100%; } to { left: 100%; } }
      `}} />
    </div>
  );
};

export default AwarenessPage;
