import React, { useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

// Import language files
import enCookies from '../data/text/en/cookies.json';
import zhCookies from '../data/text/zh/cookies.json';
import jaCookies from '../data/text/ja/cookies.json';
import esCookies from '../data/text/es/cookies.json';

const languageMap = {
  en: enCookies,
  zh: zhCookies,
  ja: jaCookies,
  es: esCookies,
};

interface CookiesContent {
  lastUpdated?: string;
  sections?: Array<{
    title?: string;
    content?: string;
  }>;
}

const Cookies: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const defaultContent = languageMap.en as CookiesContent;

  const pageContent = useMemo(() => {
    return languageMap[currentLanguage?.code as keyof typeof languageMap] || defaultContent;
  }, [currentLanguage?.code]);

  // Primary color variable
  const primaryColor = '#F94E4F';

  return (
    <div className="min-h-screen overflow-x-hidden bg-white py-12 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Animated Cookie */}
        <div className="flex justify-center mb-12">
          <motion.svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            initial={{ rotate: 0, scale: 1 }}
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="50" cy="50" r="40" fill="#D2691E" />
            <circle cx="40" cy="40" r="5" fill="#8B4513" />
            <circle cx="60" cy="40" r="5" fill="#8B4513" />
            <circle cx="50" cy="60" r="5" fill="#8B4513" />
          </motion.svg>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Cookie Policy
          </h1>
          <p className="text-lg text-gray-600" style={{ color: primaryColor }}>
            {pageContent.lastUpdated}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-16">
          {pageContent.sections?.map((section, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-sm border border-gray-100"
            >
              <h2 
                className="text-2xl md:text-3xl font-bold mb-6 text-black"
                style={{ borderBottom: `3px solid ${primaryColor}`, display: 'inline-block' }}
              >
                {section.title}
              </h2>
              <div className="prose max-w-none">
                {section.content?.split('\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-gray-700 mb-4 text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

   
      </div>
    </div>
  );
};

export default Cookies;