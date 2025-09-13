  import React, { useState } from 'react';
  import { motion } from 'framer-motion';
  import { FileText, Calendar, User } from 'react-feather';
  import { websiteInfo } from '../data/website/info';
  import { useLanguage } from '../contexts/LanguageContext';
  import { colors } from '../data/colors/theme';
  import enBlogs from '../data/text/en/blogs.json';
  import zhBlogs from '../data/text/zh/blogs.json';
  import jaBlogs from '../data/text/ja/blogs.json';
  import esBlogs from '../data/text/es/blogs.json';

  const languageMap = {
    en: enBlogs,
    zh: zhBlogs,
    ja: jaBlogs,
    es: esBlogs,
  };

  interface BlogContent {
    hero: {
      title: string;
      subtitle: string;
    };
    blogs: {
      title: string;
      categories: string[];
      items: {
        id: number;
        title: string;
        description: string;
        author: string;
        date: string;
        image?: string;
        category: string;
      }[];
    };
  }

  const Blogs: React.FC = () => {
    const { currentLanguage } = useLanguage();
    const pageContent: BlogContent = languageMap[currentLanguage?.code as keyof typeof languageMap] || languageMap.en;
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const processText = (text: string) => {
      return text
        .replace(/\{website\.name\}/g, websiteInfo?.name || 'ChurchHub')
        .replace(/\{primaryColor1\}/g, colors.primaryColor1);
    };

    const filteredBlogs = selectedCategory === 'All'
      ? pageContent.blogs.items
      : pageContent.blogs.items.filter(blog => blog.category === selectedCategory);

    return (
      <div className="min-h-screen bg-gray-100">
        {/* Hero Section */}
        <section
          className="relative w-full py-24 px-6 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516321310762-9c4cf4cdcc98')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
          <div className="relative z-10 max-w-5xl mx-auto text-left">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            >
              {processText(pageContent.hero.title)}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/80 max-w-2xl"
            >
              {processText(pageContent.hero.subtitle)}
            </motion.p>
          </div>
        </section>

        {/* Blog Content Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* Blog Grid */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold mb-4" style={{ color: colors.primaryColor1 }}>
                  {processText(pageContent.blogs.title)}
                </h2>
                {/* Category Filters */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {['All', ...pageContent.blogs.categories].map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-primaryColor1 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-200'
                      }`}
                      style={{ backgroundColor: selectedCategory === category ? colors.primaryColor1 : '' }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBlogs.map((blog, index) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-40 object-contain"
                      />
                    ) : (
                      <div
                        className="w-full h-40 flex items-center justify-center"
                        style={{ backgroundColor: `${colors.primaryColor1}20` }}
                      >
                        <FileText size={32} color={colors.primaryColor1} />
                      </div>
                    )}
                    <div className="p-6">
                      <span
                        className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3"
                        style={{ backgroundColor: `${colors.primaryColor1}20`, color: colors.primaryColor1 }}
                      >
                        {blog.category}
                      </span>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: colors.primaryColor1 }}>
                        {blog.title}
                      </h3>
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <User size={14} className="mr-1" />
                        {blog.author}
                        <Calendar size={14} className="ml-3 mr-1" />
                        {blog.date}
                      </div>
                      <p className="text-gray-600 text-sm">
                        {processText(blog.description)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar - Recent Posts */}
            <div className="w-full lg:w-80">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primaryColor1 }}>
                  Recent Posts
                </h3>
                <div className="space-y-4">
                  {pageContent.blogs.items.slice(0, 3).map(blog => (
                    <div key={blog.id} className="flex items-start gap-3">
                      {blog.image ? (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                      ) : (
                        <div
                          className="w-16 h-16 rounded-md flex items-center justify-center"
                          style={{ backgroundColor: `${colors.primaryColor1}20` }}
                        >
                          <FileText size={24} color={colors.primaryColor1} />
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-medium" style={{ color: colors.primaryColor1 }}>
                          {blog.title}
                        </h4>
                        <p className="text-xs text-gray-500">{blog.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  export default Blogs;