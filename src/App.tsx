import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import LabTokenization from './pages/LabTokenization';
import CelebrationPage from './pages/CelebrationPage';
import QuizPage from './pages/QuizPage';
import QuizFinal from './pages/QuizFinal';
import ResourcesPage from './pages/ResourcesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { RequireAllRequired, RequireQuizUnlocked, getRedirectPath } from './lib/guards';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/course" element={<Navigate to="/course/introduction" replace />} />
            <Route path="/course/:sectionId" element={<CoursePage />} />
            <Route path="/lab/tokenization" element={<LabTokenization />} />
            <Route path="/celebration" element={<CelebrationPage />} />
            <Route 
              path="/quiz" 
              element={
                <RequireQuizUnlocked redirectTo="/course/conclusion">
                  <QuizPage />
                </RequireQuizUnlocked>
              } 
            />
            <Route path="/module/final-quiz" element={<QuizFinal />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;