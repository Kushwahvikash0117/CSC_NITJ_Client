import React, { useState, useEffect, useRef } from 'react';
import backgroundImage from '../assets/clublogo.png';
import VikashImg from '../assets/vikash.png'; 
import KritikaImg from '../assets/kritika.png';

// Faculty Imports
import HarshImg from '../assets/harsh_sir.png';
import SamayImg from '../assets/samayveer_sir.png';
import KPImg from '../assets/kp_sir.png';
import UrvashiImg from '../assets/urvashi_mam.png';

const MagneticButton = ({ children, className, onClick }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`${className} transition-transform duration-200 ease-out`}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    >
      {children}
    </button>
  );
};

const Home = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [displayedText, setDisplayedText] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0); 
  const canvasRef = useRef(null);

  const fullAboutText = "CSC NITJ is the official Cyber Security Club under the CSE Department. We organize workshops, hackathons, and projects to enhance students' cyber skills and awareness. Join us to explore the world of cybersecurity!";

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };
    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  const handleMouseMove = (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 45;
    const y = (window.innerHeight / 2 - e.pageY) / 45;
    setOffset({ x, y });
  };

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(fullAboutText.slice(0, i));
      i++;
      if (i > fullAboutText.length) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', resize);

    const particles = [];
    const charSet = ['0', '1'];

    class DataBit {
      constructor() { this.reset(); }
      reset() {
        this.centerX = window.innerWidth / 2;
        this.centerY = window.innerHeight / 2;
        this.angle = Math.random() * Math.PI * 2;
        this.velocity = Math.random() * 1.0 + 0.8; 
        this.value = charSet[Math.floor(Math.random() * charSet.length)];
        this.fontSize = Math.random() * 5 + 11;
        this.opacity = 0; 
        this.maxOpacity = Math.random() * 0.5 + 0.3;
        this.distance = Math.random() * 50; 
        this.spawnRadius = 160; 
      }
      update(mouseOffset) {
        this.distance += this.velocity;
        const baseX = this.centerX + Math.cos(this.angle) * this.distance;
        const baseY = this.centerY + Math.sin(this.angle) * this.distance;
        this.x = baseX + (mouseOffset.x * 0.8);
        this.y = baseY + (mouseOffset.y * 0.8);
        if (this.distance > this.spawnRadius) {
          this.opacity = Math.min(this.maxOpacity, this.opacity + 0.02);
        }
        if (this.x < -100 || this.x > canvas.width + 100 || this.y < -100 || this.y > canvas.height + 100) {
          this.reset();
        }
      }
      draw() {
        if (this.distance > this.spawnRadius) {
          ctx.font = `bold ${this.fontSize}px monospace`;
          ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity})`;
          ctx.fillText(this.value, this.x, this.y);
        }
      }
    }

    for (let i = 0; i < 150; i++) {
      const p = new DataBit();
      p.distance = Math.random() * Math.max(window.innerWidth, window.innerHeight);
      particles.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(offset); p.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', resize);
    };
  }, [offset]);

  const facultyMentors = [
    { name: "Dr Harsh Kumar Verma", role: "Faculty Mentor", img: HarshImg },
    { name: "Dr Samayveer Singh", role: "Faculty Mentor", img: SamayImg },
    { name: "Dr. K P Sharma", role: "Faculty Mentor", img: KPImg },
    { name: "Dr Urvashi Garg", role: "Faculty Mentor", img: UrvashiImg }
  ];

  return (
    <div className="bg-[#020617] text-white min-h-screen font-sans relative overflow-x-hidden" onMouseMove={handleMouseMove}>
      
      <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-white/5 backdrop-blur-sm">
        <div 
          className="h-full bg-[#00D1FF] shadow-[0_0_15px_#00D1FF] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;700&display=swap');
          @keyframes energeticGlitch {
            0% { text-shadow: 3px 0 #ff00c1, -3px 0 #00fff9; transform: translate(0); }
            20% { text-shadow: -3px 0 #ff00c1, 3px 0 #00fff9; transform: translate(-2px, 1px); }
            40% { text-shadow: 3px 0 #00fff9, -3px 0 #ff00c1; transform: translate(2px, -1px); }
            60% { text-shadow: -3px 0 #ff00c1, 3px 0 #00fff9; transform: translate(-2px, -1px); }
            80% { text-shadow: 3px 0 #ff00c1, -3px 0 #00fff9; transform: translate(2px, 1px); }
            100% { text-shadow: 3px 0 #ff00c1, -3px 0 #00fff9; transform: translate(0); }
          }
          .glitch-hover:hover { animation: energeticGlitch 0.4s steps(2) infinite; }
          .cyber-line-container { width: 100%; height: 2px; background: rgba(0, 209, 255, 0.1); position: relative; overflow: hidden; z-index: 20; }
          .cyber-line-pulse { position: absolute; top: 0; height: 100%; width: 30%; background: linear-gradient(90deg, transparent, rgba(0, 209, 255, 0.8), transparent); filter: drop-shadow(0 0 8px rgba(0, 209, 255, 0.8)); animation: cyberPulse 3s infinite linear; }
          @keyframes cyberPulse { 0% { left: -30%; } 100% { left: 100%; } }
          .cyber-grid { position: absolute; width: 200%; height: 200%; top: -50%; left: -50%; background-image: linear-gradient(to right, rgba(0, 209, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 209, 255, 0.05) 1px, transparent 1px); background-size: 60px 60px; transform: perspective(1000px) rotateX(60deg); z-index: 0; pointer-events: none; }
          @keyframes revolve { from { stroke-dashoffset: 1200; } to { stroke-dashoffset: 0; } }
          @keyframes scan { 0% { top: 0%; opacity: 0; } 50% { opacity: 0.8; } 100% { top: 100%; opacity: 0; } }
          .hexagon-path { fill: none; stroke: #00ffff; stroke-width: 3; stroke-linecap: round; stroke-dasharray: 200 1000; animation: revolve 9s linear infinite; filter: drop-shadow(0 0 10px #00ffff); }
          .radar-scan { position: absolute; width: 100%; height: 1px; background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.5), transparent); box-shadow: 0 0 15px #00ffff; animation: scan 6s linear infinite; z-index: 25; pointer-events: none; }
          .cyber-button-tech { position: relative; overflow: hidden; border-radius: 6px; border: 2px solid #ffffff; background-color: #00D1FF; color: #000000; font-family: 'Space Grotesk', sans-serif; font-weight: 700; transition: 0.3s; z-index: 50; cursor: pointer; }
          .cyber-button-tech:hover { background-color: #000000 !important; color: #ffffff !important; box-shadow: 0 0 25px rgba(255, 255, 255, 0.3); }
          @keyframes dataPulse { 0% { left: -100%; opacity: 0; } 50% { opacity: 1; } 100% { left: 100%; opacity: 0; } }
          .neon-path-container { position: relative; width: 100%; height: 2px; background: rgba(0, 209, 255, 0.1); overflow: hidden; }
          .neon-pulse { position: absolute; top: 0; height: 100%; width: 20%; background: linear-gradient(90deg, transparent, #00D1FF, transparent); filter: drop-shadow(0 0 8px #00D1FF); animation: dataPulse 3s linear infinite; }
          .event-card { position: relative; background: rgba(0, 209, 255, 0.03); backdrop-filter: blur(12px); border: 1px solid rgba(0, 209, 255, 0.2); border-radius: 12px; overflow: hidden; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); z-index: 1; }
          .event-card::before { content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: conic-gradient(transparent, rgba(0, 209, 255, 0.3), transparent 30%); animation: rotateGlow 4s linear infinite; z-index: -1; }
          @keyframes rotateGlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          .event-card:hover { transform: translateY(-12px) scale(1.02); background: rgba(0, 209, 255, 0.08); border-color: rgba(0, 209, 255, 0.6); box-shadow: 0 20px 40px -15px rgba(0, 209, 255, 0.4); }
          
          .leader-img-container { 
            position: relative; 
            width: 160px; 
            height: 160px; 
            padding: 4px; 
            border-radius: 50%; 
            border: 2px solid rgba(0, 209, 255, 0.5); 
            background: #020617;
            box-shadow: 0 0 15px rgba(0, 209, 255, 0.2);
            transition: all 0.3s ease;
          }
          .leader-img-container:hover {
            border-color: #00D1FF;
            box-shadow: 0 0 25px rgba(0, 209, 255, 0.4);
          }
        `}
      </style>

      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center px-4 z-10 overflow-hidden">
        <div className="cyber-grid" style={{ transform: `perspective(1000px) rotateX(60deg) translateY(${offset.y * 5}px)` }} />
        <div className="relative w-full max-w-[85vh] aspect-square flex items-center justify-center" style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}>
          <div className="radar-scan" />
          <img src={backgroundImage} className="absolute inset-0 w-full h-full object-contain opacity-60 z-10 select-none pointer-events-none" style={{ filter: 'brightness(0.7) contrast(1.1)', transform: `scale(1.05) translate(${offset.x * 0.4}px, ${offset.y * 0.4}px)` }} alt="Logo" />
          <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full z-20 pointer-events-none scale-[0.88]">
            <path className="hexagon-path" d="M250,50 L423,150 L423,350 L250,450 L77,350 L77,150 Z" />
          </svg>
          <div className="relative z-30 flex flex-col items-center justify-center text-center">
            <h1 className="glitch-hover cursor-default text-5xl md:text-7xl font-black italic uppercase leading-none tracking-tighter">
              <span className="text-white">CSC</span> <span className="text-[#00D1FF]">NITJ</span>
            </h1>
            <p className="text-[10px] md:text-sm text-cyan-100 font-bold uppercase tracking-[0.2em] mt-4 opacity-80">Building Cyber Awareness & Ethical Hacking Skills</p>
            <div className="h-32"></div>
            <MagneticButton 
              onClick={() => window.location.hash = '#about'}
              className="cyber-button-tech px-8 py-3 uppercase text-[11px] tracking-[0.3em]"
            >
              Learn More
            </MagneticButton>
          </div>
        </div>
      </section>

      <div className="neon-path-container">
        <div className="neon-pulse" />
      </div>

      {/* 2. ABOUT US SECTION */}
      <section id="about" className="relative z-10 py-32 px-6 bg-[#020617]/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="glitch-hover text-[#00D1FF] text-5xl md:text-7xl font-black italic uppercase mb-10 tracking-tighter">About Us</h2>
          <div className="bg-black/40 p-8 rounded-lg border border-cyan-500/20 font-mono text-left relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/30"></div>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              <span className="text-[#00D1FF] mr-2 font-bold">{'>'}</span>
              {displayedText}
              <span className="animate-pulse bg-[#00D1FF] ml-1 inline-block w-2 h-5"></span>
            </p>
          </div>
          <div className="mt-12">
            <MagneticButton 
              onClick={() => window.location.hash = '#team'}
              className="px-6 py-2 text-[#00D1FF] font-bold uppercase tracking-[0.3em] text-xs border border-cyan-500/30 rounded hover:bg-cyan-500/10"
            >
              Meet Our Team &rarr;
            </MagneticButton>
          </div>
        </div>
      </section>

      <div className="cyber-line-container">
        <div className="cyber-line-pulse"></div>
      </div>

      {/* 3. OUR EVENTS SECTION */}
      <section id="events" className="relative z-10 py-24 px-6 bg-black/20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="glitch-hover text-[#00D1FF] text-5xl md:text-7xl font-black italic uppercase mb-20 tracking-tighter">
            Our Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="event-card p-12 flex flex-col items-center justify-center min-h-[300px]">
              <h3 className="text-[#00D1FF] text-3xl font-bold mb-6 tracking-wide uppercase">Hackathon 2025</h3>
              <p className="text-gray-400 text-lg leading-relaxed font-medium max-w-sm text-center">Join us for 24 hours of coding challenges and prizes!</p>
            </div>
            <div className="event-card p-12 flex flex-col items-center justify-center min-h-[300px]">
              <h3 className="text-[#00D1FF] text-3xl font-bold mb-6 tracking-wide uppercase">Cyber Workshop</h3>
              <p className="text-gray-400 text-lg leading-relaxed font-medium max-w-sm text-center">Hands-on sessions on ethical hacking and penetration testing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FACULTY MENTORS SECTION */}
      <section className="relative z-10 py-32 px-6 bg-black/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="glitch-hover text-[#00D1FF] text-5xl md:text-7xl font-black italic uppercase mb-24 tracking-tighter">Faculty Mentors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {facultyMentors.map((faculty, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="leader-img-container mb-6 group overflow-hidden">
                  <img 
                    src={faculty.img} 
                    className="w-full h-full object-cover rounded-full transition-all duration-500" 
                    alt={faculty.name} 
                  />
                </div>
                <h3 className="text-[#00D1FF] text-lg font-bold tracking-wider">{faculty.name}</h3>
                <p className="text-gray-500 uppercase text-[8px] font-bold tracking-[0.4em] mt-2">{faculty.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="neon-path-container">
        <div className="neon-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* 5. OUR LEADERS SECTION */}
      <section id="team" className="relative z-10 py-32 px-6 bg-black/40">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="glitch-hover text-[#00D1FF] text-5xl md:text-7xl font-black italic uppercase mb-24 tracking-tighter">Our Leaders</h2>
          <div className="flex flex-wrap justify-center gap-20 md:gap-32">
            <div className="flex flex-col items-center">
              <div className="leader-img-container mb-8 group overflow-hidden">
                <img 
                  src={VikashImg} 
                  className="w-full h-full object-cover rounded-full transition-transform duration-500" 
                  style={{ transform: 'scale(1.8)', objectPosition: '50% 30%' }} 
                  alt="Vikash" 
                />
              </div>
              <h3 className="text-[#00D1FF] text-2xl font-bold tracking-wider">Vikash Kushwah</h3>
              <p className="text-gray-500 uppercase text-[10px] font-bold tracking-[0.4em] mt-2">Lead / Coordinator</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="leader-img-container mb-8 group overflow-hidden">
                <img 
                  src={KritikaImg} 
                  className="w-full h-full object-cover rounded-full transition-transform duration-500" 
                  style={{ transform: 'scale(1.2)', objectPosition: '50% 10%' }} 
                  alt="Kritika" 
                />
              </div>
              <h3 className="text-[#00D1FF] text-2xl font-bold tracking-wider">Kritika Joshi</h3>
              <p className="text-gray-500 uppercase text-[10px] font-bold tracking-[0.4em] mt-2">Lead / Coordinator</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
