import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, FileText, Mail, Brain, Shield, Pencil, Zap, GraduationCap, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import GradientBackground from '../components/ui/gradient-background';
import { RevealOnScroll } from '../components/RevealOnScroll';
import ScrollIndicator from '../components/ScrollIndicator';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ScrollIndicator />
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[60vh] lg:min-h-[72vh]">
        <GradientBackground
          className=""
          gradients={[
            "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
            "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            "linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)"
          ]}
          animationDuration={15}
          animationDelay={0}
          overlay={true}
          overlayOpacity={0.06}
        >
          <div className="relative z-20 text-white max-w-7xl mx-auto text-center px-4 py-24 lg:py-32">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-base uppercase opacity-80"
            >
              Companion for Writing with AI Literacy
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight whitespace-nowrap"
            >
              AI is here. We all use it. Let's use it well.
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8"
            >
              <Link 
                to="/course/introduction" 
                className="inline-block bg-white/20 dark:bg-black/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-white/30 dark:border-white/20 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 shadow-lg"
              >
                Begin the 15-Minute Module →
              </Link>
            </motion.div>
          </div>
        </GradientBackground>
      </section>

      {/* Directory Overview */}
      <section className="py-20 bg-white dark:bg-[#101827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/course/introduction" className="group">
              <div className="bg-orange-100 dark:bg-orange-900/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-full border border-orange-200 dark:border-orange-800 hover:border-orange-300 dark:hover:border-orange-700 transform hover:-translate-y-1">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-200 dark:bg-orange-800 rounded-lg mb-6 group-hover:bg-orange-300 dark:group-hover:bg-orange-700 transition-colors">
                  <BookOpen className="h-6 w-6 text-orange-700 dark:text-orange-300" />
                </div>
                <h3 className="text-xl font-semibold text-orange-900 dark:text-orange-100 mb-3">Course Module</h3>
                <p className="text-orange-700 dark:text-orange-200 leading-relaxed">
                  Complete the 15-minute AI literacy module
                </p>
              </div>
            </Link>
            
            <Link to="/resources" className="group">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-full border border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700 transform hover:-translate-y-1">
                <div className="flex items-center justify-center w-12 h-12 bg-green-200 dark:bg-green-800 rounded-lg mb-6 group-hover:bg-green-300 dark:group-hover:bg-green-700 transition-colors">
                  <FileText className="h-6 w-6 text-green-700 dark:text-green-300" />
                </div>
                <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">Resources</h3>
                <p className="text-green-700 dark:text-green-200 leading-relaxed">
                  Access classroom resources and materials
                </p>
              </div>
            </Link>
            
            <Link to="/about" className="group">
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-full border border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700 transform hover:-translate-y-1">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-200 dark:bg-purple-800 rounded-lg mb-6 group-hover:bg-purple-300 dark:group-hover:bg-purple-700 transition-colors">
                  <Users className="h-6 w-6 text-purple-700 dark:text-purple-300" />
                </div>
                <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-3">About</h3>
                <p className="text-purple-700 dark:text-purple-200 leading-relaxed">
                  Learn about the CWAIL project
                </p>
              </div>
            </Link>
            
            <Link to="/contact" className="group">
              <div className="bg-cyan-100 dark:bg-cyan-900/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-full border border-cyan-200 dark:border-cyan-800 hover:border-cyan-300 dark:hover:border-cyan-700 transform hover:-translate-y-1">
                <div className="flex items-center justify-center w-12 h-12 bg-cyan-200 dark:bg-cyan-800 rounded-lg mb-6 group-hover:bg-cyan-300 dark:group-hover:bg-cyan-700 transition-colors">
                  <Mail className="h-6 w-6 text-cyan-700 dark:text-cyan-300" />
                </div>
                <h3 className="text-xl font-semibold text-cyan-900 dark:text-cyan-100 mb-3">Contact</h3>
                <p className="text-cyan-700 dark:text-cyan-200 leading-relaxed">
                  Get in touch with our team
                </p>
              </div>
            </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 bg-white dark:bg-gray-900">
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
              <Brain className="w-8 h-8 text-blue-600 dark:text-orange-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  AI use hurts learning outcomes
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
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
              <Shield className="w-8 h-8 text-blue-600 dark:text-orange-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Teachers are AI-proofing classrooms
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
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
              <Pencil className="w-8 h-8 text-blue-600 dark:text-orange-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Writing is especially at risk
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
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
              <Zap className="w-8 h-8 text-blue-600 dark:text-orange-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  AI can still be used well
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
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
              <GraduationCap className="w-8 h-8 text-blue-600 dark:text-orange-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Mentally agile and confident
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
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
              <Lightbulb className="w-8 h-8 text-blue-600 dark:text-orange-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  True learning is possible
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  But only if students are <strong>AI literate</strong>.
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