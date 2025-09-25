import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import { RevealOnScroll } from '../components/RevealOnScroll';

const ResourcesPage: React.FC = () => {
  const resources = [
    {
      id: 1,
      title: "AI Citation/Attribution PDF",
      description: "Guidelines for properly citing AI-generated content",
      format: "PDF"
    },
    {
      id: 2,
      title: "Responsible AI Templates",
      description: "Templates for ethical AI use in writing",
      format: "DOCX"
    },
    {
      id: 3,
      title: "Instructor Notes",
      description: "[TK] Instructor notes and guidance",
      format: "PDF"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            [TK] Resources Title
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Downloadable resources and materials for classroom use
          </p>
        </motion.div>

        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <div key={resource.id} className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-800">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-orange-900 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-orange-400" />
                  </div>
                  <span className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-full">
                    {resource.format}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{resource.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{resource.description}</p>
                <button className="flex items-center text-blue-600 dark:text-orange-400 hover:text-blue-700 dark:hover:text-orange-300 font-medium">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
          ))}
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default ResourcesPage;