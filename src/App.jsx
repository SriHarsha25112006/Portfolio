import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code2, Cpu, BrainCircuit, Rocket, Trophy, Briefcase } from 'lucide-react';

export default function Portfolio() {
  const projects = [
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
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans">
      {/* Animated Neon Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/20 blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <BrainCircuit className="text-cyan-400 w-8 h-8" />
            <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Sriharsha.AI</h1>
          </motion.div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
            <a href="#about" className="hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all">About</a>
            <a href="#projects" className="hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all">Projects</a>
            <a href="#skills" className="hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all">Skills</a>
            <a href="#achievements" className="hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all">Achievements</a>
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
              <a href="mailto:sriharshasripada25@gmail.com" className="group relative px-8 py-3 bg-cyan-500 text-black font-bold rounded-xl overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all">
                <span className="relative z-10 flex items-center gap-2"><Mail className="w-4 h-4" /> Initialize Contact</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              </a>
              <a href="https://github.com/SriHarsha25112006" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-8 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all">
                <Github className="w-5 h-5" /> GitHub
              </a>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
              {[
                { label: 'Current CGPA', value: '9.26', color: 'cyan' },
                { label: 'Images Processed', value: '26k+', color: 'purple' },
                { label: 'Best Accuracy', value: '99.6%', color: 'blue' },
                { label: 'JEE Mains', value: 'AIR 3504', color: 'pink' },
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeInUp} className="relative group rounded-2xl bg-black/50 border border-white/10 p-5 backdrop-blur-sm overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <p className={`text-2xl font-bold text-${stat.color}-400 drop-shadow-[0_0_8px_currentColor]`}>{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-[3rem] blur-3xl animate-pulse"></div>
            <div className="relative h-[600px] w-full rounded-[3rem] border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col justify-center items-center p-8">
              <Cpu className="w-32 h-32 text-cyan-500/50 mb-8 animate-bounce" style={{ animationDuration: '3s' }} />
              <div className="w-full space-y-4">
                 <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 w-[95%] shadow-[0_0_10px_#06b6d4]"></div>
                 </div>
                 <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[85%] shadow-[0_0_10px_#a855f7]"></div>
                 </div>
                 <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[90%] shadow-[0_0_10px_#3b82f6]"></div>
                 </div>
              </div>
              <p className="mt-8 text-cyan-400 font-mono text-sm tracking-widest uppercase animate-pulse">System Systems Operational</p>
            </div>
          </motion.div>
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
            <Briefcase className="text-cyan-400 w-8 h-8" />
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
          <Code2 className="text-cyan-400 w-8 h-8" />
          <h2 className="text-4xl font-bold tracking-tight">System Deployments</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.a 
              href={project.link} target="_blank" rel="noreferrer"
              key={index} 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="group relative block rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-sm p-8 hover:-translate-y-2 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)]"
            >
              <div className="absolute top-8 right-8 text-white/20 group-hover:text-cyan-400 transition-colors">
                <ExternalLink className="w-6 h-6" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-cyan-500/50 transition-all">
                <Rocket className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all">{project.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-8">{project.desc}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-gray-300 font-mono tracking-wide group-hover:border-cyan-500/30 group-hover:text-cyan-200 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex items-center gap-4 mb-16">
          <Cpu className="text-cyan-400 w-8 h-8" />
          <h2 className="text-4xl font-bold tracking-tight">Tech Stack</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(skills).map(([category, items], index) => (
            <motion.div 
              key={index} 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-sm p-8 hover:border-purple-500/40 hover:bg-white/[0.02] transition-all duration-300"
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
          <Trophy className="text-cyan-400 w-8 h-8" />
          <h2 className="text-4xl font-bold tracking-tight">Milestones</h2>
        </motion.div>

        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <motion.div 
              key={index} 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="group rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-6 flex items-center gap-6 hover:border-cyan-500/30 hover:bg-white/[0.02] transition-all"
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
            <a href="mailto:sriharshasripada25@gmail.com" className="px-10 py-4 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all flex items-center gap-2">
              <Mail className="w-5 h-5" /> Connect
            </a>
            <a href="https://linkedin.com/in/sri-harsha-sripada-489577341" target="_blank" rel="noreferrer" className="px-10 py-4 rounded-xl border border-white/20 hover:border-cyan-500/50 hover:bg-white/5 transition-all flex items-center gap-2">
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
