import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaChartLine, FaBrain, FaCogs, FaDownload } from 'react-icons/fa';

export default function AlgorithmPage({ onClose }) {
  useEffect(() => {
    // Prevent scrolling on the background when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md overflow-y-auto cursor-auto"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-4xl bg-[#0a0a0a] border border-cyan-500/30 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-6 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/30">
              <FaBrain className="text-cyan-400 w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Inverse-Correlation Naive Bayes (IC-NB)
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 flex items-center justify-center text-gray-400 hover:text-red-400 transition-all cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 max-h-[75vh] overflow-y-auto custom-scrollbar text-left">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-12">
            
            {/* 1. Why we built it */}
            <motion.section variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <FaCogs className="text-red-400 w-6 h-6" />
                <h3 className="text-xl font-bold text-gray-200">The Problem: "Double-Counting"</h3>
              </div>
              <p className="text-gray-400 leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/5">
                The standard Naive Bayes classifier assumes that all features are strictly independent given the class label. 
                In real-world datasets, this is rarely true. If two features are perfectly correlated, standard Naive Bayes 
                effectively squares their probability, heavily <span className="text-red-300 font-semibold">double-counting their evidence</span> and skewing the final prediction.
              </p>
            </motion.section>

            {/* 2. What we tried / came up with */}
            <motion.section variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <FaBrain className="text-purple-400 w-6 h-6" />
                <h3 className="text-xl font-bold text-gray-200">The Innovation: Precision Weights</h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-400 leading-relaxed">
                  To solve this, I asked: <em>If a group of features are highly correlated, how do we guarantee that their total combined evidence weight equals exactly 1?</em>
                </p>
                <div className="bg-purple-900/10 p-6 rounded-2xl border border-purple-500/20 text-gray-300 leading-relaxed">
                  The answer lies in the <strong>Precision Matrix</strong> (the inverse of the correlation matrix). 
                  By computing the absolute correlation matrix for a class, the mathematically optimal weights that neutralize the double-counting are found by solving linear equations. 
                  <br/><br/>
                  If two features are perfectly correlated, the precision matrix natively assigns them a weight of 0.5 each. If a feature is fully independent, it receives a full vote of 1.0.
                  Furthermore, I introduced an <strong>L2 ridge penalty (alpha)</strong>. When alpha is very large, the weights become uniform, safely mirroring standard GaussianNB.
                </div>
              </div>
            </motion.section>

            {/* 3. Results */}
            <motion.section variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <FaChartLine className="text-green-400 w-6 h-6" />
                <h3 className="text-xl font-bold text-gray-200">The Results</h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                Because of the automatic fallback mechanism during training, <strong>IC-NB strictly dominates GaussianNB</strong>. Benchmarking on 17 diverse OpenML datasets proved massive performance gains:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-black/50 p-4 rounded-xl border border-green-500/20 text-center">
                  <div className="text-3xl font-black text-green-400 mb-1">+21.73%</div>
                  <div className="text-sm text-gray-500">Accuracy on 'pc3' dataset</div>
                </div>
                <div className="bg-black/50 p-4 rounded-xl border border-green-500/20 text-center">
                  <div className="text-3xl font-black text-green-400 mb-1">+9.41%</div>
                  <div className="text-sm text-gray-500">Accuracy on 'vehicle' dataset</div>
                </div>
                <div className="bg-black/50 p-4 rounded-xl border border-green-500/20 text-center">
                  <div className="text-3xl font-black text-green-400 mb-1">0% Loss</div>
                  <div className="text-sm text-gray-500">Never performs worse than baseline</div>
                </div>
              </div>
            </motion.section>

            {/* 4. Download */}
            <motion.section variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <FaDownload className="text-cyan-400 w-6 h-6" />
                <h3 className="text-xl font-bold text-gray-200">How to Use It</h3>
              </div>
              <div className="bg-[#050505] p-6 rounded-2xl border border-white/10 font-mono text-sm text-gray-300">
                <p className="text-gray-500 mb-2"># Install directly from GitHub</p>
                <code className="text-cyan-300 break-all">pip install git+https://github.com/SriHarsha25112006/Naive-Bayes-Improvement.git</code>
                
                <p className="text-gray-500 mt-6 mb-2"># Use it perfectly with scikit-learn API</p>
                <code>
                  <span className="text-purple-400">from</span> icnb <span className="text-purple-400">import</span> InverseCorrelationNB<br/><br/>
                  model = InverseCorrelationNB(optimize_alpha=<span className="text-orange-400">True</span>, metric=<span className="text-green-300">'pearson'</span>)<br/>
                  model.fit(X_train, y_train)<br/>
                  y_pred = model.predict(X_test)
                </code>
              </div>
            </motion.section>

          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
