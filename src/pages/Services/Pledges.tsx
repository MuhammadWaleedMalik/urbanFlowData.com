import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, DollarSign, Globe } from 'react-feather';
import { websiteInfo } from '../../data/website/info';
import { useLanguage } from '../../contexts/LanguageContext';
import { colors } from '../../data/colors/theme';

import enPledge from '../data/text/en/pledge.json';
import zhPledge from '../data/text/zh/pledge.json';
import jaPledge from '../data/text/ja/pledge.json';
import esPledge from '../data/text/es/pledge.json';

const languageMap = {
  en: enPledge,
  zh: zhPledge,
  ja: jaPledge,
  es: esPledge,
};

interface PledgeContent {
  hero: {
    title: string;
    subtitle: string;
  };
  pledge: {
    title: string;
    description: string;
    form: {
      title: string;
      subtitle: string;
      fields: {
        churchName: string;
        pledgeAmount: string;
        frequency: string;
        paymentMethod: string;
        submit: string;
      };
      frequencies: string[];
      paymentMethods: string[];
    };
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

const Pledges: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const pageContent: PledgeContent = languageMap[currentLanguage?.code as keyof typeof languageMap] || languageMap.en;

  const [formData, setFormData] = useState({
    churchName: '',
    pledgeAmount: '',
    frequency: '',
    paymentMethod: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Pledge submitted:', formData);
    // Here you would typically send the form data to an API
    setFormData({ churchName: '', pledgeAmount: '', frequency: '', paymentMethod: '' });
  };

  const processText = (text: string) => {
    return text
      .replace(/\{website\.name\}/g, websiteInfo?.name || 'ChurchHub')
      .replace(/\{primaryColor1\}/g, colors.primaryColor1);
  };

  const iconComponents: Record<string, React.ReactNode> = {
    heart: <Heart size={24} />,
    dollar: <DollarSign size={24} />,
    globe: <Globe size={24} />,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center py-24 px-6 min-h-[50vh]"
        style={{ backgroundColor: colors.primaryColor1 }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            {processText(pageContent.hero.title)}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
          >
            {processText(pageContent.hero.subtitle)}
          </motion.p>
        </div>
      </section>

      {/* Pledge Form Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Heart size={36} color={colors.primaryColor1} />
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primaryColor1 }}>
              {processText(pageContent.pledge.title)}
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-8">
              {processText(pageContent.pledge.description)}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg p-6 shadow-md max-w-xl mx-auto"
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.primaryColor1 }}>
                {processText(pageContent.pledge.form.title)}
              </h3>
              <p className="text-gray-600 mb-6">{processText(pageContent.pledge.form.subtitle)}</p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="churchName">
                    {processText(pageContent.pledge.form.fields.churchName)}
                  </label>
                  <input
                    type="text"
                    id="churchName"
                    name="churchName"
                    value={formData.churchName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.primaryColor1 }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="pledgeAmount">
                    {processText(pageContent.pledge.form.fields.pledgeAmount)}
                  </label>
                  <input
                    type="number"
                    id="pledgeAmount"
                    name="pledgeAmount"
                    value={formData.pledgeAmount}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.primaryColor1 }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="frequency">
                    {processText(pageContent.pledge.form.fields.frequency)}
                  </label>
                  <select
                    id="frequency"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.primaryColor1 }}
                    required
                  >
                    <option value="" disabled>
                      Select Frequency
                    </option>
                    {pageContent.pledge.form.frequencies.map((freq) => (
                      <option key={freq} value={freq}>
                        {processText(freq)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="paymentMethod">
                    {processText(pageContent.pledge.form.fields.paymentMethod)}
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.primaryColor1 }}
                    required
                  >
                    <option value="" disabled>
                      Select Payment Method
                    </option>
                    {pageContent.pledge.form.paymentMethods.map((method) => (
                      <option key={method} value={method}>
                        {processText(method)}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full p-2 rounded-md text-white font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primaryColor1 }}
                >
                  {processText(pageContent.pledge.form.fields.submit)}
                </button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-center mb-8"
            style={{ color: colors.primaryColor1 }}
          >
            {processText(pageContent.benefits.title)}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pageContent.benefits.items.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-16 h-16 rounded-full mb-3 flex items-center justify-center"
                    style={{ backgroundColor: `${colors.primaryColor1}20` }}
                  >
                    {iconComponents[benefit.icon] || <Heart size={24} color={colors.primaryColor1} />}
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: colors.primaryColor1 }}>
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-center text-sm">
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

export default Pledges;