import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, UserCheck } from 'react-feather';
import { websiteInfo } from '../../data/website/info';
import { useLanguage } from '../../contexts/LanguageContext';
import { colors } from '../../data/colors/theme';
import enJoin from '../data/text/en/join.json';
import zhJoin from '../data/text/zh/join.json';
import jaJoin from '../data/text/ja/join.json';
import esJoin from '../data/text/es/join.json';

const languageMap = {
  en: enJoin,
  zh: zhJoin,
  ja: jaJoin,
  es: esJoin,
};

interface JoinContent {
  hero: {
    title: string;
    subtitle: string;
  };
  joinChurch: {
    title: string;
    description: string;
    steps: {
      id: number;
      title: string;
      description: string;
      icon: string;
    }[];
  };
  registerChurch: {
    title: string;
    description: string;
    form: {
      title: string;
      subtitle: string;
      fields: {
        churchName: string;
        priestName: string;
        email: string;
        role: string;
        denomination: string;
        submit: string;
      };
      roles: string[];
      denominations: string[];
    };
    steps: {
      id: number;
      title: string;
      description: string;
      icon: string;
    }[];
  };
  benefits: {
    title: string;
    items: {
      id: number;
      title: string;
      description: string;
      icon: string;
    }[];
  };
}

const Join: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const pageContent: JoinContent = languageMap[currentLanguage?.code as keyof typeof languageMap] || languageMap.en;

  const [formData, setFormData] = useState({
    churchName: '',
    priestName: '',
    email: '',
    role: '',
    denomination: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Church registration submitted:', formData);
    // Here you would typically send the form data to an API
    setFormData({ churchName: '', priestName: '', email: '', role: '', denomination: '' });
  };

  const processText = (text: string) => {
    return text
      .replace(/\{website\.name\}/g, websiteInfo?.name || 'ChurchHub')
      .replace(/\{primaryColor1\}/g, colors.primaryColor1);
  };

  const iconComponents: Record<string, React.ReactNode> = {
    users: <Users size={24} />,
    globe: <Globe size={24} />,
    userCheck: <UserCheck size={24} />,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center py-32 px-6 min-h-[70vh]"
        style={{ backgroundColor: colors.primaryColor1 }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {processText(pageContent.hero.title)}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
          >
            {processText(pageContent.hero.subtitle)}
          </motion.p>
        </div>
      </section>

      {/* Join Church Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
            </div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: colors.primaryColor1 }}>
              {processText(pageContent.joinChurch.title)}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              {processText(pageContent.joinChurch.description)}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pageContent.joinChurch.steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="w-16 h-16 rounded-full mb-4 flex items-center justify-center"
                      style={{ backgroundColor: `${colors.primaryColor1}20` }}
                    >
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: colors.primaryColor1 }}>
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-center">
                      {processText(step.description)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Register Church Section with Form */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <UserCheck size={40} color={colors.primaryColor1} />
            </div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: colors.primaryColor1 }}>
              {processText(pageContent.registerChurch.title)}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              {processText(pageContent.registerChurch.description)}
            </p>
            {/* Church Registration Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl p-8 shadow-md max-w-2xl mx-auto mb-12"
            >
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.primaryColor1 }}>
                {processText(pageContent.registerChurch.form.title)}
              </h3>
              <p className="text-gray-600 mb-6">{processText(pageContent.registerChurch.form.subtitle)}</p>
              <div
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="churchName">
                    {processText(pageContent.registerChurch.form.fields.churchName)}
                  </label>
                  <input
                    type="text"
                    id="churchName"
                    name="churchName"
                    value={formData.churchName}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.primaryColor1 }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="priestName">
                    {processText(pageContent.registerChurch.form.fields.priestName)}
                  </label>
                  <input
                    type="text"
                    id="priestName"
                    name="priestName"
                    value={formData.priestName}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.primaryColor1 }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    {processText(pageContent.registerChurch.form.fields.email)}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.primaryColor1 }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="role">
                    {processText(pageContent.registerChurch.form.fields.role)}
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.primaryColor1 }}
                    required
                  >
                    <option value="" disabled>
                      Select Role
                    </option>
                    {pageContent.registerChurch.form.roles.map((role) => (
                      <option key={role} value={role}>
                        {processText(role)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="denomination">
                    {processText(pageContent.registerChurch.form.fields.denomination)}
                  </label>
                  <select
                    id="denomination"
                    name="denomination"
                    value={formData.denomination}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.primaryColor1 }}
                    required
                  >
                    <option value="" disabled>
                      Select Denomination
                    </option>
                    {pageContent.registerChurch.form.denominations.map((denomination) => (
                      <option key={denomination} value={denomination}>
                        {processText(denomination)}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full p-3 rounded-lg text-white font-bold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primaryColor1 }}
                  onClick={handleSubmit}
                >
                  {processText(pageContent.registerChurch.form.fields.submit)}
                </button>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pageContent.registerChurch.steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="w-16 h-16 rounded-full mb-4 flex items-center justify-center"
                      style={{ backgroundColor: `${colors.primaryColor1}20` }}
                    >
                      {iconComponents[step.icon] || <UserCheck size={24} color={colors.primaryColor1} />}
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: colors.primaryColor1 }}>
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-center">
                      {processText(step.description)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12"
            style={{ color: colors.primaryColor1 }}
          >
            {processText(pageContent.benefits.title)}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageContent.benefits.items.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow hover:-translate-y-1"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-20 h-20 rounded-full mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${colors.primaryColor1}20` }}
                  >
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors.primaryColor1 }}>
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {processText(benefit.description)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Join;