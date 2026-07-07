import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaExternalLinkAlt, FaCode, FaMicrochip, FaBrain, FaRocket, FaTrophy, FaBriefcase, FaTerminal, FaRobot, FaTimes, FaPaperPlane, FaBook } from 'react-icons/fa';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Tilt from 'react-parallax-tilt';
import AlgorithmPage from './AlgorithmPage';
import HeroNeuralBrain from './HeroNeuralBrain';

export default function Portfolio() {
  const [init, setInit] = useState(false);
  const [showAlgorithm, setShowAlgorithm] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Custom Cursor State
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 2}px, ${e.clientY - 2}px, 0)`;
      }
    };
    const handleMouseDown = (e) => {
      const id = Date.now();
      const rainbowColors = ['#ef4444', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6', '#d946ef'];
      const particles = Array.from({ length: 12 }).map((_, i) => ({
        id: `${id}-${i}`,
        color: rainbowColors[i % rainbowColors.length],
        xOffset: (Math.random() - 0.5) * 120, // drift left/right
        yOffset: Math.random() * 100 + 50,    // drift down
        duration: 1.5 + Math.random() * 1.5,
        rotation: (Math.random() - 0.5) * 360
      }));
      setClicks(prev => [...prev, { id, x: e.clientX, y: e.clientY, particles }]);
      setTimeout(() => {
        setClicks(prev => prev.filter(c => c.id !== id));
      }, 3000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  useEffect(() => {
    const handleMouseOver = (e) => {
      if (['A', 'BUTTON', 'INPUT'].includes(e.target.tagName) || e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  // AI Core State
  const [aiCoreStatus, setAiCoreStatus] = useState('Initializing Neural Network...');

  // Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: "Hello! I'm Sriharsha's virtual AI assistant. Ask me anything about his experience, projects, or skills!" }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    const newMsgs = [...chatMessages, { role: 'user', text: userMsg }];
    setChatMessages(newMsgs);
    setChatInput('');

    // Simulated AI response
    setTimeout(() => {
      let msg = userMsg.toLowerCase().trim();
      let aiResponse = "I'm sorry, could you please clarify?";
      
      if (msg.length >= 2) {
        const corrections = {
          'expernce': 'experience',
          'edcation': 'education',
          'projets': 'projects',
          'projct': 'project',
          'cntact': 'contact',
          'wht': 'what',
          'wat': 'what',
          'ur': 'your',
          'r': 'are',
          'u': 'you'
        };
        msg = msg.split(/\W+/).map(w => corrections[w] || w).join(' ');

        const outOfScopePatterns = [
          'weather', 'joke', 'recipe', 'cook', 'bake', 'capital', 'movie', 'song', 
          'president', 'sports', 'football', 'math', 'homework', 'poem', 'cake', 'eggs'
        ];

        if (outOfScopePatterns.some(w => msg.includes(w))) {
          aiResponse = "I specialize only in Sriharsha's portfolio. For other topics, please contact him directly.";
        } else {
          const intents = {
            identity: { keys: ['\\bbot\\b', '\\bai\\b', 'who are you', 'what are you', 'your name', 'who r u', 'ur name'], res: "I am an AI assistant built to guide you through Sriharsha's portfolio." },
            subject: { keys: ['who is this', 'whose portfolio', 'name is he', 'his name'], res: "Sriharsha Sripada, an AI & Data Science Engineer." },
            projects: { keys: ['\\bproject', '\\bportfolio', '\\bbuilt\\b', '\\bbuild\\b', '\\bwork\\b', 'omnilens', 'yolo', 'github', 'naive bayes'], res: "He built OmniLens-Pro, Inverse-Correlation Naive Bayes, and a YOLOv8 Military Object Detection system. See 'System Deployments'." },
            skills: { keys: ['\\bskill', '\\btech', '\\bstack', '\\blanguage', '\\btool', '\\bpython\\b', '\\bc\\\\+\\\\+', '\\breact', 'tensorflow', 'pytorch'], res: "Core stack: Python, C++, TensorFlow, PyTorch, React. Specializes in ML pipelines and Agentic AI." },
            experience: { keys: ['\\bexperience', '\\bbackground', '\\bintern', '\\bjob\\b', '\\brole', '\\bcareer', '\\bresume', 'done any work'], res: "He is an AI & Data Science Engineer focusing on Agentic AI Systems, ML pipelines, and advanced CV models." },
            education: { keys: ['\\beducation', '\\bstudy', '\\bcgpa\\b', '\\bgpa\\b', '\\bcollege', 'university', 'school', '\\bnit\\b', 'jee', '\\bdegree', 'btech', 'b.tech', 'mains', 'rank', 'advanced', 'air', 'achievements', 'accomplishments'], res: "B.Tech at NIT Warangal (9.26 CGPA). Secured AIR 3504 in JEE Mains and AIR 8072 in JEE Advanced." },
            contact: { keys: ['contact', '\\bhire\\b', 'email', '\\breach', 'linkedin', 'connect', 'phone', 'call'], res: "Email him at sriharshasripada25@gmail.com." },
            greetings: { keys: ['\\bhello\\b', '\\bhi\\b', '\\bhey\\b', 'greetings'], res: "Hello! Ask me about Sriharsha's projects, skills, or experience." }
          };

          let bestIntent = null;
          let maxScore = 0;

          for (const [intentName, data] of Object.entries(intents)) {
            let score = 0;
            data.keys.forEach(key => {
              const regex = new RegExp(key, 'i');
              if (regex.test(msg)) {
                score += key.length > 5 ? 3 : 2;
              }
            });
            if (score > maxScore) {
              maxScore = score;
              bestIntent = intentName;
            }
          }

          if (maxScore > 0) {
            aiResponse = intents[bestIntent].res;
          } else {
            aiResponse = "I'm not sure about that. Please contact Sriharsha directly at sriharshasripada25@gmail.com.";
          }
        }
      }

      setChatMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    }, 800);
  };

  const projects = [
    {
      title: 'Solar Flare Prediction (ISRO)',
      desc: 'Real-time solar flare prediction for the ISRO hackathon utilizing Aditya-L1 satellite data streams via SOLEXS and HEL1OS payloads.',
      link: 'https://github.com/SriHarsha25112006/Solar-Flare-Prediction',
      tags: ['Data Science', 'Machine Learning', 'Space Tech']
    },
    {
      title: 'RAG Knowledge Pipeline',
      desc: 'A robust Retrieval-Augmented Generation (RAG) system built to contextually answer queries based on custom document datasets.',
      link: 'https://github.com/SriHarsha25112006/RAG-Project',
      tags: ['Python', 'LLMs', 'RAG']
    },
    {
      title: 'TalentStage',
      desc: 'Premium AI-powered dual-sided marketplace connecting freelancers with clients. Features intelligent project scoping, AI skill verification, and smart matching using Google Gemini 1.5 Pro and LangChain.',
      link: 'https://github.com/SriHarsha25112006/TalentStage',
      tags: ['React', 'FastAPI', 'PostgreSQL', 'Agentic AI']
    },
    {
      title: 'DriveLegal',
      desc: 'Agentic AI web application providing instant, highly localized global traffic laws and fines using a LangGraph state machine, real-time web scraping, and Gemini Flash.',
      link: 'https://github.com/SriHarsha25112006/DriveLegal',
      tags: ['Python', 'LangGraph', 'Streamlit', 'Agentic AI']
    },
    {
      title: 'Inverse-Correlation Naive Bayes',
      desc: 'A mathematically principled extension to scikit-learn\'s GaussianNB that solves the double-counting flaw using Precision Matrix weighting. Achieved up to 21% accuracy improvement on OpenML datasets.',
      link: 'https://github.com/SriHarsha25112006/Naive-Bayes-Improvement',
      tags: ['Python', 'Machine Learning', 'Mathematics', 'Scikit-Learn'],
      hasAlgorithmPage: true
    },
    {
      title: 'OmniLens-Pro',
      desc: 'An intelligent AI shopping assistant that converts vague user queries into structured product intent using semantic extraction and ranking pipelines.',
      link: 'https://github.com/SriHarsha25112006/OmniLens-Pro',
      tags: ['Python', 'LLMs', 'Semantic Search', 'Agentic AI']
    },
    {
      title: 'Email-Helper-Bot',
      desc: 'An automated email assistant designed to intelligently draft, categorize, and manage emails efficiently.',
      link: 'https://github.com/SriHarsha25112006/Email-Helper-Bot',
      tags: ['Python', 'Automation', 'NLP']
    },
    {
      title: 'Multi-Objective Image Classification',
      desc: 'Led a team to build a high-precision DSSA-based image classification system achieving up to 99.63% accuracy across multiple datasets.',
      link: 'https://github.com/SriHarsha25112006/Classification-of-Dogs-and-Cats',
      tags: ['TensorFlow', 'Computer Vision', 'Deep Learning']
    },
    {
      title: 'Military Object Detection System',
      desc: 'Trained a YOLOv8-based detection model on 26k+ military images with strong camouflage adaptation and preprocessing pipelines.',
      link: 'https://github.com/SriHarsha25112006/Object-Detection-MNIST',
      tags: ['YOLOv8', 'PyTorch', 'Object Detection']
    },
    {
      title: 'AI-Driven Instruction Scheduling',
      desc: 'Developed an LSTM-based scheduler that optimized instruction pipelines and reduced execution cycles significantly.',
      link: 'https://github.com/SriHarsha25112006',
      tags: ['LSTM', 'Systems', 'Optimization']
    }
  ];

  const skills = {
    Languages: ['C++', 'Python', 'R', 'SQL', 'HTML/CSS'],
    AI_ML: ['TensorFlow', 'PyTorch', 'Scikit-Learn', 'Pandas', 'NumPy', 'SciPy'],
    Core: ['DSA', 'Operating Systems', 'DBMS', 'OOP', 'Statistical Analysis'],
    Tools: ['Git', 'VS Code', 'Google Colab', 'Jupyter', 'Streamlit']
  };

  const achievements = [
    'Selected for the highly competitive Amazon ML Summer School',
    'Placed 765 out of 2816 in the Kaggle Stellar Prediction Competition',
    'National Semi-Finalist – Serve-Smart Hackathon (IIT BHU)',
    'JEE Advanced 2024 AIR 8072 (Top 0.5%)',
    'JEE Mains 2024 AIR 3504',
    '5 Gold Medals in INTSO and KAT Olympiads',
    'Participated in multiple hackathons including Hackwise 2026, Kaggle Knight, and Code Wars'
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans cursor-none">
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Click Sparkles */}
      <AnimatePresence>
        {clicks.map(click => (
          <div key={click.id} className="fixed top-0 left-0 pointer-events-none z-[999998]" style={{ transform: `translate3d(${click.x}px, ${click.y}px, 0)` }}>
            {click.particles.map(p => (
              <motion.div
                key={p.id}
                className="absolute w-2 h-2 rounded-sm"
                style={{ 
                  backgroundColor: p.color,
                  boxShadow: `0 0 8px ${p.color}`,
                  originX: 0.5, originY: 0.5, left: -4, top: -4 
                }}
                initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
                animate={{ 
                  x: p.xOffset,
                  y: p.yOffset,
                  scale: 0,
                  opacity: 0,
                  rotate: p.rotation
                }}
                transition={{ duration: p.duration, ease: "easeOut" }}
              />
            ))}
          </div>
        ))}
      </AnimatePresence>

      {/* Rainbow Outlined Cursor */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[999999]"
      >
        <div
          className="transition-transform duration-200 ease-out will-change-transform"
          style={{ transform: isHovering ? 'scale(1.15)' : 'scale(1)' }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <defs>
              <linearGradient id="rainbowGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="20%" stopColor="#f59e0b" />
                <stop offset="40%" stopColor="#10b981" />
                <stop offset="60%" stopColor="#06b6d4" />
                <stop offset="80%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#d946ef" />
              </linearGradient>
              <filter id="cursorGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* Main Dark Base */}
            <path d="M 4 4 L 14 34 L 30 18 Z" fill="#171717" stroke="url(#rainbowGlow)" strokeWidth="2.5" filter="url(#cursorGlow)" strokeLinejoin="round" />
            {/* Inner Y Accent */}
            <path d="M 16 20 L 4 4 M 16 20 L 14 34 M 16 20 L 30 18" stroke="url(#rainbowGlow)" strokeWidth="2.5" filter="url(#cursorGlow)" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Interactive Background Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-0 pointer-events-none"
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "grab" },
              },
              modes: {
                grab: { distance: 140, links: { opacity: 0.5 } },
              },
            },
            particles: {
              color: { value: "#22d3ee" },
              links: {
                color: "#a855f7",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: 0.8,
                straight: false,
              },
              number: { density: { enable: true, area: 800 }, value: 40 },
              opacity: { value: 0.3 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 2 } },
            },
            detectRetina: true,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo(0,0)}
          >
            <FaBrain className="text-cyan-400 w-8 h-8" />
            <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Sriharsha.AI</h1>
          </motion.div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#about" className="hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all cursor-none">About</a>
            <a href="#projects" className="hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all cursor-none">Projects</a>
            <a href="#skills" className="hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all cursor-none">Skills</a>
            <a href="#achievements" className="hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all cursor-none">Achievements</a>
            <a href="mailto:sriharshasripada25@gmail.com" className="px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all cursor-none">Email Me</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="space-y-6"
          >
            <motion.div variants={fadeInUp} className="inline-block">
              <span className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                AI & Data Science Engineer
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
              Sripada <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                Sriharsha
              </span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-gray-400 leading-relaxed max-w-xl">
              B.Tech student at NIT Warangal. Passionate about machine learning, deep learning, optimization systems, and building intelligent products that shape the future.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
              <a href="mailto:sriharshasripada25@gmail.com" className="cursor-none group relative px-8 py-3 bg-cyan-500 text-black font-bold rounded-xl overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all">
                <span className="relative z-10 flex items-center gap-2"><FaEnvelope className="w-4 h-4" /> Initialize Contact</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              </a>
              <a href="https://github.com/SriHarsha25112006" target="_blank" rel="noreferrer" className="cursor-none flex items-center gap-2 px-8 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all">
                <FaGithub className="w-5 h-5" /> GitHub
              </a>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-12 max-w-lg">
              {[
                { label: 'Current CGPA', value: '9.26', color: 'cyan' },
                { label: 'JEE Mains', value: 'AIR 3504', color: 'pink' },
                { label: 'JEE Advanced', value: 'AIR 8072', color: 'purple' },
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeInUp} className="relative group rounded-2xl bg-black/50 border border-white/10 p-5 backdrop-blur-sm overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <p className={`text-2xl font-bold text-${stat.color}-400 drop-shadow-[0_0_8px_currentColor]`}>{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <HeroNeuralBrain />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
          className="relative rounded-[2rem] border border-cyan-500/20 bg-black/60 backdrop-blur-xl p-10 md:p-16 overflow-hidden group hover:border-cyan-500/50 transition-colors duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex items-center gap-4 mb-8">
            <FaBriefcase className="text-cyan-400 w-8 h-8" />
            <h2 className="text-4xl font-bold tracking-tight">About Me</h2>
          </div>
          <p className="text-gray-300 leading-relaxed text-xl max-w-4xl font-light">
            I thrive at the intersection of data and intelligence. My expertise lies in crafting robust <span className="text-cyan-300 font-medium">machine learning pipelines</span>, developing advanced <span className="text-purple-300 font-medium">computer vision</span> models, and engineering <span className="text-blue-300 font-medium">agentic AI systems</span>. I am driven by the challenge of translating complex academic research into scalable, high-performance applications that solve real-world problems.
          </p>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex items-center gap-4 mb-16">
          <FaCode className="text-cyan-400 w-8 h-8" />
          <h2 className="text-4xl font-bold tracking-tight">System Deployments</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="h-full">
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2500} className="h-full rounded-[2rem]">
                <a 
                  href={project.hasAlgorithmPage ? "#" : project.link} 
                  target={project.hasAlgorithmPage ? "_self" : "_blank"} 
                  rel="noreferrer"
                  onClick={(e) => { 
                    if (project.hasAlgorithmPage) {
                      e.preventDefault();
                      setShowAlgorithm(true);
                    }
                  }}
                  className="cursor-none group relative h-full flex flex-col rounded-[2rem] border border-white/10 bg-black/60 backdrop-blur-xl p-8 hover:border-cyan-500/50 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] transition-colors duration-300"
                >
                  <div className="absolute top-8 right-8 text-white/20 group-hover:text-cyan-400 transition-colors">
                    <FaExternalLinkAlt className="w-5 h-5" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-cyan-500/50 transition-all">
                    <FaRocket className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all">{project.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-8 flex-1">{project.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5 relative pr-12">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-gray-300 font-mono tracking-wide group-hover:border-cyan-500/30 group-hover:text-cyan-200 transition-colors">
                        {tag}
                      </span>
                    ))}
                    {project.hasAlgorithmPage && (
                      <button 
                        onClick={(e) => { e.preventDefault(); setShowAlgorithm(true); }}
                        className="absolute bottom-0 right-0 w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/30 flex items-center justify-center text-purple-400 transition-all cursor-none z-10 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                        title="Read Algorithm Deep Dive"
                      >
                        <FaBook />
                      </button>
                    )}
                  </div>
                </a>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex items-center gap-4 mb-16">
          <FaMicrochip className="text-cyan-400 w-8 h-8" />
          <h2 className="text-4xl font-bold tracking-tight">Tech Stack</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(skills).map(([category, items], index) => (
            <motion.div 
              key={index} 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="rounded-[2rem] border border-white/10 bg-black/60 backdrop-blur-xl p-8 hover:border-purple-500/40 hover:bg-white/[0.05] transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-200 uppercase tracking-widest">{category.replace('_', ' / ')}</h3>
              <div className="flex flex-wrap gap-3">
                {items.map((item, i) => (
                  <span key={i} className="px-4 py-2 rounded-lg bg-white/5 text-sm text-gray-300 hover:text-white hover:bg-purple-500/20 hover:border-purple-500/50 border border-transparent transition-all cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex items-center gap-4 mb-16">
          <FaTrophy className="text-cyan-400 w-8 h-8" />
          <h2 className="text-4xl font-bold tracking-tight">Milestones</h2>
        </motion.div>

        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <motion.div 
              key={index} 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="group rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl p-6 flex items-center gap-6 hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>
              </div>
              <p className="text-lg text-gray-300 group-hover:text-white transition-colors">{achievement}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer / CTA */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-white/10 mt-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.1),transparent_50%)]"></div>
        <div className="relative text-center max-w-3xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-5xl md:text-6xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
            Let's Engineer the Future
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-gray-400 text-xl mb-12">
            Open to collaborative projects and opportunities in AI, ML, and high-performance systems.
          </motion.p>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex justify-center gap-6">
            <a href="mailto:sriharshasripada25@gmail.com" className="px-10 py-4 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all flex items-center gap-2 cursor-none">
              <FaEnvelope className="w-5 h-5" /> Connect
            </a>
            <a href="https://linkedin.com/in/sri-harsha-sripada-489577341" target="_blank" rel="noreferrer" className="px-10 py-4 rounded-xl border border-white/20 hover:border-cyan-500/50 hover:bg-white/5 transition-all flex items-center gap-2 cursor-none">
              <FaLinkedin className="w-5 h-5" /> LinkedIn
            </a>
          </motion.div>
        </div>
      </section>

      {/* AI Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-auto">
        {/* Chat Window */}
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 md:w-96 rounded-2xl border border-purple-500/30 bg-black/80 backdrop-blur-xl shadow-[0_0_30px_rgba(168,85,247,0.2)] overflow-hidden flex flex-col cursor-auto"
          >
            {/* Header */}
            <div className="bg-purple-600/20 px-4 py-3 border-b border-purple-500/20 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FaRobot className="text-purple-400 w-5 h-5" />
                <span className="font-semibold text-purple-100">Ask My AI</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white transition-colors cursor-none">
                <FaTimes />
              </button>
            </div>
            
            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-4 text-sm flex flex-col">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-xl px-4 py-2 ${msg.role === 'user' ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-100 rounded-tr-none' : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleChatSubmit} className="p-3 border-t border-white/10 bg-black/40 flex gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about my projects..." 
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50 cursor-none"
              />
              <button type="submit" className="bg-purple-500/20 border border-purple-500/30 hover:bg-purple-500 hover:text-black text-purple-400 rounded-lg px-3 flex items-center justify-center transition-all cursor-none">
                <FaPaperPlane className="w-3 h-3" />
              </button>
            </form>
          </motion.div>
        )}

        {/* Floating Button */}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] flex items-center justify-center text-white transition-all hover:scale-110 cursor-none"
        >
          {isChatOpen ? <FaTimes className="w-6 h-6" /> : <FaRobot className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {showAlgorithm && <AlgorithmPage onClose={() => setShowAlgorithm(false)} />}
      </AnimatePresence>

    </div>
  );
}
