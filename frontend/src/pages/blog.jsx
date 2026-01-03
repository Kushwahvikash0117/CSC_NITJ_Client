import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import blogImg from '../assets/blog.png';

// --- BLOG CARD (NO IMAGES) ---
const BlogCard = ({ blog }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group border-b border-slate-800 pb-10 mb-10 last:border-0"
  >
    <div className="flex items-center gap-2 mb-4">
      <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-[10px] text-black font-bold">
        {blog.author[0]}
      </div>
      <span className="text-xs text-white font-medium">{blog.author}</span>
      <span className="text-xs text-slate-500">· {blog.date}</span>
    </div>

    <div className="max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-black text-white group-hover:text-cyan-400 transition-colors cursor-pointer mb-3 leading-tight">
        {blog.title}
      </h2>
      <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
        {blog.excerpt}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="bg-slate-900 border border-slate-700 text-slate-300 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-tighter">
            {blog.category}
          </span>
          <span className="text-xs text-slate-500 font-mono">{blog.readTime}</span>
        </div>
        
        <div className="flex items-center gap-6 text-slate-500">
           <button className="hover:text-cyan-400 flex items-center gap-1 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              <span className="text-xs">{blog.likes}</span>
           </button>
           <button className="hover:text-cyan-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
           </button>
        </div>
      </div>
    </div>
  </motion.div>
);

const Blog = () => {
  const [activeTab, setActiveTab] = useState("For You");
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const img = new Image();
    img.src = blogImg;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height)
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    img.onload = () => {
      const width = 1000; 
      const height = (img.height / img.width) * width;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      const data = ctx.getImageData(0, 0, width, height).data;
      ctx.clearRect(0, 0, width, height);

      const particles = [];
      for (let y = 0; y < height; y += 3) { 
        for (let x = 0; x < width; x += 3) {
          const index = (y * width + x) * 4;
          if (data[index + 3] > 128) {
            particles.push({
              x: x + (Math.random() - 0.5) * 20, 
              y: Math.random() > 0.5 ? -500 : height + 500,
              targetX: x,
              targetY: y,
              color: `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]}, 0.8)`,
              size: Math.random() * 2 + 1,
              // ----- SPEED INCREASED HERE -----
              // Was: 0.04 + Math.random() * 0.04
              speed: 0.08 + Math.random() * 0.08 
            });
          }
        }
      }

      const animate = () => {
        ctx.fillStyle = 'rgba(2, 6, 23, 0.2)'; 
        ctx.fillRect(0, 0, width, height);
        particles.forEach(p => {
          const dxMouse = mouseRef.current.x - p.x;
          const dyMouse = mouseRef.current.y - p.y;
          const distance = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          const radius = 100;
          let xMov = p.targetX; let yMov = p.targetY;
          if (distance < radius) {
            const force = (radius - distance) / radius;
            xMov += dxMouse * force * 0.5; yMov += dyMouse * force * 0.5;
          }
          p.x += (xMov - p.x) * p.speed;
          p.y += (yMov - p.y) * p.speed;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        });
        requestAnimationFrame(animate);
      };
      animate();
    };
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const DUMMY_BLOGS = [
    {
      id: 1,
      author: "Vikash Kushwah",
      title: "The Rise of AI in Cybersecurity 2025",
      excerpt: "How machine learning is helping us identify zero-day vulnerabilities before they strike through behavioral analysis and automated response protocols...",
      date: "Oct 12",
      readTime: "5 min read",
      category: "Technology",
      likes: 124,
      comments: 12
    },
    {
      id: 2,
      author: "Kritika Joshi",
      title: "Phishing: Don't Get Reeled In",
      excerpt: "The psychological tactics behind modern social engineering and how to spot them in your inbox before your credentials are stolen...",
      date: "Oct 10",
      readTime: "8 min read",
      category: "Awareness",
      likes: 89,
      comments: 5
    }
  ];

  return (
    <div className="bg-[#020617] min-h-screen font-sans text-slate-300 selection:bg-cyan-500/40">
      
      {/* --- 1. PARTICLE IMAGE AT TOP (MOVED DOWN) --- */}
      {/* Changed pt-10 to pt-32 to move it down */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center border-b border-slate-800/50 pt-32">
        <div className="relative scale-75 md:scale-90 transition-all duration-700">
          <canvas ref={canvasRef} className="block filter drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]" />
        </div>
      </section>

      {/* --- 2. STICKY NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-black text-white tracking-tighter uppercase italic">
            CSC<span className="text-cyan-400">BLOG</span>
          </h1>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Write</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-cyan-900 border border-cyan-500/50" />
          </div>
        </div>
      </nav>

      {/* --- 3. MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Feed Area */}
        <div className="lg:col-span-8">
          <div className="flex gap-8 border-b border-slate-800 mb-10 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {["For You", "Following", "Cybersecurity", "Ethics"].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-colors relative ${activeTab === tab ? 'text-white' : 'text-slate-500'}`}
              >
                {tab}
                {activeTab === tab && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400" />}
              </button>
            ))}
          </div>

          <div>
            {DUMMY_BLOGS.map(blog => <BlogCard key={blog.id} blog={blog} />)}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-32 h-fit">
          <div className="mb-12">
            <h3 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-6">Trending Topics</h3>
            <div className="flex flex-wrap gap-2">
              {["Malware", "Web3", "Privacy", "Bounty Hunting", "Encryption", "OSINT"].map(topic => (
                <span key={topic} className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-[10px] text-slate-400 hover:border-cyan-500 hover:text-white cursor-pointer transition-all uppercase font-bold tracking-tighter">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-cyan-500/5 border border-cyan-500/20 p-8 rounded-2xl backdrop-blur-sm shadow-[0_0_30px_rgba(34,211,238,0.05)]">
            <h3 className="text-cyan-400 font-black text-xs uppercase tracking-widest mb-4">Member Spotlight</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Share your insights with the club and gain reputation points!
            </p>
            <button className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-lg transition-all">
              Start Writing
            </button>
          </div>
          
          <footer className="mt-12 text-[9px] text-slate-600 font-mono uppercase tracking-[0.3em] flex flex-wrap gap-4">
            <span>About</span>
            <span>Help</span>
            <span>Privacy</span>
          </footer>
        </aside>

      </main>
    </div>
  );
};

export default Blog;
