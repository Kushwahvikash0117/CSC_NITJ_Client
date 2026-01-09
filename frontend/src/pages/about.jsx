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

// --- REUSABLE CARD COMPONENT (Updated with Prefix prop) ---
const GoalCard = ({ id, title, desc, active, path, prefix = "SEC" }) => {
  const handleNavigate = () => {
    if (active) {
      window.location.hash = path;
    }
  };

  return (
    <div 
      className={`group relative transition-all transform ease-in-out ${
        active 
          ? 'opacity-100 translate-y-0 scale-100 duration-700' 
          : 'opacity-0 translate-y-8 scale-95 duration-300'
      }`}
    >
      <div className="absolute -inset-[1px] bg-gradient-to-b from-cyan-500/40 to-transparent rounded-[2.5rem] opacity-30 group-hover:opacity-100 transition-all duration-500 blur-[2px]" />
      <div className="relative h-full bg-[#0a1628]/90 backdrop-blur-2xl border border-white/5 p-10 rounded-[2.5rem] overflow-hidden flex flex-col">
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
          <div 
            className="h-full bg-cyan-500 shadow-[0_0_10px_#22d3ee] transition-all duration-[1200ms] ease-out"
            style={{ width: active ? '100%' : '0%' }}
          />
        </div>

        <div className="flex justify-between items-center mb-8 mt-2">
          <span className="font-mono text-[10px] text-cyan-500/80 tracking-[3px] bg-cyan-500/5 px-3 py-1 rounded-md border border-cyan-500/20">
            {prefix}_{id}
          </span>
          <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_#22d3ee] ${active ? 'bg-cyan-400 animate-pulse' : 'bg-gray-600'}`} />
        </div>

        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
          {title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed font-light mb-8 group-hover:text-gray-300">
          {desc}
        </p>

        <button 
          onClick={handleNavigate}
          disabled={!active}
          className={`mt-auto pt-6 border-t border-white/5 flex items-center gap-2 transition-all text-[10px] font-bold uppercase tracking-widest ${
            active 
              ? 'text-cyan-500/70 group-hover:text-cyan-400 cursor-pointer' 
              : 'text-gray-600 cursor-not-allowed'
          }`}
        >
          <div className="h-[1px] w-8 bg-current opacity-30 group-hover:w-12 transition-all" />
          {active ? (prefix === 'EVT' ? 'View Details' : 'Analyze Module') : 'Scanning...'}
        </button>
      </div>
    </div>
  );
};

const AboutPage = () => {
  const [activeCycle, setActiveCycle] = useState(0); 
  const [heroScanning, setHeroScanning] = useState(false);
  
  // --- 1. GOALS STATE ---
  const [goalsHeaderVisible, setGoalsHeaderVisible] = useState(false);
  const [visibleGoals, setVisibleGoals] = useState([false, false, false]);
  const goalsRef = useRef(null);

  // --- 2. EVENTS STATE ---
  const [eventsHeaderVisible, setEventsHeaderVisible] = useState(false);
  const [visibleEvents, setVisibleEvents] = useState([false, false]); // Two events
  const eventsRef = useRef(null);

  const heroContent = [
    { 
        title: "About CSC NITJ", 
        desc: "The Cyber Security Club of NIT Jalandhar is a technical hub dedicated to elite skill-building. We bridge the gap between theoretical computing and defensive reality through hardcore technical immersion." 
    },
    { 
        title: "Our Mission", 
        desc: "To forge a frontline of ethical hackers through offensive-defensive simulations, intensive workshops, and research-driven initiatives that tackle emerging global threats head-on." 
    },
    { 
        title: "Our Vision", 
        desc: "To establish a premier cybersecurity ecosystem at NITJ where innovation meets ethics, fostering the next generation of digital guardians for a secure, resilient infrastructure." 
    }
  ];

  // Hero Cycle Effect
  useEffect(() => {
    setHeroScanning(true);
    const heroInterval = setInterval(() => {
      setHeroScanning(false);
      setTimeout(() => {
        setActiveCycle((prev) => (prev + 1) % 3);
        setHeroScanning(true);
      }, 400); 
    }, 3500); 
    return () => clearInterval(heroInterval);
  }, []);

  // --- ANIMATION LOGIC: GOALS ---
  const startGoalsAnimation = () => {
    setGoalsHeaderVisible(false);
    setVisibleGoals([false, false, false]);
    setTimeout(() => setGoalsHeaderVisible(true), 300);
    setTimeout(() => setVisibleGoals([true, false, false]), 600);
    setTimeout(() => setVisibleGoals([true, true, false]), 900);
    setTimeout(() => setVisibleGoals([true, true, true]), 1200);
  };

  useEffect(() => {
    let intervalId;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        startGoalsAnimation();
        intervalId = setInterval(startGoalsAnimation, 8000);
      } else {
        clearInterval(intervalId);
      }
    }, { threshold: 0.1 });

    if (goalsRef.current) observer.observe(goalsRef.current);
    return () => {
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, []);

  // --- ANIMATION LOGIC: EVENTS ---
  const startEventsAnimation = () => {
    setEventsHeaderVisible(false);
    setVisibleEvents([false, false]);
    setTimeout(() => setEventsHeaderVisible(true), 300);
    setTimeout(() => setVisibleEvents([true, false]), 600);
    setTimeout(() => setVisibleEvents([true, true]), 900);
  };

  useEffect(() => {
    let intervalId;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        startEventsAnimation();
        // Slightly longer interval for events to keep them readable
        intervalId = setInterval(startEventsAnimation, 8000);
      } else {
        clearInterval(intervalId);
      }
    }, { threshold: 0.1 });

    if (eventsRef.current) observer.observe(eventsRef.current);
    return () => {
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="bg-[#010714] text-white min-h-screen relative overflow-x-hidden selection:bg-cyan-500/30">
      <NeuralNetwork />
      
      {/* 1. HERO SECTION */}
      <section className="relative z-10 pt-48 pb-20 px-6 flex flex-col items-center justify-center">
        <div 
          className={`relative max-w-4xl w-full bg-[#0a1628]/70 backdrop-blur-3xl border border-white/10 p-12 md:p-20 rounded-[3rem] shadow-2xl transition-all duration-500 ease-in-out ${
            heroScanning ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5 rounded-t-[3rem] overflow-hidden">
            <div 
              className="h-full bg-cyan-500 shadow-[0_0_15px_#22d3ee] transition-all duration-[1200ms] ease-out"
              style={{ width: heroScanning ? '100%' : '0%' }}
            />
          </div>

          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-8 uppercase">
              {heroContent[activeCycle].title.split(' ')[0]} <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
                {heroContent[activeCycle].title.split(' ').slice(1).join(' ')}
              </span>
            </h1>
            
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl font-light tracking-wide italic min-h-[140px]">
              {heroContent[activeCycle].desc}
            </p>

            <div className="flex gap-3 mb-8 mt-4">
              {[0, 1, 2].map(i => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeCycle === i 
                      ? 'bg-cyan-400 w-10 shadow-[0_0_12px_#22d3ee]' 
                      : 'bg-gray-700 w-3'
                  }`} 
                />
              ))}
            </div>

            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-500/40">
              <div className="h-[1px] w-12 bg-current opacity-20" />
              {heroScanning ? "Protocol Engaged" : "Syncing Core"}
              <div className="h-[1px] w-12 bg-current opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. OPERATIONAL GOALS SECTION */}
      <section id="goals" ref={goalsRef} className="relative z-10 pt-16 pb-12 px-6 max-w-7xl mx-auto">
        <div className={`flex flex-col items-center mb-24 text-center transition-all transform ${
          goalsHeaderVisible ? 'opacity-100 translate-y-0 duration-1000' : 'opacity-0 -translate-y-5 duration-300'
        }`}>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[0.3em] text-white/90">
            Operational <span className="text-cyan-500">Goals</span>
          </h2>
          <div className="h-1 w-48 md:w-64 bg-cyan-500 mt-6 rounded-full shadow-[0_0_20px_#22d3ee]" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <GoalCard 
            active={visibleGoals[0]} 
            id="001" 
            title="Education" 
            desc="Hands-on exposure through workshops, events, and technical sessions focusing on real-world security projects." 
            path="#education" 
            prefix="SEC"
          />
          <GoalCard 
            active={visibleGoals[1]} 
            id="002" 
            title="Awareness" 
            desc="Developing a strong cybersecurity culture and building digital resilience through shared knowledge." 
            path="#awareness" 
            prefix="SEC"
          />
          <GoalCard 
            active={visibleGoals[2]} 
            id="003" 
            title="Innovation" 
            desc="Encouraging research-driven solutions and ethical hacking practices to defend global digital infrastructures." 
            path="#competitions" 
            prefix="SEC"
          />
        </div>
      </section>

      {/* 3. OUR EVENTS SECTION (Moved from Home) */}
      <section id="events" ref={eventsRef} className="relative z-10 pt-16 pb-32 px-6 max-w-7xl mx-auto">
        <div className={`flex flex-col items-center mb-24 text-center transition-all transform ${
          eventsHeaderVisible ? 'opacity-100 translate-y-0 duration-1000' : 'opacity-0 -translate-y-5 duration-300'
        }`}>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[0.3em] text-white/90">
            Our <span className="text-cyan-500">Events</span>
          </h2>
          <div className="h-1 w-48 md:w-64 bg-cyan-500 mt-6 rounded-full shadow-[0_0_20px_#22d3ee]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <GoalCard 
            active={visibleEvents[0]} 
            id="001" 
            title="Hackathon 2025" 
            desc="Join us for 24 hours of coding challenges, Capture The Flag (CTF) scenarios, and incredible prizes." 
            path="#hackathon" 
            prefix="EVT"
          />
          <GoalCard 
            active={visibleEvents[1]} 
            id="002" 
            title="Cyber Workshop" 
            desc="Hands-on sessions on ethical hacking, penetration testing, and network defense strategies." 
            path="#workshop" 
            prefix="EVT"
          />
        </div>
      </section>

    </div>
  );
};

export default AboutPage;