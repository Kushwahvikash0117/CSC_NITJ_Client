import React, { useState, useEffect, useRef, forwardRef } from 'react';

// --- IMAGE IMPORTS ---
import vikashImg from '../assets/vikash.png';
import kritikaImg from '../assets/kritika.png';
import jassImg from '../assets/jass.png';
import samarthImg from '../assets/samarth.jsx.png';
import pranjalImg from '../assets/pranjal.png';
import komleenImg from '../assets/komleen.png';
import simranImg from '../assets/simran.png';
import dhruvSagarImg from '../assets/dhruv_sagar.png';
import dhruvTyagiImg from '../assets/dhruv_tyagi.png';
import mohitImg from '../assets/mohit.png';
import sukhanImg from '../assets/sukhanpreet.png';

// --- 1. AMBIENT NEURAL BACKGROUND ---
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
        this.vx = (Math.random() - 0.5) * 0.45; 
        this.vy = (Math.random() - 0.5) * 0.45;
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
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.4 * (1 - dist / 220)})`;
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
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-40" style={{ zIndex: 0 }} />;
};

// --- 2. BFS CIRCUIT ---
const CircuitBFS = ({ cardRefs }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let traces = [];
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    class Trace {
      constructor(start, end, delay) {
        this.start = start;
        this.end = end;
        this.midY = start.y + (end.y - start.y) * 0.5;
        this.progress = -delay;
        this.speed = 0.012; 
      }
      update() {
        this.progress += this.speed;
        if (this.progress > 1.2) this.progress = -0.2;
      }
      draw() {
        if (this.progress < 0 || this.progress > 1) return;
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = `rgba(34, 211, 238, ${Math.sin(this.progress * Math.PI) * 0.9})`;
        ctx.shadowColor = '#22d3ee';
        ctx.shadowBlur = 10;
        const p = this.progress;
        
        ctx.moveTo(this.start.x, this.start.y);
        
        if (Math.abs(this.start.y - this.end.y) < 20) {
            ctx.lineTo(this.start.x + (this.end.x - this.start.x) * p, this.start.y);
        } else {
            if (p < 0.3) {
              ctx.lineTo(this.start.x, this.start.y + (this.midY - this.start.y) * (p / 0.3));
            } else if (p < 0.7) {
              ctx.lineTo(this.start.x, this.midY);
              ctx.lineTo(this.start.x + (this.end.x - this.start.x) * ((p - 0.3) / 0.4), this.midY);
            } else {
              ctx.lineTo(this.start.x, this.midY);
              ctx.lineTo(this.end.x, this.midY);
              ctx.lineTo(this.end.x, this.midY + (this.end.y - this.midY) * ((p - 0.7) / 0.3));
            }
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }

    const init = () => {
      const nodes = cardRefs.current.filter(Boolean).map(el => {
        const rect = el.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + window.scrollY + rect.height / 2 };
      });

      const tiers = [];
      nodes.forEach(n => {
        let t = tiers.find(tier => Math.abs(tier.y - n.y) < 100);
        if (t) t.nodes.push(n); else tiers.push({ y: n.y, nodes: [n] });
      });
      tiers.sort((a, b) => a.y - b.y);
      
      traces = [];
      for (let i = 0; i < tiers.length; i++) {
        const currentTier = tiers[i];
        for (let k = 0; k < currentTier.nodes.length - 1; k++) {
            traces.push(new Trace(currentTier.nodes[k], currentTier.nodes[k+1], k * 0.2));
        }
        if (i < tiers.length - 1) {
            currentTier.nodes.forEach(s => {
                tiers[i+1].nodes.forEach((e, idx) => {
                    traces.push(new Trace(s, e, i * 0.3 + idx * 0.1));
                });
            });
        }
      }
    };

    window.addEventListener('resize', () => { resize(); init(); });
    resize(); setTimeout(init, 1000); 
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      traces.forEach(t => { t.update(); t.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [cardRefs]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />;
};

// --- 3. SUB-HEADING COMPONENT ---
const SectionHeading = ({ title }) => (
  <div className="relative flex items-center justify-center w-full max-w-7xl mx-auto mb-20 px-4">
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes breatheLine {
        0%, 100% { opacity: 0.3; transform: scaleX(0.98); }
        50% { opacity: 0.8; transform: scaleX(1); }
      }
      .animate-breathe { animation: breatheLine 4s ease-in-out infinite; }
    `}} />
    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-cyan-400 animate-breathe relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
    </div>
    <h2 className="px-10 text-[11px] md:text-[13px] font-mono tracking-[1.2em] text-cyan-400 uppercase whitespace-nowrap drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
      {title}
    </h2>
    <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-cyan-500 to-cyan-400 animate-breathe relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
    </div>
  </div>
);

