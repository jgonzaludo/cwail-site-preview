import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { RevealOnScroll } from '../components/RevealOnScroll';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cwail-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-cwail-ink mb-4">
            Contact
          </h1>
        </motion.div>

        <RevealOnScroll>
          <div className="cwail-surface rounded-xl shadow-cwail dark:shadow-cwail-dark p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-display font-semibold text-cwail-ink mb-6">
              Joseph Forte
            </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-cwail-accent2 mt-1 mr-3" aria-hidden />
                  <div>
                    <p className="font-medium text-cwail-ink">Contact</p>
                    <a
                      href="mailto:jforte8@jhu.edu"
                      className="text-cwail-muted hover:text-cwail-accent2 transition-colors"
                    >
                      jforte8@jhu.edu
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-cwail-accent2 mt-1 mr-3" aria-hidden />
                  <div>
                    <p className="font-medium text-cwail-ink">Location</p>
                    <p className="text-cwail-muted">
                      Wyman W300Q
                      <br />
                      3400 North Charles Street
                      <br />
                      Baltimore, MD 21218
                    </p>
                  </div>
                </div>
              </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default ContactPage;