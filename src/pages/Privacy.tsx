import React, { useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

// Import language files
import enPrivacy from '../data/text/en/privacy.json';
import zhPrivacy from '../data/text/zh/privacy.json';
import jaPrivacy from '../data/text/ja/privacy.json';
import esPrivacy from '../data/text/es/privacy.json';

const languageMap = {
  en: enPrivacy,
  zh: zhPrivacy,
  ja: jaPrivacy,
  es: esPrivacy,
};

interface TermsContent {
  lastUpdated?: string;
  sections?: Array<{
    title?: string;
    content?: string;
  }>;
}

const Privacy: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const defaultContent = languageMap.en as TermsContent;

  const pageContent = useMemo(() => {
    return languageMap[currentLanguage?.code as keyof typeof languageMap] || defaultContent;
  }, [currentLanguage?.code]);

  // Primary color variable
  const primaryColor = '#F94E4F';

  return (
    <div className="min-h-screen overflow-x-hidden py-12 px-6 lg:px-8"
          style={{backgroundColor : "#E4E5E8"}}
    >
      <div className="max-w-9xl mx-auto text-left " style={{backgroundColor : "white"}}>
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Privacy Policy
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

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            If you have any questions about these terms, please contact us at{' '}
            <a 
              href="mailto:privacy@stib-mivb.brussels" 
              className="font-medium hover:underline"
              style={{ color: primaryColor }}
            >
              privacy@stib-mivb.brussels
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;