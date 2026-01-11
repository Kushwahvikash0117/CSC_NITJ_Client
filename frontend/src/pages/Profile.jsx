import React from "react";
import clubLogo from "../assets/clublogo.png";

const Profile = () => {
  const user = {
  name: "Test User",
  email: "test@csc.com",
  role: "Member",
};


  return (
    <div className="bg-[#020617] text-white min-h-screen relative overflow-hidden">

      {/* TOP NEON LINE */}
      <div className="h-[1px] w-full bg-[#00D1FF]/30"></div>

      {/* HERO / PROFILE HEADER */}
      <section className="relative py-28 px-6 text-center">
        <img
          src={clubLogo}
          alt="CSC Logo"
          className="mx-auto w-32 opacity-60 mb-8"
        />

        <h1 className="glitch-hover text-5xl md:text-6xl font-black italic uppercase tracking-tighter">
          <span className="text-white">Your</span>{" "}
          <span className="text-[#00D1FF]">Profile</span>
        </h1>

        <p className="text-gray-400 mt-4 tracking-wide">
          Identity • Role • Access
        </p>
      </section>

      {/* PROFILE CARD */}
      <section className="relative z-10 px-6 pb-32">
        <div className="max-w-3xl mx-auto bg-black/40 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* NAME */}
            <div>
              <p className="text-gray-500 uppercase text-[10px] tracking-[0.3em] mb-2">
                Name
              </p>
              <p className="text-2xl font-bold text-[#00D1FF]">
                {user.name}
              </p>
            </div>

            {/* EMAIL */}
            <div>
              <p className="text-gray-500 uppercase text-[10px] tracking-[0.3em] mb-2">
                Email
              </p>
              <p className="text-lg font-semibold text-white break-all">
                {user.email}
              </p>
            </div>

            {/* ROLE */}
            <div>
              <p className="text-gray-500 uppercase text-[10px] tracking-[0.3em] mb-2">
                Role
              </p>
              <span className="inline-block px-5 py-2 text-xs font-black tracking-widest uppercase rounded bg-cyan-500/20 text-cyan-400">
                {user.role}
              </span>
            </div>

            {/* STATUS */}
            <div>
              <p className="text-gray-500 uppercase text-[10px] tracking-[0.3em] mb-2">
                Access Status
              </p>
              <p className="text-green-400 font-semibold">
                Authorized
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM NEON LINE */}
      <div className="neon-path-container">
        <div className="neon-pulse"></div>
      </div>
    </div>
  );
};

export default Profile;
