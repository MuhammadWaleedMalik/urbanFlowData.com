import React, { useMemo, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

// Import language files
import enFaqs from '../data/text/en/faqs.json';
import zhFaqs from '../data/text/zh/faqs.json';
import jaFaqs from '../data/text/ja/faqs.json';
import esFaqs from '../data/text/es/faqs.json';
  
const languageMap = {
  en: enFaqs,
  zh: zhFaqs,
  ja: jaFaqs,
  es: esFaqs,
};

interface FaqItem {
  question?: string;
  answer?: string;
}

interface FaqSection {
  title?: string;
  faqs?: FaqItem[];
}

interface FaqContent {
  lastUpdated?: string;
  sections?: FaqSection[];
}

const Faqs: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const defaultContent = languageMap.en as FaqContent;

  const pageContent = useMemo(() => {
    return languageMap[currentLanguage?.code as keyof typeof languageMap] || defaultContent;
  }, [currentLanguage?.code]);

  // State to track which FAQ is expanded
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Primary color variable
  const primaryColor = '#F94E4F';

  return (
    <div className="min-h-screen overflow-x-hidden bg-white py-12 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600" style={{ color: primaryColor }}>
            {pageContent.lastUpdated}
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-16">
          {pageContent.sections?.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-sm border border-gray-100"
            >
              <h2
                className="text-2xl md:text-3xl font-bold mb-6 text-black"
                style={{ borderBottom: `3px solid ${primaryColor}`, display: 'inline-block' }}
              >
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.faqs?.map((faq, faqIndex) => (
                  <div key={faqIndex} className="border-b border-gray-200">
                    <button
                      className="w-full text-left py-4 flex justify-between items-center"
                      onClick={() =>
                        setExpandedIndex(
                          expandedIndex === faqIndex ? null : faqIndex
                        )
                      }
                    >
                      <span className="text-lg font-semibold text-gray-800">
                        {faq.question}
                      </span>
                      <span
                        className="text-2xl"
                        style={{ color: primaryColor }}
                      >
                        {expandedIndex === faqIndex ? '−' : '+'}
                      </span>
                    </button>
                    <AnimatePresence>
                      {expandedIndex === faqIndex && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-700 mb-4 text-base">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            If you have any further questions, please contact us at{' '}
            <a
              href="mailto:support@tithe.ly"
              className="font-medium hover:underline"
              style={{ color: primaryColor }}
            >
              support@info.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Faqs;