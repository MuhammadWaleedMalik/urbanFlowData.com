// Home.tsx
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { websiteInfo } from '../data/website/info';
import { colors } from '../data/colors/theme';

// Import language files
import enHome from '../data/text/en/home.json';
import zhHome from '../data/text/zh/home.json';
import jaHome from '../data/text/ja/home.json';
import esHome from '../data/text/es/home.json';

const languageMap = {
  en: enHome,
  zh: zhHome,
  ja: jaHome,
  es: esHome,
};

interface HomeContent {
  header?: {
    logo?: string;
  };
  page1?: {
    title?: string;
    description?: string;
    links?: Array<{ text?: string; url?: string }>;
  };
  page2?: {
    title?: string;
    cards?: Array<{ title?: string; description?: string }>;
  };
  page3?: {
    title?: string;
    description?: string;
    formTitle?: string;
    formDescription?: string;
    fields?: Array<{ label?: string; type?: string; required?: boolean }>;
  };
  page4?: {
    title?: string;
    sections?: Array<{ 
      title?: string; 
      description?: string;
      downloads?: number;
      image?: string;
    }>;
  };
}

const Home: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const defaultContent = languageMap.en as HomeContent;

  const pageContent = languageMap[currentLanguage?.code as keyof typeof languageMap] || defaultContent;

  // Sample images for the data cards
  const dataImages = [
    "https://data.stib-mivb.brussels/picto/v3:train_station.svg/?color=%23ef7d00" ,   
    "https://data.stib-mivb.brussels/picto/v3:train_station.svg/?color=%23ef7d00" ,   
    "https://data.stib-mivb.brussels/picto/v3:train_station.svg/?color=%23ef7d00" ,
    "https://data.stib-mivb.brussels/picto/v3:townplanning.svg/?color=%23ef7d00",   
    "https://data.stib-mivb.brussels/picto/v3:train_station.svg/?color=%23ef7d00" ,
     
  ];

  return (
    <div 
        className="min-h-screen"
        style={{fontFamily: "Times New Roman", backgroundColor: "#E4E5E8"}}
    >
      {/* Header with logo only */}
      <header className="bg-white shadow-sm">
        <div className="w-full h-screen bg-white px-2 py-2">
          <img 
            src={pageContent.header?.logo || "https://s3-eu-west-1.amazonaws.com/aws-ec2-eu-1-opendatasoft-staticfileset/stibmivb/theme_image/stib_photo1.jpeg"} 
            alt="STIB Logo" 
            className="h-full w-full object-cover"
          />
        </div>
      </header>

      {/* Page 1: Hero section with left content and right data cards */}
      <section className="py-12 px-6 md:px-24" style={{backgroundColor: "#E4E5E8"}}>
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12" style={{backgroundColor: "#E4E5E8"}}>
          {/* Left side content */}
          <div className='relative h-full w-full lg:w-4/5 px-8 py-8 lg:-right-20 lg:-top-44 -top-20'
              style={{backgroundColor: "#EF7D00"}}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-6">
              {pageContent.page1?.title}
            </h1>
            <p className="text-lg text-black mb-6">
              {pageContent.page1?.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {pageContent.page1?.links?.map((link, index) => (
                <a
                  key={index}
                  href={link.url || "#"}
                  className="bg-black italic text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
          
          {/* Right side data cards (3 per row, 2 rows) */}
          <div className="relative lg:right-20 lg:-top-10 -top-10 p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
            {pageContent.page2?.cards?.map((card, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow border border-gray-100">
                <h3 
                  className="font-bold text-xl text-center mb-2"
                  style={{color: "#EF7D00"}}
                >{card.title}</h3>
                <p className="text-gray-800 text-center">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Page 2: Contact form section */}
      <section className="py-12 px-6" style={{backgroundColor: "#E4E5E8"}}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            {pageContent.page3?.title}
          </h2>
          <div className="bg-gray-50 py-8 px-6 rounded-lg">
            <p className="text-gray-700 mb-6 text-center">
              {pageContent.page3?.description}
            </p>
            <p className="text-gray-600 mb-8 italic text-center">
              {pageContent.page3?.formDescription}
            </p>
            
            <form className="space-y-6 max-w-2xl mx-auto">
              {pageContent.page3?.fields?.map((field, index) => (
                <div key={index}>
                  <label className="block text-gray-700 mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type={field.type || "text"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={field.required}
                  />
                </div>
              ))}
              
              <button
                type="submit"
                className="w-full text-white py-3 px-4 rounded-md transition-colors"
                style={{backgroundColor: "#EF7D00"}}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Page 3: Info sections (7 rows with 2 divs each) */}
      <section className="py-12 px-6"
       style={{backgroundColor: "#E4E5E8"}}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-left mb-12">
            {pageContent.page4?.title}
          </h2>
          
          <div className="">
            {pageContent.page4?.sections?.map((section, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left div with image, heading and download count */}
                <div className="bg-white p-6 w-full h-24 rounded-lg shadow border border-gray-100 flex">
                  <div className=" mr-4">
                    <img 
                      src={dataImages[index] || "https://s3-eu-west-1.amazonaws.com/aws-ec2-eu-1-opendatasoft-staticfileset/stibmivb/theme_image/stib_photo1.jpeg"} 
                      alt={section.title} 
                      className="w-12 h-12 object-contain rounded-md"
                    />
                  </div>
                  <div className="">
                    <h3 className="font-bold text-lg mb-2">{section.title}</h3>
                    <p className="text-sm text-gray-600">Downloads: {section.downloads || 1245 + index * 234}</p>
                  </div>
                </div>
                
                {/* Right div with additional content */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                  <h3 className="font-bold text-lg mb-4">Top 5 Resources</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>GTFS Schedule Data</li>
                    <li>Real-time Vehicle Positions</li>
                    <li>Network Maps & Shapes</li>
                    <li>Historical Performance Data</li>
                    <li>API Documentation</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;