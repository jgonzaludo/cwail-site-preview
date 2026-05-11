import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertTriangle, BookOpen, Users, FileText, Mail, Brain, Shield, Pencil, Zap, GraduationCap, Lightbulb, UserX } from 'lucide-react';
import { motion } from 'framer-motion';
import GradientBackground from '../components/ui/gradient-background';
import { RevealOnScroll } from '../components/RevealOnScroll';
import ScrollIndicator from '../components/ScrollIndicator';
import { getStoredUserName, persistUserNameForModule, clearLearnerSiteState } from '../lib/learnerContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const storedName = getStoredUserName();
  const hasStoredName = Boolean(storedName);
  const [editingName, setEditingName] = useState(false);
  const [draftName, setDraftName] = useState(() => getStoredUserName());
  const [nameError, setNameError] = useState('');
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  const handleBegin = () => {
    if (hasStoredName && !editingName) {
      navigate('/course/introduction');
      return;
    }
    const n = draftName.trim();
    if (!n) {
      setNameError('Please enter your name so we can personalize your certificate and summary.');
      return;
    }
    setNameError('');
    persistUserNameForModule(n);
    setEditingName(false);
    setShowRemoveConfirm(false);
    navigate('/course/introduction');
  };

  const handleRemoveUser = () => {
    setShowRemoveConfirm(true);
  };

  const handleConfirmRemoveUser = () => {
    clearLearnerSiteState();
    setDraftName('');
    setEditingName(false);
    setNameError('');
    setShowRemoveConfirm(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  const handleStartEdit = () => {
    setEditingName(true);
    setDraftName(getStoredUserName());
    setNameError('');
    setShowRemoveConfirm(false);
  };

  const handleSaveEdit = () => {
    const n = draftName.trim();
    if (!n) {
      setNameError('Name cannot be empty.');
      return;
    }
    persistUserNameForModule(n);
    setEditingName(false);
    setNameError('');
    setShowRemoveConfirm(false);
  };

  const showNameInput = !hasStoredName || editingName;

  return (
    <div className="min-h-screen">
      <ScrollIndicator />
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[60vh] lg:min-h-[72vh]">
        <GradientBackground
          className=""
          gradients={[
            'linear-gradient(125deg, #0d4f4a 0%, #134e4a 42%, #1c1917 100%)',
            'linear-gradient(140deg, #9a3412 0%, #0f766e 55%, #134e4a 100%)',
            'linear-gradient(115deg, #164e63 0%, #c2410c 48%, #0f172a 100%)',
          ]}
          animationDuration={18}
          animationDelay={0}
          overlay={true}
          overlayOpacity={0.12}
        >
          <div className="relative z-20 text-[#faf8f3] max-w-7xl mx-auto text-center px-4 py-24 lg:py-32">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="text-sm md:text-base uppercase tracking-[0.2em] text-[#a7f3d0]/90 font-medium"
            >
              Companion for Writing with AI Literacy
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="mt-5 font-display text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-4xl mx-auto"
            >
              AI is here. We all use it.
              <br />
              <span className="inline-block whitespace-nowrap">Let&apos;s use it well.</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="mt-10 max-w-md mx-auto w-full text-left"
            >
              <p className="block text-sm font-medium text-[#a7f3d0]/95">Your name</p>
              <p className="mt-1 text-xs text-[#a7f3d0]/75">
                We&apos;ll use this on your completion summary and certificate.
              </p>

              {!showNameInput ? (
                <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-white/25 bg-white/10 px-4 py-3">
                  <span className="min-w-0 flex-1 text-base font-medium text-[#faf8f3] truncate">{storedName}</span>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={handleStartEdit}
                      className="inline-flex items-center justify-center rounded-md border border-white/30 p-2 text-[#faf8f3] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#fb923c]"
                      aria-label="Edit name"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveUser}
                      className="inline-flex items-center gap-1.5 rounded-md border border-white/30 px-3 py-2 text-xs font-medium text-[#fecaca] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#fb923c]"
                      aria-expanded={showRemoveConfirm}
                    >
                      <UserX className="h-3.5 w-3.5" aria-hidden />
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <label htmlFor="home-learner-name" className="sr-only">
                    Your name
                  </label>
                  <input
                    id="home-learner-name"
                    type="text"
                    autoComplete="name"
                    value={draftName}
                    onChange={(e) => {
                      setDraftName(e.target.value);
                      if (nameError) setNameError('');
                    }}
                    placeholder="e.g. Alex Chen"
                    className="mt-3 w-full rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-[#faf8f3] placeholder:text-[#faf8f3]/45 focus:outline-none focus:ring-2 focus:ring-[#fb923c] focus:border-transparent"
                  />
                  {hasStoredName ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={handleSaveEdit}
                        className="rounded-md border border-white/35 bg-white/10 px-4 py-2 text-sm font-medium text-[#faf8f3] hover:bg-white/15"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingName(false);
                          setDraftName(getStoredUserName());
                          setNameError('');
                        }}
                        className="rounded-md px-4 py-2 text-sm font-medium text-[#a7f3d0]/90 hover:text-[#faf8f3]"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : null}
                </>
              )}
              {showRemoveConfirm ? (
                <div className="mt-4 rounded-xl border border-amber-200/35 bg-[#1c1917]/45 p-4 shadow-lg backdrop-blur">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" aria-hidden />
                    <div>
                      <p className="text-sm font-semibold text-[#faf8f3]">Clear this learner session?</p>
                      <p className="mt-1 text-xs leading-relaxed text-[#faf8f3]/75">
                        This removes the saved name, course progress, responses, quiz answers, and certificate data
                        from this browser.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleConfirmRemoveUser}
                      className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-200"
                    >
                      Clear everything
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowRemoveConfirm(false)}
                      className="rounded-md border border-white/30 px-4 py-2 text-sm font-medium text-[#faf8f3] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#fb923c]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : null}
              {nameError ? <p className="mt-2 text-sm text-amber-200">{nameError}</p> : null}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="mt-8"
            >
              <button
                type="button"
                onClick={handleBegin}
                className="inline-block font-medium bg-[#fb923c] text-[#1c1917] px-8 py-3.5 rounded-lg border border-[#fdba74] hover:bg-[#fdba74] transition-all duration-300 shadow-lg shadow-black/20"
              >
                Begin the 15-Minute Module →
              </button>
            </motion.div>
          </div>
        </GradientBackground>
      </section>

      {/* Directory Overview */}
      <section className="py-20 border-t border-cwail-border bg-cwail-elevated/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/course/introduction" className="group">
              <div className="cwail-surface rounded-xl shadow-cwail dark:shadow-cwail-dark hover:shadow-lg transition-all duration-300 p-8 h-full transform hover:-translate-y-1 hover:border-cwail-accent2/35">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-6 bg-cwail-accent2/15 text-cwail-accent2 border border-cwail-accent2/20 group-hover:bg-cwail-accent2/25 transition-colors">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-display font-semibold text-cwail-ink mb-3">Course Module</h3>
                <p className="text-cwail-muted leading-relaxed">
                  Complete the 15-minute AI literacy module
                </p>
              </div>
            </Link>

            <Link to="/resources" className="group">
              <div className="cwail-surface rounded-xl shadow-cwail dark:shadow-cwail-dark hover:shadow-lg transition-all duration-300 p-8 h-full transform hover:-translate-y-1 hover:border-cwail-accent/35">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-6 bg-cwail-accent/12 text-cwail-accent border border-cwail-accent/25 group-hover:bg-cwail-accent/20 transition-colors">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-display font-semibold text-cwail-ink mb-3">Resources</h3>
                <p className="text-cwail-muted leading-relaxed">
                  Access classroom resources and materials
                </p>
              </div>
            </Link>

            <Link to="/about" className="group">
              <div className="cwail-surface rounded-xl shadow-cwail dark:shadow-cwail-dark hover:shadow-lg transition-all duration-300 p-8 h-full transform hover:-translate-y-1 hover:border-cwail-accent2/35">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-6 bg-cwail-accent2/10 text-cwail-accent2 border border-cwail-accent2/15 group-hover:bg-cwail-accent2/18 transition-colors">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-display font-semibold text-cwail-ink mb-3">About</h3>
                <p className="text-cwail-muted leading-relaxed">
                  Learn about the CWAIL project
                </p>
              </div>
            </Link>

            <Link to="/contact" className="group">
              <div className="cwail-surface rounded-xl shadow-cwail dark:shadow-cwail-dark hover:shadow-lg transition-all duration-300 p-8 h-full transform hover:-translate-y-1 hover:border-cwail-accent/35">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-6 bg-cwail-accent/10 text-cwail-accent border border-cwail-accent/20 group-hover:bg-cwail-accent/18 transition-colors">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-display font-semibold text-cwail-ink mb-3">Contact</h3>
                <p className="text-cwail-muted leading-relaxed">
                  Get in touch with our team
                </p>
              </div>
            </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 border-t border-cwail-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <Brain className="w-8 h-8 text-cwail-accent2 flex-shrink-0" />
              <div>
                <h3 className="font-display font-semibold text-cwail-ink mb-2">
                  AI use hurts learning outcomes
                </h3>
                <p className="text-cwail-muted">
                  Evidence shows that uncritical AI use hurts learning outcomes.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <Shield className="w-8 h-8 text-cwail-accent flex-shrink-0" />
              <div>
                <h3 className="font-display font-semibold text-cwail-ink mb-2">
                  Teachers are AI-proofing classrooms
                </h3>
                <p className="text-cwail-muted">
                  Teachers are redesigning coursework to AI-proof their classrooms.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <Pencil className="w-8 h-8 text-cwail-accent2 flex-shrink-0" />
              <div>
                <h3 className="font-display font-semibold text-cwail-ink mb-2">
                  Writing is especially at risk
                </h3>
                <p className="text-cwail-muted">
                  Learning how to write well is more important than ever.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <Zap className="w-8 h-8 text-cwail-accent flex-shrink-0" />
              <div>
                <h3 className="font-display font-semibold text-cwail-ink mb-2">
                  AI can still be used well
                </h3>
                <p className="text-cwail-muted">
                  This site will show how.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <GraduationCap className="w-8 h-8 text-cwail-accent2 flex-shrink-0" />
              <div>
                <h3 className="font-display font-semibold text-cwail-ink mb-2">
                  Mentally agile and confident
                </h3>
                <p className="text-cwail-muted">
                  Education should help students become mentally agile and intellectually confident.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <Lightbulb className="w-8 h-8 text-cwail-accent flex-shrink-0" />
              <div>
                <h3 className="font-display font-semibold text-cwail-ink mb-2">
                  True learning is possible
                </h3>
                <p className="text-cwail-muted">
                  But only if students are <strong className="text-cwail-ink">AI literate</strong>.
                </p>
              </div>
            </motion.div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
};

export default HomePage;