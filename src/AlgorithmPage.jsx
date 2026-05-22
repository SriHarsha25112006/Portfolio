import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaChartLine, FaBrain, FaCogs, FaDownload, FaFlask, FaExclamationTriangle, FaCheckCircle, FaLightbulb, FaEnvelope, FaRocket } from 'react-icons/fa';

export default function AlgorithmPage({ onClose }) {
  useEffect(() => {
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
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl overflow-y-auto cursor-auto"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-5xl bg-[#0a0a0a] border border-cyan-500/30 rounded-3xl shadow-[0_0_80px_rgba(6,182,212,0.15)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-6 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <FaBrain className="text-cyan-400 w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Research Log: Improving Naive Bayes
              </h2>
              <p className="text-cyan-500/70 text-sm font-mono tracking-wider mt-1">THE JOURNEY BEYOND GAUSSIAN-NB</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 flex items-center justify-center text-gray-400 hover:text-red-400 transition-all cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10 max-h-[80vh] overflow-y-auto custom-scrollbar text-left bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-16">
            
            {/* Goal & Baseline */}
            <motion.section variants={fadeInUp} className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-cyan-500/30 rounded-r-md"></div>
              <div className="flex items-center gap-3 mb-6">
                <FaCogs className="text-cyan-400 w-7 h-7" />
                <h3 className="text-2xl font-bold text-gray-100 tracking-tight">Goal & The Baseline Issue</h3>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="text-gray-300 leading-relaxed mb-4">
                  <strong>Goal:</strong> Design a modified Naive Bayes algorithm that can outperform sklearn's GaussianNB on datasets containing feature dependencies.
                </p>
                <p className="text-gray-400 leading-relaxed mb-4">
                  <strong>The Flaw:</strong> Naive Bayes assumes conditional independence: <code className="text-cyan-300 bg-black/50 px-2 py-1 rounded">P(X1,X2,...,Xn | Y) = Π P(Xi | Y)</code>. 
                  But in real datasets (like Height/Weight/BMI, or pixel neighbors), features are heavily correlated. 
                  <span className="text-red-400 block mt-2">Because of this, standard Naive Bayes double-counts evidence.</span>
                </p>
                <div className="bg-black/50 p-4 rounded-xl border border-white/5 flex flex-col md:flex-row justify-between items-center mt-6">
                  <div className="text-gray-400">Baseline accuracy on Digits Dataset:</div>
                  <div className="text-2xl font-mono text-orange-400 font-bold mt-2 md:mt-0">GaussianNB ≈ 0.7417</div>
                </div>
              </div>
            </motion.section>

            {/* Research Idea 1 & 2 */}
            <motion.section variants={fadeInUp} className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-purple-500/30 rounded-r-md"></div>
              <div className="flex items-center gap-3 mb-6">
                <FaFlask className="text-purple-400 w-7 h-7" />
                <h3 className="text-2xl font-bold text-gray-100 tracking-tight">Early Experiments</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Idea 1 */}
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h4 className="text-lg font-bold text-purple-300 mb-3 border-b border-purple-500/20 pb-2">Idea 1: Correlation Correction</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    <strong>Hypothesis:</strong> If features are highly correlated (r ≈ ±1), they should contribute less. We tried multiplying likelihoods by <code className="text-cyan-300">1 - |r|</code> or <code className="text-cyan-300">exp(-λ|r|)</code>.
                  </p>
                  <div className="flex items-start gap-2 text-red-400 text-sm bg-red-950/20 p-3 rounded-xl border border-red-900/50">
                    <FaExclamationTriangle className="w-4 h-4 mt-1 flex-shrink-0" />
                    <p><strong>Failed:</strong> Correlation only captures <em>linear</em> dependence. For example, if X₂ = X₁², correlation is 0, but strong dependence remains.</p>
                  </div>
                </div>

                {/* Idea 2 */}
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h4 className="text-lg font-bold text-purple-300 mb-3 border-b border-purple-500/20 pb-2">Idea 2: Mutual Information (MI)</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Switched from correlation to Mutual Information <code className="text-cyan-300">I(X;Y)</code> because it captures general statistical dependence, including nonlinear relationships.
                  </p>
                  <div className="flex items-start gap-2 text-blue-400 text-sm bg-blue-950/20 p-3 rounded-xl border border-blue-900/50">
                    <FaLightbulb className="w-4 h-4 mt-1 flex-shrink-0" />
                    <p><strong>Result:</strong> Solid foundation. Information theoretic interpretation gave us a much better metric for feature redundancy.</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* The Roadblocks */}
            <motion.section variants={fadeInUp} className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-red-500/30 rounded-r-md"></div>
              <div className="flex items-center gap-3 mb-6">
                <FaExclamationTriangle className="text-red-400 w-7 h-7" />
                <h3 className="text-2xl font-bold text-gray-100 tracking-tight">The Roadblocks</h3>
              </div>

              <div className="space-y-6">
                <div className="bg-red-950/10 p-6 rounded-2xl border border-red-500/20">
                  <h4 className="text-lg font-bold text-red-300 mb-2">Idea 3 & 4: MI Penalty & Pairwise Joint Gaussian</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    We tried directly modifying probabilities with MI penalties and joint pair likelihoods <code className="text-cyan-300">P(X_i,X_j|Y)</code>.
                  </p>
                  <ul className="list-disc list-inside text-gray-500 text-sm space-y-2">
                    <li>The MI penalty became a class-level constant, acting merely as a constant shift. No performance gain.</li>
                    <li>Adding joint likelihoods mathematically <strong>double-counted the evidence again</strong> because Naive Bayes already multiplied <code className="text-cyan-300">P(X_i|Y)P(X_j|Y)</code>. Digits accuracy degraded to <strong>0.614</strong>.</li>
                  </ul>
                </div>

                <div className="bg-red-950/10 p-6 rounded-2xl border border-red-500/20">
                  <h4 className="text-lg font-bold text-red-300 mb-2">Idea 5: Correlation-Weighted Penalty NB</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Kept NB likelihood, but subtracted weighted penalties for correlated feature contributions.
                  </p>
                  <p className="text-red-400/80 text-sm bg-black/50 p-3 rounded-lg">
                    <strong>Result:</strong> Severe degradation. The penalty over-suppressed evidence. Digits accuracy plummeted to <strong>0.447</strong>.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* The Breakthrough */}
            <motion.section variants={fadeInUp} className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-green-500/50 rounded-r-md shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
              <div className="flex items-center gap-3 mb-6">
                <FaCheckCircle className="text-green-400 w-7 h-7" />
                <h3 className="text-2xl font-bold text-green-100 tracking-tight">Idea 6: The Breakthrough (MIWeightedNB / IC-NB)</h3>
              </div>
              
              <div className="bg-gradient-to-br from-green-900/20 to-cyan-900/20 p-8 rounded-3xl border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-green-300 mb-3">New Philosophy</h4>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Do not modify pairwise probabilities directly. <strong>Instead: weight feature contributions.</strong> Compute feature usefulness vs feature redundancy.
                  </p>
                </div>

                <div className="bg-black/60 p-6 rounded-2xl border border-white/10 font-mono text-center mb-6">
                  <div className="text-cyan-300 text-lg mb-4 border-b border-white/10 pb-4">
                    w<sub className="text-xs">i</sub> = MI(X<sub className="text-xs">i</sub>, Y) / (1 + λ Σ|corr(X<sub className="text-xs">i</sub>, X<sub className="text-xs">j</sub>)|)
                  </div>
                  <div className="text-purple-300 text-lg">
                    Score(Y) = log P(Y) + Σ w<sub className="text-xs">i</sub> log P(X<sub className="text-xs">i</sub> | Y)
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-green-400 font-bold mb-2">Advantages</h5>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Avoids pairwise probability explosion</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Avoids probability inconsistency</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Suppresses redundant features cleanly</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Preserves fundamental NB structure</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h5 className="text-cyan-400 font-bold mb-2">Evolution to Precision Matrix</h5>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      This philosophy eventually evolved into solving linear equations using the <strong>Precision Matrix (Inverse Correlation)</strong>, ensuring that perfectly correlated features split their voting weight exactly (0.5 each). This yielded massive gains across 17 OpenML datasets (up to <strong>+21.73%</strong>).
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Benchmark Results */}
            <motion.section variants={fadeInUp} className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-orange-500/50 rounded-r-md"></div>
              <div className="flex items-center gap-3 mb-6">
                <FaChartLine className="text-orange-400 w-7 h-7" />
                <h3 className="text-2xl font-bold text-gray-100 tracking-tight">Benchmark: 17 OpenML Datasets</h3>
              </div>
              
              <div className="bg-[#050505] rounded-3xl border border-orange-500/20 shadow-[0_0_30px_rgba(249,115,22,0.1)] overflow-hidden">
                <div className="p-6 border-b border-white/10 bg-white/5">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    To prove the superiority of IC-NB, it was benchmarked against <code className="text-cyan-300">sklearn</code>'s <code className="text-cyan-300">GaussianNB</code> across 17 diverse datasets. 
                    Because of the <code className="text-cyan-300">optimize_alpha=True</code> fallback mechanism, <strong>IC-NB strictly dominates GaussianNB</strong>—it triggers massive performance gains when feature correlation is present, and safely mirrors standard GaussianNB when it is not.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-black/50 text-orange-300/80 uppercase tracking-wider border-b border-white/10">
                        <th className="p-4 font-semibold">Dataset</th>
                        <th className="p-4 font-semibold">Samples</th>
                        <th className="p-4 font-semibold">Features</th>
                        <th className="p-4 font-semibold">GaussianNB</th>
                        <th className="p-4 font-semibold">IC-NB</th>
                        <th className="p-4 font-semibold text-green-400">Improvement</th>
                        <th className="p-4 font-semibold">Best Alpha</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-gray-400">
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-bold text-white">pc3</td><td>1563</td><td>37</td><td>0.4696</td><td className="font-bold text-white">0.6869</td><td className="text-green-400 font-bold">+21.73%</td><td>1.00</td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors bg-white/[0.02]">
                        <td className="p-4 font-bold text-white">vehicle</td><td>846</td><td>18</td><td>0.4353</td><td className="font-bold text-white">0.5294</td><td className="text-green-400 font-bold">+9.41%</td><td>1.00</td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-bold text-white">qsar-biodeg</td><td>1055</td><td>41</td><td>0.6682</td><td className="font-bold text-white">0.7299</td><td className="text-green-400 font-bold">+6.17%</td><td>0.01</td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors bg-white/[0.02]">
                        <td className="p-4 font-bold text-white">ilpd</td><td>583</td><td>9</td><td>0.5299</td><td className="font-bold text-white">0.5641</td><td className="text-green-400 font-bold">+3.42%</td><td>0.01</td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-bold text-white">phoneme</td><td>5404</td><td>5</td><td>0.7447</td><td className="font-bold text-white">0.7715</td><td className="text-green-400 font-bold">+2.68%</td><td>0.01</td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors bg-white/[0.02]">
                        <td className="p-4 font-bold text-white">pc1</td><td>1109</td><td>21</td><td>0.8784</td><td className="font-bold text-white">0.8829</td><td className="text-green-400 font-bold">+0.45%</td><td>0.10</td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors text-gray-500">
                        <td className="p-4">diabetes</td><td>768</td><td>8</td><td>0.7078</td><td>0.7078</td><td>-</td><td>inf (GNB Fallback)</td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors text-gray-500 bg-white/[0.02]">
                        <td className="p-4">spambase</td><td>4601</td><td>57</td><td>0.8328</td><td>0.8328</td><td>-</td><td>inf (GNB Fallback)</td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors text-gray-500">
                        <td className="p-4">blood-transfusion</td><td>748</td><td>4</td><td>0.7600</td><td>0.7600</td><td>-</td><td>inf (GNB Fallback)</td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors text-gray-500 bg-white/[0.02]">
                        <td className="p-4">wdbc</td><td>569</td><td>30</td><td>0.9211</td><td>0.9211</td><td>-</td><td>inf (GNB Fallback)</td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors text-gray-500">
                        <td className="p-4">kc2</td><td>522</td><td>21</td><td>0.8190</td><td>0.8190</td><td>-</td><td>inf (GNB Fallback)</td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors text-gray-500 bg-white/[0.02]">
                        <td className="p-4">kc1</td><td>2109</td><td>21</td><td>0.8318</td><td>0.8318</td><td>-</td><td>inf (GNB Fallback)</td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors text-gray-500">
                        <td className="p-4">pc4</td><td>1458</td><td>37</td><td>0.8630</td><td>0.8630</td><td>-</td><td>0.01</td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors text-gray-500 bg-white/[0.02]">
                        <td className="p-4">jm1</td><td>10880</td><td>21</td><td>0.7978</td><td>0.7978</td><td>-</td><td>inf (GNB Fallback)</td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors text-gray-500">
                        <td className="p-4">madelon</td><td>2600</td><td>500</td><td>0.6154</td><td>0.6154</td><td>-</td><td>inf (GNB Fallback)</td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors text-gray-500 bg-white/[0.02]">
                        <td className="p-4">credit-g</td><td>1000</td><td>7</td><td>0.7000</td><td>0.7000</td><td>-</td><td>inf (GNB Fallback)</td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors text-gray-500">
                        <td className="p-4">sick</td><td>2751</td><td>6</td><td>0.9474</td><td>0.9474</td><td>-</td><td>inf (GNB Fallback)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.section>

            {/* Future Directions */}
            <motion.section variants={fadeInUp} className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-blue-500/30 rounded-r-md"></div>
              <div className="flex items-center gap-3 mb-6">
                <FaRocket className="text-blue-400 w-7 h-7" />
                <h3 className="text-2xl font-bold text-gray-100 tracking-tight">Future Research Directions</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "Conditional MI", desc: "Replace MI(Xi,Xj) with MI(Xi,Xj | Y) to better align with NB's conditional independence assumption." },
                  { title: "Adaptive Weights", desc: "Learn class-specific weights wi(c) since different classes have different dependency patterns." },
                  { title: "Sparse Dependency Graph", desc: "Use top-k MI edges to construct a dependency graph, moving toward Tree-Augmented Naive Bayes (TAN)." },
                  { title: "Automate Hyperparams", desc: "Learn the λ penalty automatically via GridSearchCV or Bayesian optimization." },
                  { title: "Nonlinear Redundancy", desc: "Upgrade Σ|corr| to Σ MI(Xi,Xj) to capture nonlinear redundancies." },
                  { title: "Hybrid Graph-Weighted", desc: "Combine MI weighting, sparse dependency graphs, and Gaussian likelihoods." },
                  { title: "Score Normalization", desc: "Investigate probability calibration to fix modified log-scores mathematically." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-blue-500/30 hover:bg-white/10 transition-colors">
                    <h4 className="text-blue-300 font-bold mb-2 text-sm">{idx + 1}. {item.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Collaborate & Download */}
            <motion.section variants={fadeInUp} className="border-t border-white/10 pt-10">
              <div className="mb-10 bg-black/40 p-6 rounded-3xl border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-white/10 pb-2">API Parameters</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="text-cyan-400 font-mono text-sm mb-1">optimize_alpha <span className="text-gray-500">(bool)</span></div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Defaults to <code className="text-orange-400">True</code>. Automatically performs internal cross-validation to find the optimal L2 ridge penalty. This guarantees the model never performs worse than standard GaussianNB by falling back to it if dependency weighting doesn't help.
                    </p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="text-purple-400 font-mono text-sm mb-1">metric <span className="text-gray-500">(str)</span></div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Accepts <code className="text-green-300">'pearson'</code> or <code className="text-green-300">'spearman'</code>. Use pearson for standard linear correlations, and spearman for monotonic or rank-based dependencies.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-start">
                
                {/* Download */}
                <div className="bg-[#050505] p-6 rounded-3xl border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                  <div className="flex items-center gap-3 mb-4">
                    <FaDownload className="text-cyan-400 w-6 h-6" />
                    <h3 className="text-xl font-bold text-gray-200">Test the Current Build</h3>
                  </div>
                  <div className="font-mono text-sm text-gray-300">
                    <p className="text-gray-500 mb-2"># Install via pip</p>
                    <a 
                      href="https://github.com/SriHarsha25112006/Naive-Bayes-Improvement" 
                      target="_blank" 
                      rel="noreferrer"
                      className="block bg-black/50 p-4 rounded-xl border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all cursor-pointer break-all"
                    >
                      pip install git+https://github.com/SriHarsha25112006/Naive-Bayes-Improvement.git
                    </a>
                  </div>
                </div>

                {/* Collaborate */}
                <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6 rounded-3xl border border-purple-500/30">
                  <div className="flex items-center gap-3 mb-4">
                    <FaEnvelope className="text-purple-400 w-6 h-6" />
                    <h3 className="text-xl font-bold text-gray-200">Help Solve the Challenge</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    The current challenge is to mathematically refine this dependency-aware Naive Bayes so that it consistently <strong>beats sklearn GaussianNB on the Digits dataset (0.7417 baseline)</strong>.
                  </p>
                  <a 
                    href="mailto:sriharshasripada25@gmail.com"
                    className="inline-flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-xl transition-colors cursor-pointer"
                  >
                    Email Me Your Ideas
                  </a>
                </div>

              </div>
            </motion.section>

          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
