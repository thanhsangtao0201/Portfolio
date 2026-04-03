/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { ArrowRight, ExternalLink, X, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.50;
      
      const attemptPlay = () => {
        audio.play().then(() => {
          setIsMusicPlaying(true);
          // Remove listeners once music starts
          window.removeEventListener('click', attemptPlay);
          window.removeEventListener('touchstart', attemptPlay);
        }).catch(err => {
          console.log("Autoplay waiting for interaction:", err);
        });
      };

      // Try to play immediately
      attemptPlay();

      // Add listeners for first interaction as a fallback
      window.addEventListener('click', attemptPlay);
      window.addEventListener('touchstart', attemptPlay);

      return () => {
        window.removeEventListener('click', attemptPlay);
        window.removeEventListener('touchstart', attemptPlay);
      };
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Playback blocked:", err));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const projects = [
    { 
      name: "Homing", 
      image: "https://i.postimg.cc/26SrTJj9/Homing.png",
      description: "Smart real estate search and management platform, helping users easily find their dream home with advanced filtering tools and unique gamification features.",
      demoUrl: "https://homing.com",
      status: "Live & Active",
      category: "Real Estate · Website + Mobile App",
      role: "UI/UX Designer",
      whatIDid: [
        "UI design for all Homing features",
        "Rebuilt the design system",
        "Collaborated with Devs, BA, QA, and PM",
        "Supported marketing & advertising materials"
      ],
      tools: ["Figma", "Gemini", "Claude"],
      tags: ["#RealEstate", "#Website", "#MobileApp", "#UIDesign"]
    },
    { 
      name: "Plaza DEX (Titan Corp)", 
      image: "https://i.postimg.cc/xC1ng7j6/Plaza.png",
      description: "B2B Decentralized Exchange (DEX) platform — combining Web3 and traditional finance, supporting multi-chain blockchain with a simple, highly secure interface.",
      demoUrl: "https://plazadex.com",
      status: "Completed · 2-month partnership",
      category: "Blockchain · Website System",
      role: "UI/UX Designer (Contract)",
      whatIDid: [
        "UI/UX design for 3 roles: User, Admin, and Mobile App",
        "Direct collaboration with BA, Dev, and PM",
        "Conducted prototyping",
        "Presented designs to stakeholders"
      ],
      tools: ["Figma"],
      tags: ["#Blockchain", "#WebsiteSystem", "#DEX", "#UIDesign"]
    },
    { 
      name: "NCM Cafe", 
      image: "https://i.postimg.cc/LX82v74W/NCM.png",
      description: "Comprehensive operation management system for cafe chains — integrating order management, HR, inventory, and loyalty programs on both Web and Mobile App.",
      demoUrl: "https://www.ncmcafe.com",
      status: "Launched",
      category: "F&B · Management System",
      role: "UI/UX Designer",
      whatIDid: [
        "UI/UX design for 3 roles: User, Admin, and Mobile App",
        "Built the Design System",
        "Conducted prototyping",
        "Direct collaboration with BA, Dev, and PM"
      ],
      tools: ["Figma", "Illustrator", "Photoshop", "Gemini"],
      tags: ["#F&B", "#Management", "#Loyalty", "#UIDesign"]
    },
    { 
      name: "Wellcare365", 
      image: "https://i.postimg.cc/rmwMgbyY/Wellcare.png",
      description: "Comprehensive healthcare application for VVIP clients — integrating premium medical services, mental health, and luxury lifestyle utilities.",
      demoUrl: "",
      status: "In Progress ⭐ Client Highlight",
      category: "Healthcare · Mobile App",
      role: "UI/UX Designer",
      whatIDid: [
        "Mobile App design for 2 roles: User and Doctor",
        "Analyzed functional flows",
        "Optimized flows for multi-threaded services",
        "Conducted prototyping for design demos",
        "Collaborated with Dev and PM"
      ],
      tools: ["Figma", "Illustrator", "Photoshop", "Gemini", "GPT"],
      tags: ["#Healthcare", "#MobileApp", "#VVIP", "#UIDesign"],
      highlight: true
    },
    { 
      name: "PharcEco", 
      image: "https://i.postimg.cc/DZwn5Df1/Pharc_Eco.png",
      description: "Medical application for the elderly — online medicine purchase, appointment booking, health tracking, and daily life support utilities with a minimal, easy-to-use interface.",
      demoUrl: "",
      status: "In Progress ⭐ Client Highlight",
      category: "Healthcare · Mobile App",
      role: "UI/UX Designer",
      whatIDid: [
        "Mobile App design for 2 roles: User and Doctor",
        "Analyzed functional flows",
        "Optimized flows for multi-threaded services",
        "Conducted prototyping for design demos",
        "Collaborated with Dev and PM"
      ],
      tools: ["Figma", "Illustrator", "Photoshop", "Gemini", "GPT"],
      tags: ["#Healthcare", "#MobileApp", "#ElderlyCare", "#UIDesign"],
      highlight: true
    }
  ];

  return (
    <div className="relative min-h-screen md:h-screen w-full overflow-y-auto overflow-x-hidden md:overflow-hidden font-sans bg-black">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://i.postimg.cc/9fPpjfPS/2dsd.png")',
          filter: 'brightness(0.6) contrast(1.2)'
        }}
      />
      
      {/* Gradient Overlay for depth */}
      <div className="fixed inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      <div className="fixed inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="fixed inset-0 bg-gradient-to-l from-black to-black/30" />

      {/* Stage Light Beams */}
      <div className="fixed inset-0 opacity-70 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            opacity: [0.4, 0.7, 0.4],
            rotate: [-3, 3, -3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] left-[5%] w-[70%] h-[160%] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-[300px] origin-top"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        />
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            rotate: [3, -3, 3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -top-[20%] right-[5%] w-[60%] h-[160%] bg-gradient-to-r from-transparent via-fuchsia-500/25 to-transparent blur-[300px] origin-top"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        />
        <motion.div 
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            scaleX: [1, 1.3, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] left-[25%] w-[50%] h-[130%] bg-gradient-to-r from-transparent via-amber-200/20 to-transparent blur-[350px] origin-top"
          style={{ clipPath: 'polygon(50% 0%, 10% 100%, 90% 100%)' }}
        />
      </div>

      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-6 left-6 md:top-8 md:left-12 z-20 flex items-center gap-6"
      >
        <div className="text-white text-[32px] leading-[40px] font-bold text-left font-sans select-none">
          Sang Tào
        </div>

        {/* Music Toggle */}
        <button 
          onClick={toggleMusic}
          className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
        >
          <div className="relative flex items-center justify-center w-4 h-4">
            {isMusicPlaying ? (
              <>
                <Volume2 size={14} className="text-white" />
                <span className="absolute inset-0 animate-ping bg-white/20 rounded-full" />
              </>
            ) : (
              <VolumeX size={14} className="text-white/40" />
            )}
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 group-hover:text-white/80 transition-colors">
            {isMusicPlaying ? 'Music On' : 'Music Off'}
          </span>
        </button>
      </motion.div>

      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef}
        src="https://res.cloudinary.com/doyiwqspw/video/upload/v1775185349/sound_jh4jgb.mp3" 
        loop 
        preload="auto"
      />

      {/* Project List & Achievements */}
      <div className="relative md:absolute left-0 md:left-12 top-0 md:top-[45%] md:-translate-y-1/2 z-20 w-full md:w-72 px-6 md:px-0 pt-24 md:pt-0 pb-12 md:pb-0 space-y-8 md:space-y-6">
        {/* Featured Projects Section */}
        <div className="space-y-3">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white/40 text-[10px] uppercase font-black tracking-[0.2em] pl-1"
          >
            Featured projects
          </motion.h3>
          <div className="space-y-2">
            {projects.map((project, index) => (
              <div key={project.name} className="relative">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => setSelectedProject(index)}
                  className={`flex items-center justify-between px-6 py-4 backdrop-blur-md border transition-all duration-300 cursor-pointer group ${
                    selectedProject === index 
                      ? 'bg-white/20 border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                      : 'bg-white/5 border-white/10 hover:bg-white/15'
                  }`}
                >
                  <span className="text-sm font-medium tracking-wide text-white/90 transition-all duration-300 group-hover:pl-[10px]">{project.name}</span>
                  <ArrowRight size={18} className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </motion.div>

                {/* Preview Popover */}
                <AnimatePresence>
                  {hoveredProject === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: 10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: 10 }}
                      className="hidden md:block absolute left-full ml-6 top-1/2 -translate-y-1/2 w-64 h-48 rounded-none overflow-hidden border border-white/20 shadow-2xl pointer-events-none z-50"
                    >
                      <img 
                        src={project.image} 
                        alt={project.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 text-white text-xs font-bold uppercase tracking-widest">
                        Preview
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="space-y-3 pt-4">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white/40 text-[10px] uppercase font-black tracking-[0.2em] pl-1"
          >
            Achievements
          </motion.h3>
          <div className="space-y-[10px] pl-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="text-[14px] text-white flex items-center gap-2"
            >
              <span>🏆</span> Outstanding Nomad Award 2025
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="text-[14px] text-white flex items-center gap-2"
            >
              <span className="text-white/40">✦</span> Positive client feedback on key projects
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="text-[14px] text-white flex items-center gap-2"
            >
              <span>🛠️</span> 
              <span>
                Variable Design System <span className="text-white/20 mx-1">·</span> 
                Framer Prototyping <span className="text-white/20 mx-1">·</span> 
                AI Integration <span className="text-white/20 mx-1">·</span> 
                +more
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Character Image */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed md:absolute right-[-20%] md:right-0 bottom-0 z-10 h-[60vh] md:h-[90vh] w-auto pointer-events-none opacity-40 md:opacity-100"
      >
        {/* Overlay to blend the bottom of the character */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </motion.div>

      {/* Tech Stack Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="relative md:absolute bottom-0 md:bottom-12 left-0 md:left-12 z-20 flex flex-col space-y-3 px-6 md:px-0 pb-12 md:pb-0"
      >
        <div className="flex flex-wrap gap-2 w-full md:w-[550px]">
          {[
            { 
              name: "Figma", 
              icon: (
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" 
                  alt="Figma" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              )
            },
            { 
              name: "Claude", 
              icon: (
                <img 
                  src="https://i.postimg.cc/L8s56N12/claude.png" 
                  alt="Claude" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              )
            },
            { 
              name: "ChatGPT", 
              icon: (
                <img 
                  src="https://i.postimg.cc/X7rFsjs4/gptlogo.png" 
                  alt="ChatGPT" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              )
            },
            { 
              name: "Gemini", 
              icon: (
                <img 
                  src="https://i.postimg.cc/vZNY4FJV/images.jpg" 
                  alt="Gemini" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              )
            },
            { 
              name: "AI Studio", 
              icon: (
                <img 
                  src="https://i.postimg.cc/hjqqmSp4/aistudio.webp" 
                  alt="AI Studio" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              )
            },
            { 
              name: "Replit", 
              icon: (
                <img 
                  src="https://i.postimg.cc/Z5MbWtGN/replit.png" 
                  alt="Replit" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              )
            },
            { 
              name: "Stitch", 
              icon: (
                <img 
                  src="https://i.postimg.cc/8z0p7Q2L/google_stitch_logo.avif" 
                  alt="Stitch" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              )
            },
            { 
              name: "Anti Gravity", 
              icon: (
                <img 
                  src="https://i.postimg.cc/7LzkbCMC/antigravity_icon_white.png" 
                  alt="Anti Gravity" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              )
            },
            { 
              name: "Framer", 
              icon: (
                <img 
                  src="https://i.postimg.cc/3xc8k5sB/framer.avif" 
                  alt="Framer" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              )
            },
          ].map((tool) => (
            <div 
              key={tool.name}
              className="flex items-center space-x-2 px-2.5 py-1.5 bg-white/[0.05] border border-white/[0.15] rounded-none hover:border-white/30 transition-colors cursor-default group"
            >
              <div className="w-4 h-4 flex items-center justify-center">
                {tool.icon}
              </div>
              <span className="text-[12px] font-medium text-white/50 group-hover:text-white/80 transition-colors">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Video Overlay Tối ưu */}
      <div className="hidden md:block absolute bottom-0 right-[10%] lg:right-[20%] z-30 w-[330px] h-[838px] pointer-events-none overflow-hidden mix-blend-lighten">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover contrast-[1.0] brightness-[1.0] saturate-[1.0]"
  >
    {/* Dán đường link video .mp4 trực tiếp (ví dụ từ Cloudinary) vào src bên dưới */}
    <source src="https://res.cloudinary.com/doyiwqspw/video/upload/v1775132794/Soccer_Player_Video_Generation_Request_1_nwdqty.mp4" type="video/mp4" />
  </video>
</div>

      {/* Project Details Overlay */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-xl bg-black/40"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`bg-zinc-900/95 border w-full max-w-[820px] max-h-[90vh] rounded-none shadow-2xl flex flex-col relative custom-scrollbar overflow-y-auto ${
                projects[selectedProject].highlight 
                  ? 'border-[rgba(255,200,0,0.4)]' 
                  : 'border-white/10'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* NEW HEADER LAYOUT */}
              <div className="flex flex-col w-full">
                {/* Row 1: Two columns */}
                <div className="flex flex-col md:flex-row w-full border-b border-white/10">
                  {/* Left col (35%): Thumbnail */}
                  <div className="w-full md:w-[35%] h-[200px] md:h-[140px] bg-zinc-800 rounded-none overflow-hidden relative">
                    <img 
                      src={projects[selectedProject].image} 
                      alt={projects[selectedProject].name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Right col (65%): Name + Hashtags */}
                  <div className="w-full md:w-[65%] p-6 flex flex-col justify-start relative">
                    <div className="flex justify-between items-start">
                      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-none">
                        {projects[selectedProject].name}
                      </h2>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-none text-[9px] font-bold text-white/80 uppercase tracking-wider border border-white/5 ${
                          projects[selectedProject].status.includes('Live') || projects[selectedProject].status.includes('Launched')
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : projects[selectedProject].status.includes('In Progress')
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-zinc-500/20 text-zinc-400'
                        }`}>
                          {projects[selectedProject].status}
                        </span>
                        <button 
                          onClick={() => setSelectedProject(null)}
                          className="p-1.5 hover:bg-white/10 rounded-none transition-colors text-white/40 hover:text-white"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-x-3 mt-3">
                      {projects[selectedProject].tags?.map((tag, i) => (
                        <span key={i} className="text-[11px] font-medium text-white/40">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 2: Full width Description */}
                <div className="px-6 py-4 border-b border-white/10">
                  <p className="text-white/70 leading-relaxed text-sm">
                    {projects[selectedProject].description}
                  </p>
                </div>
              </div>

              {/* Content Section (Contribution, Tools, Buttons) */}
              <div className="p-6 md:p-8 pt-4 md:pt-6">
                {/* Contribution Section */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-white font-bold text-sm uppercase tracking-widest opacity-40">My Contribution</h3>
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div>
                      <span className="text-white/40 block text-[10px] uppercase font-bold mb-1">Role</span>
                      <span className="text-white font-medium">{projects[selectedProject].role}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[10px] uppercase font-bold mb-1">What I did</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                        {projects[selectedProject].whatIDid.map((item, i) => (
                          <div key={i} className="text-white/80 flex items-start space-x-2 text-[13px] col-span-1">
                            <span className="text-white/30 mt-1.5">•</span>
                            <span className="leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-white/10 w-full mb-6" />

                {/* Tools Section */}
                <div className="space-y-4 mb-8">
                  <h3 className="text-white font-bold text-sm uppercase tracking-widest opacity-40">Tools Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {projects[selectedProject].tools?.map((tool, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-none text-[11px] text-white/80 font-medium">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {projects[selectedProject].demoUrl && (
                    <a 
                      href={projects[selectedProject].demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white text-black font-bold py-3 px-6 rounded-none flex items-center justify-center space-x-2 hover:bg-zinc-200 transition-colors group text-sm"
                    >
                      <span>View Live Demo</span>
                      <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className={`px-6 py-3 border border-white/10 text-white font-medium rounded-none hover:bg-white/5 transition-colors text-sm ${!projects[selectedProject].demoUrl ? 'flex-1' : ''}`}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative lines or subtle grid if needed */}
      <div className="hidden md:block absolute inset-0 pointer-events-none opacity-10">
        <div className="h-full w-full border-l border-white/20 ml-12" />
      </div>
    </div>
  );
}
