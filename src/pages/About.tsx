import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Globe } from 'react-feather';
import { websiteInfo } from '../data/website/info';
import { useLanguage } from '../contexts/LanguageContext';
import { colors } from '../data/colors/theme';

import enAbout from '../data/text/en/about.json';
import zhAbout from '../data/text/zh/about.json';
import jaAbout from '../data/text/ja/about.json';
import esAbout from '../data/text/es/about.json';

const languageMap = {
  en: enAbout,
  zh: zhAbout,
  ja: jaAbout,
  es: esAbout,
};

interface AboutContent {
  hero: {
    title: string;
    subtitle: string;
  };
  about: {
    title: string;
    sections: {
      id: number;
      title: string;
      description: string;
      image?: string;
    }[];
  };
}

const AboutUs: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const pageContent: AboutContent = languageMap[currentLanguage?.code as keyof typeof languageMap] || languageMap.en;

  const processText = (text: string) => {
    return text
      .replace(/\{website\.name\}/g, websiteInfo?.name || 'ChurchHub')
      .replace(/\{primaryColor1\}/g, colors.primaryColor1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative w-full py-24 px-6 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl w-full font-extrabold text-white mb-4"
          >
            {processText(pageContent.hero.title)}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl w-full text-white/80 max-w-3xl mx-auto"
          >
            {processText(pageContent.hero.subtitle)}
          </motion.p>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4" style={{ color: colors.primaryColor1 }}>
              {processText(pageContent.about.title)}
            </h2>
          </motion.div>

          {/* About Sections */}
          {pageContent.about.sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="mb-12 flex flex-col md:flex-row items-center gap-8"
            >
              {section.image && (
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full md:w-1/3 h-full object-contain rounded-lg"
                />
              )}
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-3" style={{ color: colors.primaryColor1 }}>
                  {section.title}
                </h3>
                <p className="text-gray-600 text-base">
                  {processText(section.description).split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: colors.primaryColor1 }}>
              Nuestro Equipo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Lucas Andrade', role: 'Director de Tecnología', icon: <Users /> },
                { name: 'Isabella Rossi', role: 'Especialista en Financiación', icon: <Heart /> },
                { name: 'David Li', role: 'Innovador Tecnológico', icon: <Globe /> },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${colors.primaryColor1}20` }}
                  >
                    {member.icon}
                  </div>
                  <h4 className="text-lg font-semibold" style={{ color: colors.primaryColor1 }}>
                    {member.name}
                  </h4>
                  <p className="text-gray-500 text-sm">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;