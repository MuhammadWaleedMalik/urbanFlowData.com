import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { websiteInfo } from '../../data/website/info';
import { colors } from '../../data/colors/theme';

const Footer: React.FC = () => {
  const { textPrimary, accent } = colors;

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-black text-white "
      style={{ borderTop: `1px solid ${accent}` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-row relative  space-y-6">
          {/* Logo and Website Name */}
          <div className="flex flex-row items-center space-y-2">
            <img 
              src={websiteInfo.logo} 
              alt={websiteInfo.name} 
              className="h-12 w-auto"
            />
            <h2 className="text-xl   font-bold" style={{ color: textPrimary }}>
              {websiteInfo.name}
            </h2>
          </div>

          {/* Navigation Links in One Row */}
          <div className="relative  left-[25%] space-x-6">
            <Link 
              to="/terms" 
              className="text-sm hover:underline transition-colors"
              style={{ color: "white" }}
            >
              Terms and Conditions
            </Link>
            <Link 
              to="/privacy" 
              className="text-sm hover:underline transition-colors"
                         style={{ color: "white" }}
 >
              Privacy Policy 
            </Link>
            <Link 
              to="/cookies" 
              className="text-sm hover:underline transition-colors"
              style={{ color: "white" }}
            >
                Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;