// --- 4. MEMBER CARD COMPONENT ---
const MemberCard = forwardRef(({ name, role, type, image }, ref) => {
  const styles = {
    coordinator: { border: "border-amber-400/20", hoverBorder: "group-hover:border-amber-400", glow: "group-hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]", text: "text-amber-400" },
    head: { border: "border-cyan-500/20", hoverBorder: "group-hover:border-cyan-500", glow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]", text: "text-cyan-400" },
    member: { border: "border-gray-700/30", hoverBorder: "group-hover:border-gray-400", glow: "group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]", text: "text-gray-400" }
  };
  const currentStyle = styles[type];

  const isVikash = name.includes("Vikash");
  const isKritika = name.includes("Kritika");

  return (
    <div ref={ref} className={`group relative bg-[#0a1628]/40 backdrop-blur-xl border ${currentStyle.border} p-8 rounded-[2rem] flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02] ${currentStyle.glow} z-20`}>
      <div className={`absolute inset-0 rounded-[2rem] border-2 border-transparent ${currentStyle.hoverBorder} transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none`} />
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative w-28 h-28 rounded-full overflow-hidden mb-6 border-2 border-white/5 bg-gray-900 group-hover:border-white/20 transition-colors duration-500">
        <img 
          src={image} 
          alt={name} 
          className={`w-full h-full object-cover transition-all duration-700
            ${isVikash ? 'mix-blend-lighten scale-150 object-[center_35%]' : ''} 
            ${isKritika ? 'object-top scale-110' : 'object-center'}`} 
        />
      </div>
      <h4 className="relative text-white font-bold text-xl tracking-tight uppercase group-hover:text-white transition-colors">{name}</h4>
      <p className={`relative font-mono text-[10px] mt-2 tracking-[0.3em] uppercase ${currentStyle.text}`}>{role}</p>
    </div>
  );
});

// --- 5. MAIN TEAMS PAGE ---
const TeamsPage = () => {
  const [mounted, setMounted] = useState(false);
  const cardRefs = useRef([]);
  cardRefs.current = [];
  const addToRefs = (el) => { if (el) cardRefs.current.push(el); };

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#010714] text-white relative overflow-x-hidden font-sans pb-0">
      <NeuralNetwork />
      <CircuitBFS cardRefs={cardRefs} />

      {/* HEADER */}
      <section className="relative z-10 pt-44 pb-16 px-6 max-w-7xl mx-auto text-center">
        <div className={`transition-all duration-1000 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="inline-block px-6 py-2 border border-cyan-500/20 bg-cyan-500/5 rounded-full mb-8">
            <span className="text-cyan-400 font-mono text-[10px] tracking-[0.5em] uppercase">Core Network Command</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-widest uppercase leading-none">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-cyan-600">TEAM</span>
          </h1>
        </div>
      </section>

      {/* COORDINATORS */}
      <section className={`relative z-10 py-12 px-6 max-w-5xl mx-auto transition-all duration-1000 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <MemberCard ref={addToRefs} name="Vikash Kushwah" role="Student Coordinator" type="coordinator" image={vikashImg} />
          <MemberCard ref={addToRefs} name="Kritika Joshi" role="Student Coordinator" type="coordinator" image={kritikaImg} />
        </div>
      </section>

      {/* TECH COMMAND */}
      <section className={`relative z-10 py-24 px-6 max-w-7xl mx-auto transition-all duration-1000 delay-500 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <SectionHeading title="Tech Command" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <MemberCard ref={addToRefs} name="Jaspreet Kaur" role="Team Head" type="head" image={jassImg} />
          <MemberCard ref={addToRefs} name="Samarth Chakrawarti" role="Team Head" type="head" image={samarthImg} />
          <MemberCard ref={addToRefs} name="Sukhanpreet Singh" role="Team Head" type="head" image={sukhanImg} />
        </div>
      </section>

      {/* COMMUNICATIONS */}
      <section className={`relative z-10 py-24 px-6 max-w-7xl mx-auto transition-all duration-1000 delay-700 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <SectionHeading title="Communications" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <MemberCard ref={addToRefs} name="Simran Maurya" role="Digital Head" type="head" image={simranImg} />
          <MemberCard ref={addToRefs} name="Dhruv Tyagi" role="Social Media Head" type="head" image={dhruvTyagiImg} />
          <MemberCard ref={addToRefs} name="Mohit Gangwar" role="PR Head" type="head" image={mohitImg} />
        </div>
      </section>

      {/* MANAGEMENT */}
      <section className={`relative z-10 pt-24 pb-20 px-6 max-w-5xl mx-auto transition-all duration-1000 delay-[900ms] transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <SectionHeading title="Management" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <MemberCard ref={addToRefs} name="Pranjal Bansal" role="Member" type="member" image={pranjalImg} />
          <MemberCard ref={addToRefs} name="Dhruv Sagar" role="Member" type="member" image={dhruvSagarImg} />
          <MemberCard ref={addToRefs} name="Komleen Kaur" role="Member" type="member" image={komleenImg} />
        </div>
      </section>
    </div>
  );
};

export default TeamsPage;
