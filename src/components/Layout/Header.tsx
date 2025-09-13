import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Globe, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { websiteInfo } from '../../data/website/info';

// Import language files statically
import enHeader from './en/header.json';
import zhHeader from './zh/header.json';
import jaHeader from './ja/header.json';
import esHeader from './es/header.json';

// Create a language map
const languageMap = {
  en: enHeader,
  zh: zhHeader,
  ja: jaHeader,
  es: esHeader,
};

interface HeaderContent {
  logoAlt: string;
  nav: {
    home: string;
    data: string;
    api: string;
    login: string;
    signup: string;
    logout: string;
  };
  languageSelector: {
    heading: string;
    changeLanguageLabel: string;
  };
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [pageContent, setPageContent] = useState<HeaderContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, logout } = useAuth();
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const navigate = useNavigate();

  // Define colors
  const colors = {
    primaryColor1: '#EF7D00',
    textPrimary: '#000000',
    textSecondary: '#000000',
    secondaryColor1: '#000000',
  };

  // Set favicon dynamically
  useEffect(() => {
    const setFavicon = () => {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = websiteInfo?.favicon ?? '/favicon.ico';
    };

    setFavicon();
  }, []);

  // Load language content
  useEffect(() => {
    const loadContent = () => {
      setIsLoading(true);
      try {
        const content = languageMap[currentLanguage?.code as keyof typeof languageMap] ?? languageMap.en;
        setPageContent(content);
      } catch (err) {
        console.error(`Failed to load ${currentLanguage?.code} content:`, err);
        setPageContent(languageMap.en);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [currentLanguage]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode);
    setTimeout(() => setIsLanguageOpen(false), 200);
  };

  if (isLoading) {
    return (
      <div className="h-16 flex items-center justify-center bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" style={{ borderColor: colors.primaryColor1 }}></div>
      </div>
    );
  }

  if (!pageContent) {
    return (
      <div className="h-16 flex items-center justify-center bg-gradient-to-r from-orange-50 to-orange-100">
        <p className="text-sm font-semibold" style={{ color: colors.primaryColor1 }}>
          Content not available
        </p>
      </div>
    );
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-gradient-to-r from-orange-50 to-orange-100 shadow-md sticky top-0 z-50"
      style={{ borderBottom: `3px solid ${colors.primaryColor1}` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side - Logo and Website Name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src={websiteInfo?.logo ?? '/logo.png'}
                alt={pageContent.logoAlt.replace('{websiteName}', websiteInfo?.name ?? 'STIB-MIVB')}
                className="w-10 h-10 rounded-full shadow-sm"
              />
              <span
                className="text-2xl font-semibold tracking-tight"
                style={{ color: colors.primaryColor1 }}
              >
                {websiteInfo?.name ?? 'STIB-MIVB'}
              </span>
            </Link>
            <nav className="hidden relative  md:flex items-left left-10 space-x-8">
              <Link
                to="/"
                className="text-sm font-medium relative group"
                style={{ color: colors.textPrimary }}
              >
                {pageContent.nav.home}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: colors.primaryColor1 }}
                ></span>
              </Link>
              <Link
                to="/data"
                className="text-sm font-medium relative group"
                style={{ color: colors.textPrimary }}
              >
                {pageContent.nav.data}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: colors.primaryColor1 }}
                ></span>
              </Link>
              <Link
                to="/api"
                className="text-sm font-medium relative group"
                style={{ color: colors.textPrimary }}
              >
                {pageContent.nav.api}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: colors.primaryColor1 }}
                ></span>
              </Link>
            </nav>

          </div>

          {/* Right Side - All other elements */}
          <div className="flex items-center space-x-8">
            {/* Desktop Navigation */}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-orange-100 transition-colors"
                aria-label={pageContent.languageSelector.changeLanguageLabel}
              >
                <Globe size={18} style={{ color: colors.textSecondary }} />
                <span className="text-sm font-medium">{currentLanguage?.flag ?? '🌐'}</span>
              </button>
              {isLanguageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl border py-2 w-40 z-50"
                  style={{ borderColor: colors.secondaryColor1 }}
                >
                  <div
                    className="px-4 py-2 text-sm font-semibold border-b"
                    style={{ color: colors.textPrimary, borderColor: colors.secondaryColor1 }}
                  >
                    {pageContent.languageSelector.heading}
                  </div>
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-4 py-2 text-left hover:bg-orange-50 flex items-center space-x-2 transition-colors ${
                        currentLanguage?.code === lang.code ? 'bg-orange-50' : ''
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span
                        className="text-sm"
                        style={{
                          color: currentLanguage?.code === lang.code
                            ? colors.primaryColor1
                            : colors.textPrimary,
                        }}
                      >
                        {lang.name}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* User Actions */}
            {user?.isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span
                  className="text-sm font-medium hidden sm:inline-block"
                  style={{ color: colors.textSecondary }}
                >
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-orange-100 transition-colors"
                  title={pageContent.nav.logout}
                >
                  <LogOut size={18} style={{ color: colors.textSecondary }} />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg border text-orange-600 hover:bg-orange-50 transition-colors"
                  style={{
                    borderColor: colors.primaryColor1,
                    color: colors.primaryColor1,
                  }}
                >
                  {pageContent.nav.login}
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg text-white hover:bg-orange-700 transition-colors"
                  style={{ backgroundColor: colors.primaryColor1 }}
                >
                  {pageContent.nav.signup}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-orange-100"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} style={{ color: colors.textPrimary }} />
              ) : (
                <Menu size={24} style={{ color: colors.textPrimary }} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t py-4 space-y-4"
            style={{ borderColor: colors.secondaryColor1 }}
          >
            <Link
              to="/"
              className="block px-4 py-2 hover:bg-orange-50 transition-colors"
              style={{ color: colors.textPrimary }}
              onClick={() => setIsMenuOpen(false)}
            >
              {pageContent.nav.home}
            </Link>
            <Link
              to="/data"
              className="block px-4 py-2 hover:bg-orange-50 transition-colors"
              style={{ color: colors.textPrimary }}
              onClick={() => setIsMenuOpen(false)}
            >
              {pageContent.nav.data}
            </Link>
            <Link
              to="/api"
              className="block px-4 py-2 hover:bg-orange-50 transition-colors"
              style={{ color: colors.textPrimary }}
              onClick={() => setIsMenuOpen(false)}
            >
              {pageContent.nav.api}
            </Link>
            {!user?.isAuthenticated && (
              <div className="flex space-x-3 pt-4 px-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg border text-orange-600 flex-1 text-center hover:bg-orange-50 transition-colors"
                  style={{
                    borderColor: colors.primaryColor1,
                    color: colors.primaryColor1,
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {pageContent.nav.login}
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg text-white flex-1 text-center hover:bg-orange-700 transition-colors"
                  style={{ backgroundColor: colors.primaryColor1 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {pageContent.nav.signup}
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;