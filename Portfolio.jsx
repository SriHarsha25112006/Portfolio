export default function Portfolio(){
const projects=[
{title:'OmniLens – AI Shopping Agent',desc:'Built an intelligent shopping assistant that converts vague user queries into structured product intent using semantic extraction, ranking pipelines, and personalized recommendations.'},
{title:'Multi-Objective Image Classification',desc:'Led a team to build a high-precision DSSA-based image classification system achieving up to 99.63% accuracy across multiple datasets.'},
{title:'Military Object Detection System',desc:'Trained a YOLOv8-based detection model on 26k+ military images with strong camouflage adaptation and preprocessing pipelines.'},
{title:'AI-Driven Instruction Scheduling Optimization',desc:'Developed an LSTM-based scheduler that optimized instruction pipelines and reduced execution cycles significantly.'}
];

const skills={
Languages:['C++','Python','R','SQL','HTML/CSS'],
AI_ML:['TensorFlow','PyTorch','Scikit-Learn','Pandas','NumPy','SciPy'],
Core:['DSA','Operating Systems','DBMS','OOP','Statistical Analysis'],
Tools:['Git','VS Code','Google Colab','Jupyter','Streamlit']
};

const achievements=[
'National Semi-Finalist – Serve-Smart Hackathon (IIT BHU)',
'JEE Advanced 2024 AIR 8072 (Top 0.5%)',
'JEE Mains 2024 AIR 3504',
'5 Gold Medals in INTSO and KAT Olympiads',
'Participated in multiple hackathons including Hackwise 2026, Kaggle Knight, and Code Wars'
];

return (
<div className='min-h-screen bg-black text-white overflow-x-hidden'>
<div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.25),transparent_40%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.2),transparent_40%)]'></div>

<nav className='sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10'>
<div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
<h1 className='text-2xl font-bold tracking-wide'>Sriharsha</h1>
<div className='flex gap-6 text-sm text-gray-300'>
<a href='#about' className='hover:text-white transition'>About</a>
<a href='#projects' className='hover:text-white transition'>Projects</a>
<a href='#skills' className='hover:text-white transition'>Skills</a>
<a href='#achievements' className='hover:text-white transition'>Achievements</a>
</div>
</div>
</nav>

<section className='relative max-w-7xl mx-auto px-6 pt-24 pb-28 grid lg:grid-cols-2 gap-12 items-center'>
<div>
<p className='uppercase tracking-[0.3em] text-blue-400 text-sm mb-4'>AI & Data Science Student</p>
<h1 className='text-5xl md:text-7xl font-black leading-tight'>Sripada Sriharsha</h1>
<p className='mt-6 text-lg text-gray-300 leading-relaxed'>B.Tech student at NIT Warangal specializing in Artificial Intelligence and Data Science. Passionate about machine learning, deep learning, optimization systems, and building impactful AI products.</p>

<div className='mt-8 flex flex-wrap gap-4'>
<a href='mailto:sriharshasripada25@gmail.com' className='px-6 py-3 rounded-2xl bg-blue-500 hover:scale-105 transition font-semibold'>Contact Me</a>
<a href='https://github.com/' target='_blank' className='px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/10 transition'>GitHub</a>
<a href='https://linkedin.com/' target='_blank' className='px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/10 transition'>LinkedIn</a>
</div>

<div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-12'>
<div className='rounded-3xl bg-white/5 border border-white/10 p-5'>
<p className='text-3xl font-bold text-blue-400'>9.26</p>
<p className='text-sm text-gray-400 mt-1'>Current CGPA</p>
</div>
<div className='rounded-3xl bg-white/5 border border-white/10 p-5'>
<p className='text-3xl font-bold text-purple-400'>26k+</p>
<p className='text-sm text-gray-400 mt-1'>Images Processed</p>
</div>
<div className='rounded-3xl bg-white/5 border border-white/10 p-5'>
<p className='text-3xl font-bold text-cyan-400'>99.63%</p>
<p className='text-sm text-gray-400 mt-1'>Best Accuracy</p>
</div>
<div className='rounded-3xl bg-white/5 border border-white/10 p-5'>
<p className='text-3xl font-bold text-pink-400'>AIR 3504</p>
<p className='text-sm text-gray-400 mt-1'>JEE Mains</p>
</div>
</div>
</div>

