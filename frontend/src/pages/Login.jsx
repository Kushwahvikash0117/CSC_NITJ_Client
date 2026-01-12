import React, { useState } from "react";
import axios from "axios";
import clubLogo from '../assets/clublogo.png'; // Make sure this path exists

function Login({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 
    
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { 
          email: email, 
          password: password 
      });
      
      // 1. Save Token
      localStorage.setItem("token", res.data.token);
      
      // 2. Notify App.jsx that login is successful 
      // (This triggers the switch from Animation -> Dashboard)
      onLogin(); 

    } catch (err) {
      setError("Invalid Email or Password");
      console.error(err);
    }
  };

  return (
    <div className="relative z-50 w-full max-w-md bg-[#0a0f1c] border border-cyan-900/50 rounded-xl p-8 shadow-[0_0_50px_rgba(0,209,255,0.15)] backdrop-blur-sm">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 mb-4 relative">
             <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full"></div>
             <img src={clubLogo} alt="CSC" className="w-full h-full object-contain relative z-10" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-2">
            TERMINAL <span className="text-[#00D1FF]">LOGIN</span>
          </h1>
          <p className="text-gray-500 text-[10px] tracking-[0.4em] font-bold uppercase">Authorization Required</p>
        </div>

        {/* --- FORM --- */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* EMAIL INPUT */}
          <div className="space-y-2">
            <label className="text-[#00D1FF] text-xs font-bold tracking-widest uppercase ml-1 block">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full bg-[#050911] border border-gray-800 text-cyan-50 placeholder-gray-600 text-sm rounded-lg p-4 outline-none focus:border-[#00D1FF] focus:shadow-[0_0_15px_rgba(0,209,255,0.3)] transition-all duration-300 font-mono"
              required
            />
          </div>

          {/* PASSWORD INPUT */}
          <div className="space-y-2">
            <label className="text-[#00D1FF] text-xs font-bold tracking-widest uppercase ml-1 block">Security Key</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#050911] border border-gray-800 text-cyan-50 placeholder-gray-600 text-sm rounded-lg p-4 outline-none focus:border-[#00D1FF] focus:shadow-[0_0_15px_rgba(0,209,255,0.3)] transition-all duration-300 font-mono tracking-widest"
              required
            />
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-500/10 border-l-4 border-red-500 text-red-500 text-xs font-bold p-3 uppercase tracking-wider flex items-center">
              <span className="mr-2">⚠️</span> {error}
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button 
            type="submit" 
            className="w-full bg-[#00D1FF] hover:bg-[#00c2ee] text-black font-black uppercase tracking-[0.1em] py-4 rounded-md mt-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,209,255,0.6)] active:scale-[0.98]"
          >
            Access System
          </button>

          {/* TOGGLE TO REGISTER */}
          <div className="text-center pt-4 border-t border-gray-800/50 mt-6">
             <button 
               type="button"
               onClick={onSwitchToRegister}
               className="text-gray-500 text-[10px] tracking-[0.2em] font-bold uppercase hover:text-[#00D1FF] transition-colors"
             >
               New User? Register Here
             </button>
          </div>

        </form>
    </div>
  );
}

export default Login;