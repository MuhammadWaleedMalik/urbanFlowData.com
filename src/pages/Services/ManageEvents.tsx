import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, MapPin } from 'react-feather';
import { websiteInfo } from '../../data/website/info';
import { useLanguage } from '../../contexts/LanguageContext';
import { colors } from '../../data/colors/theme';

import enEvents from '../data/text/en/events.json';
import zhEvents from '../data/text/zh/events.json';
import jaEvents from '../data/text/ja/events.json';
import esEvents from '../data/text/es/events.json';

const languageMap = {
  en: enEvents,
  zh: zhEvents,
  ja: jaEvents,
  es: esEvents,
};

interface EventsContent {
  hero: {
    title: string;
    subtitle: string;
  };
  events: {
    title: string;
    description: string;
    form: {
      title: string;
      subtitle: string;
      fields: {
        churchName: string;
        eventName: string;
        eventDate: string;
        eventTime: string;
        location: string;
        description: string;
        submit: string;
      };
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

const ManageEvents: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const pageContent: EventsContent = languageMap[currentLanguage?.code as keyof typeof languageMap] || languageMap.en;

  const [formData, setFormData] = useState({
    churchName: '',
    eventName: '',
    eventDate: '',
    eventTime: '',
    location: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Event submitted:', formData);
    // Here you would typically send the form data to an API, which could trigger email notifications
    setFormData({ churchName: '', eventName: '', eventDate: '', eventTime: '', location: '', description: '' });
  };

  const processText = (text: string) => {
    return text
      .replace(/\{website\.name\}/g, websiteInfo?.name || 'ChurchHub')
      .replace(/\{primaryColor1\}/g, colors.primaryColor1);
  };

  const iconComponents: Record<string, React.ReactNode> = {
    heart: <Heart size={24} />,
    calendar: <Calendar size={24} />,
    map: <MapPin size={24} />,
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

      {/* Event Management Form Section */}
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
              <Calendar size={36} color={colors.primaryColor1} />
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primaryColor1 }}>
              {processText(pageContent.events.title)}
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-8">
              {processText(pageContent.events.description)}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg p-6 shadow-md max-w-xl mx-auto"
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.primaryColor1 }}>
                {processText(pageContent.events.form.title)}
              </h3>
              <p className="text-gray-600 mb-6">{processText(pageContent.events.form.subtitle)}</p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="churchName">
                    {processText(pageContent.events.form.fields.churchName)}
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
                  <label className="block text-gray-700 mb-1" htmlFor="eventName">
                    {processText(pageContent.events.form.fields.eventName)}
                  </label>
                  <input
                    type="text"
                    id="eventName"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.primaryColor1 }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="eventDate">
                    {processText(pageContent.events.form.fields.eventDate)}
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.primaryColor1 }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="eventTime">
                    {processText(pageContent.events.form.fields.eventTime)}
                  </label>
                  <input
                    type="time"
                    id="eventTime"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.primaryColor1 }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="location">
                    {processText(pageContent.events.form.fields.location)}
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.primaryColor1 }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="description">
                    {processText(pageContent.events.form.fields.description)}
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.primaryColor1 }}
                    rows={4}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full p-2 rounded-md text-white font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primaryColor1 }}
                >
                  {processText(pageContent.events.form.fields.submit)}
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
                    {iconComponents[benefit.icon] || <Calendar size={24} color={colors.primaryColor1} />}
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

export default ManageEvents;