<div className='relative'>
<div className='absolute inset-0 blur-3xl bg-blue-500/20 rounded-full'></div>
<div className='relative rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-8'>
<div className='space-y-6'>
<div>
<p className='text-gray-400 text-sm'>Education</p>
<h3 className='text-2xl font-bold mt-2'>NIT Warangal</h3>
<p className='text-gray-300 mt-1'>B.Tech in Artificial Intelligence & Data Science</p>
</div>
<div className='grid grid-cols-2 gap-4'>
<div className='rounded-2xl bg-black/40 p-5 border border-white/10'>
<p className='text-sm text-gray-400'>Semester CGPA</p>
<p className='text-2xl font-bold mt-2'>9.38</p>
</div>
<div className='rounded-2xl bg-black/40 p-5 border border-white/10'>
<p className='text-sm text-gray-400'>Hackathons</p>
<p className='text-2xl font-bold mt-2'>10+</p>
</div>
<div className='rounded-2xl bg-black/40 p-5 border border-white/10'>
<p className='text-sm text-gray-400'>Focus Area</p>
<p className='text-xl font-bold mt-2'>AI/ML</p>
</div>
<div className='rounded-2xl bg-black/40 p-5 border border-white/10'>
<p className='text-sm text-gray-400'>Experience</p>
<p className='text-xl font-bold mt-2'>Research + Development</p>
</div>
</div>
</div>
</div>
</div>
</section>

<section id='about' className='relative max-w-7xl mx-auto px-6 py-20'>
<div className='rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-10'>
<h2 className='text-4xl font-bold mb-6'>About Me</h2>
<p className='text-gray-300 leading-relaxed text-lg'>I enjoy solving challenging problems in artificial intelligence, data science, and system optimization. My work spans machine learning pipelines, computer vision, agentic AI systems, and deep learning research. I love building products that combine strong engineering with practical real-world impact.</p>
</div>
</section>

<section id='projects' className='relative max-w-7xl mx-auto px-6 py-20'>
<div className='flex items-center justify-between mb-10'>
<h2 className='text-4xl font-bold'>Featured Projects</h2>
<p className='text-gray-400'>AI • ML • Optimization • Vision</p>
</div>

<div className='grid md:grid-cols-2 gap-8'>
{projects.map((project,index)=>(
<div key={index} className='group rounded-[2rem] border border-white/10 bg-white/5 p-8 hover:-translate-y-2 transition duration-300'>
<div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 mb-6'></div>
<h3 className='text-2xl font-bold'>{project.title}</h3>
<p className='text-gray-300 mt-4 leading-relaxed'>{project.desc}</p>
</div>
))}
</div>
</section>

<section id='skills' className='relative max-w-7xl mx-auto px-6 py-20'>
<h2 className='text-4xl font-bold mb-10'>Technical Skills</h2>
<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
{Object.entries(skills).map(([category,items],index)=>(
<div key={index} className='rounded-[2rem] border border-white/10 bg-white/5 p-8'>
<h3 className='text-2xl font-bold mb-6'>{category.replace('_',' / ')}</h3>
<div className='flex flex-wrap gap-3'>
{items.map((item,i)=>(
<span key={i} className='px-4 py-2 rounded-full bg-white/10 text-sm'>{item}</span>
))}
</div>
</div>
))}
</div>
</section>

<section id='achievements' className='relative max-w-7xl mx-auto px-6 py-20'>
<h2 className='text-4xl font-bold mb-10'>Achievements</h2>
<div className='space-y-5'>
{achievements.map((achievement,index)=>(
<div key={index} className='rounded-2xl border border-white/10 bg-white/5 p-6 flex items-start gap-4'>
<div className='w-3 h-3 rounded-full bg-blue-400 mt-2'></div>
<p className='text-lg text-gray-200'>{achievement}</p>
</div>
))}
</div>
</section>

<section className='relative max-w-7xl mx-auto px-6 py-24'>
<div className='rounded-[2rem] border border-white/10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-12 text-center'>
<h2 className='text-5xl font-black'>Let’s Build Something Amazing</h2>
<p className='text-gray-300 mt-5 text-lg'>Interested in AI, ML, optimization systems, or collaborative projects? Let’s connect.</p>
<div className='flex justify-center gap-4 mt-8 flex-wrap'>
<a href='mailto:sriharshasripada25@gmail.com' className='px-8 py-4 rounded-2xl bg-white text-black font-bold hover:scale-105 transition'>Email</a>
<a href='https://github.com/' className='px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition'>GitHub</a>
</div>
</div>
</section>

<footer className='border-t border-white/10 py-8 text-center text-gray-500'>
<p>Designed & Built by Sriharsha • AI & Data Science Enthusiast</p>
</footer>
</div>
);
}
