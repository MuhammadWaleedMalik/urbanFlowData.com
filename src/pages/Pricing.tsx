
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, DollarSign, Star } from 'react-feather';
import { Link } from 'react-router-dom';
import { websiteInfo } from '../data/website/info';
import { useLanguage } from '../contexts/LanguageContext';
import { colors } from '../data/colors/theme';

import enPricing from '../data/text/en/pricing.json';
import zhPricing from '../data/text/zh/pricing.json';
import jaPricing from '../data/text/ja/pricing.json';
import esPricing from '../data/text/es/pricing.json';

const languageMap = {
  en: enPricing,
  zh: zhPricing,
  ja: jaPricing,
  es: esPricing,
};

interface PricingContent {
  hero: {
    title: string;
    subtitle: string;
  };
  pricing: {
    title: string;
    description: string;
    plans: {
      id: number;
      name: string;
      price: string;
      features: string[];
      buttonText: string;
    }[];
    form: {
      title: string;
      subtitle: string;
      fields: {
        churchName: string;
        plan: string;
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

const defaultContent: PricingContent = {
  hero: {
    title: "Choose Your ChurchHub Plan",
    subtitle: "Select a pricing plan to empower your church.",
  },
  pricing: {
    title: "Pricing Plans",
    description: "Explore our flexible pricing plans to support your church's needs.",
    plans: [],
    form: {
      title: "Subscribe to a Plan",
      subtitle: "Complete the form to subscribe to a plan.",
      fields: {
        churchName: "Church Name",
        plan: "Pricing Plan",
        submit: "Subscribe Now",
      },
    },
  },
  benefits: {
    title: "Why Choose a Plan?",
    items: [],
  },
};

const Pricing: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const pageContent: PricingContent =
    (currentLanguage?.code && languageMap[currentLanguage.code as keyof typeof languageMap]) || defaultContent;

  const [formData, setFormData] = useState({
    churchName: '',
    plan: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Pricing plan selected:', formData);
    // Here you would typically send the form data to an API to trigger email notifications
    setFormData({ churchName: '', plan: '' });
  };

  const processText = (text: string) => {
    return text
      .replace(/\{website\.name\}/g, websiteInfo?.name || 'ChurchHub')
      .replace(/\{primaryColor1\}/g, colors.primaryColor1 || '#000000');
  };

  const iconComponents: Record<string, React.ReactNode> = {
    heart: <Heart size={24} />,
    dollar: <DollarSign size={24} />,
    star: <Star size={24} />,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center py-24 px-6 min-h-[50vh]"
        style={{ backgroundColor: colors.primaryColor1 || '#000000' }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            {processText(pageContent.hero?.title || defaultContent.hero.title)}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
          >
            {processText(pageContent.hero?.subtitle || defaultContent.hero.subtitle)}
          </motion.p>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <DollarSign size={36} color={colors.primaryColor1 || '#000000'} />
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primaryColor1 || '#000000' }}>
              {processText(pageContent.pricing?.title || defaultContent.pricing.title)}
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-8">
              {processText(pageContent.pricing?.description || defaultContent.pricing.description)}
            </p>
            {pageContent.pricing?.plans?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {pageContent.pricing.plans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-bold mb-4" style={{ color: colors.primaryColor1 || '#000000' }}>
                      {processText(plan.name)}
                    </h3>
                    <p className="text-3xl font-semibold mb-4" style={{ color: colors.primaryColor1 || '#000000' }}>
                      {processText(plan.price)}
                    </p>
                    <ul className="text-gray-600 mb-6 space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <Star size={16} className="mr-2" style={{ color: colors.primaryColor1 || '#000000' }} />
                          {processText(feature)}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={`/pricing/${plan.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="w-full p-2 rounded-md text-white font-semibold hover:opacity-90 transition-opacity inline-block text-center"
                      style={{ backgroundColor: colors.primaryColor1 || '#000000' }}
                      onClick={() => setFormData((prev) => ({ ...prev, plan: plan.name }))}
                    >
                      {processText(plan.buttonText)}
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No pricing plans available at this time.</p>
            )}
   
          </motion.div>
        </div>
      </section>

   
    </div>
  );
};

export default Pricing;



