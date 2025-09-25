import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { RevealOnScroll } from '../components/RevealOnScroll';

const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            [TK] Contact Title
          </h1>
        </motion.div>

        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Send us a message</h2>
              
              {formSubmitted && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-cyan-900 border border-green-200 dark:border-cyan-700 rounded-lg flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-cyan-300 mr-2" />
                  <span className="text-green-800 dark:text-cyan-200">Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    placeholder="Enter your message..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-semibold px-6 py-4 rounded-lg transition-colors"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-orange-400 mt-1 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Email</p>
                    <p className="text-gray-600 dark:text-gray-300">[TK] Email placeholder</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-600 dark:text-orange-400 mt-1 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Address</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      [TK] Wyman Park Building address placeholder
                    </p>
                  </div>
                </div>
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