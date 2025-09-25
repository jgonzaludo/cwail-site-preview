import React from 'react';
import { motion } from 'framer-motion';
import ScrollIndicator from '../components/ScrollIndicator';
import { RevealOnScroll } from '../components/RevealOnScroll';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <ScrollIndicator />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            About
          </h1>
        </motion.div>

        <div className="space-y-12">
          <RevealOnScroll>
            <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Mission & Vision</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">This project aims to provide accessible, engaging, and thoughtfully designed educational content that helps students critically explore the ethics of artificial intelligence. Our mission is to make AI ethics education approachable for STEM students through interactive, visually compelling modules that bridge theory and real-world application. We envision a learning experience that empowers students not only to understand core ethical concepts but also to reflect on how their future work may impact society.</p>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">About This Project</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Supported by a grant from the Johns Hopkins Center for Teaching Excellence and Innovation (CTEI), this project is an experimental digital learning module currently in development through the Center for Leadership Education. It blends design, pedagogy, and technology to create a short, certificate-based course on AI ethics. The interactive format is meant to support flexible learning while encouraging students to think deeply and critically. The module is still evolving, and ongoing collaboration between developers and instructors ensures it remains aligned with student needs and modern design principles.</p>
              
              <div className="mt-6 flex items-center gap-8 flex-wrap">
                {/* CTEI logo */}
                <div className="flex items-center">
                  <img
                    src="/images/ctei-light.png"
                    alt="CTEI logo"
                    className="h-12 w-auto object-contain dark:hidden opacity-80 hover:opacity-100 transition"
                    loading="lazy"
                  />
                  <img
                    src="/images/ctei-dark.png"
                    alt=""
                    className="h-12 w-auto object-contain hidden dark:block opacity-80 hover:opacity-100 transition"
                    loading="lazy"
                  />
                </div>

                {/* JHU logo */}
                <div className="flex items-center">
                  <img
                    src="/images/jhu-light.png"
                    alt="JHU logo"
                    className="h-12 w-auto object-contain dark:hidden opacity-80 hover:opacity-100 transition"
                    loading="lazy"
                  />
                  <img
                    src="/images/jhu-dark.png"
                    alt=""
                    className="h-12 w-auto object-contain hidden dark:block opacity-80 hover:opacity-100 transition"
                    loading="lazy"
                  />
                </div>
              </div>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Team</h2>
            
            {/* Forte */}
            <div className="flex flex-col md:flex-row gap-6 items-start mb-10 relative">
              <img
                src="/images/forte.png"
                alt="Portrait of Joseph Forte"
                className="w-24 h-24 rounded-full object-cover shadow-md"
                loading="lazy"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Joseph Forte</h3>
                    <p className="text-gray-700 dark:text-gray-200 font-medium">Senior Lecturer</p>
                    <p className="text-gray-600 dark:text-gray-300">Center for Leadership Education</p>
                  </div>
                  {/* JHU logo */}
                  <div className="flex items-center ml-4">
                    <img
                      src="/images/jhu-light.png"
                      alt="JHU logo"
                      className="h-8 w-auto object-contain dark:hidden opacity-80 hover:opacity-100 transition"
                      loading="lazy"
                    />
                    <img
                      src="/images/jhu-dark.png"
                      alt=""
                      className="h-8 w-auto object-contain hidden dark:block opacity-80 hover:opacity-100 transition"
                      loading="lazy"
                    />
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Contact: <a href="mailto:jforte8@jhu.edu" className="text-blue-600 dark:text-orange-400 underline">jforte8@jhu.edu</a></p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Location: Wyman W300Q</p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">A former public health student, Joseph Forte now specializes in teaching writing topics to students in STEM fields. His current scholarly focuses include writing assessment, professional/technical writing, digital writing, pedagogy, and civic education. As a graduate student, Forte brought his teaching and research skills to bear in administrative roles like content coordinator for the Purdue Online Writing Lab (OWL) and assistant director of Purdue's first-year writing program.<br/><br/>Following his BS (Santa Clara University, 2012) and his MA (Purdue University, 2017), Forte received his PhD in Rhetoric and Composition alongside a certificate in Quantitative Research, Assessment, and Evaluation in Education (Purdue University, 2021).</p>
              </div>
            </div>

            {/* Gonzaludo */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img
                src="/images/gonzaludo.png"
                alt="Portrait of Joseph Gonzaludo"
                className="w-24 h-24 rounded-full object-cover shadow-md"
                loading="lazy"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Joseph Gonzaludo</h3>
                    <p className="text-gray-700 dark:text-gray-200 font-medium">Software Engineering Intern</p>
                    <p className="text-gray-600 dark:text-gray-300">NASA | Johns Hopkins University</p>
                  </div>
                  {/* NASA logo */}
                  <div className="flex items-center ml-4">
                    <img
                      src="/images/nasa-light.png"
                      alt="NASA logo"
                      className="h-8 w-auto object-contain dark:hidden opacity-80 hover:opacity-100 transition"
                      loading="lazy"
                    />
                    <img
                      src="/images/nasa-dark.png"
                      alt=""
                      className="h-8 w-auto object-contain hidden dark:block opacity-80 hover:opacity-100 transition"
                      loading="lazy"
                    />
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Contact: <a href="mailto:jgonz102@jh.edu" className="text-blue-600 dark:text-orange-400 underline">jgonz102@jh.edu</a></p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Location: Homewood Campus</p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Joseph Gonzaludo is a rising junior at Johns Hopkins University studying Computer Science, with minors in Entrepreneurship & Management and Writing Seminars. He currently works as a Software Engineering Intern at NASA, where he contributes to mission proposal review systems. He has participated in multiple case competitions, including with Alibaba on AI applications in e-commerce and with AlphaSights on AI implementation strategies.<br/><br/>At Hopkins, Gonzaludo has gained extensive experience in software and web development through both academic and professional settings. His interests lie at the intersection of AI ethics, front-end development, aerospace, and product design. For this project, he is responsible for designing, developing, and maintaining the interactive AI ethics learning modules.</p>
              </div>
            </div>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">About CTEI</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">The Center for Teaching Excellence and Innovation (CTEI) at Johns Hopkins University advances teaching excellence and innovation in support of the university's mission to educate students and cultivate their capacity for lifelong learning. Located in the Greenhouse on the Homewood campus, CTEI offers a range of programs and services for faculty, graduate students, and postdoctoral fellows. These include training and consultations on teaching resources, instructional technologies, and educational innovations. CTEI staff work closely with instructors on course enhancements, administer the Instructional Enhancement Grant Program, and collaborate on grant-supported teaching projects. The center also manages the university's Teaching Academy. CTEI partners with both internal university initiatives and external foundations such as the National Science Foundation, the Mellon Foundation, Hewlett Packard, and NVIDIA, among others, to support its mission.</p>
              <p className="text-gray-600 dark:text-gray-300">Source: <a href="https://ctei.jhu.edu/about/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-orange-400 underline">https://ctei.jhu.edu/about/</a></p>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">About CLE</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">The Center for Leadership Education (CLE) at Johns Hopkins University focuses on developing influential and imaginative leaders by preparing students to translate innovations from the classroom and laboratory into real-world applications, and to successfully transition from academic to professional life. CLE promotes a culture of innovation and collaboration across divisions including the Whiting School of Engineering, Krieger School of Arts & Sciences, Bloomberg School of Public Health, School of Medicine, and the Peabody Institute. The center offers students opportunities to develop skills in problem discovery, problem solving, quantitative reasoning, effective communication, systems thinking, and teamwork, all while fostering diversity of thought and interdisciplinary learning.</p>
              <p className="text-gray-600 dark:text-gray-300">Source: <a href="https://engineering.jhu.edu/cle/about/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-orange-400 underline">https://engineering.jhu.edu/cle/about/</a></p>
            </section>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;