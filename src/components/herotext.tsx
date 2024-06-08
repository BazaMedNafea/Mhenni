import React from 'react';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SearchBar, { SearchForm } from "./SearchBar";

export default function Test() {
  const navigate = useNavigate();
  const [showFindCustomers, setShowFindCustomers] = React.useState(false);

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    const { searchQuery, selectedWilaya } = searchFormValues;
    let queryParams = `query=${searchQuery}`;

    if (selectedWilaya) {
      queryParams += `&wilaya=${selectedWilaya}`;
    }

    navigate(`/search?${queryParams}`);
  };

  const wilayaOptions = [
    "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa",
    "Biskra", "Béchar", "Blida", "Bouira", "Tamanrasset", "Tébessa",
    "Tlemcen", "Tiaret", "Tizi Ouzou", "Algiers", "Djelfa", "Jijel",
    "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma",
    "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla",
    "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj", "Boumerdès",
    "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela", "Souk Ahras",
    "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa",
    "Relizane"
  ];

  const words = [ "repair,", "cleaning,"];
  const [currentWord, setCurrentWord] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prevWord) => (prevWord + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {showFindCustomers ? (
        <div className="w-full">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4 sm:mb-6">
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-base sm:text-lg font-bold text-yellow-400"
              onClick={() => setShowFindCustomers(false)}
            >
              HIRE A Provider
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-base sm:text-lg font-bold text-yellow-400"
            >
              FIND CUSTOMERS
            </motion.button>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-4 sm:mb-6 lg:mb-8"
          >
            Meet new customers in your area.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 lg:mb-8"
          >
            Sign up to start growing your business.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition-colors"
          >
            Get Started
          </motion.button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-4 sm:mb-6 lg:mb-8"
          >
            Mhenni , Your Local &nbsp;
            <span className="text-yellow-400">
              {words[currentWord]}
            </span>
            <br />
            made easy.
          </motion.h1>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4 sm:mb-6">
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-base sm:text-lg font-bold text-yellow-400"
              onClick={() => setShowFindCustomers(true)}
            >
              HIRE A Provider
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-base sm:text-lg font-boldtext-yellow-400"
              onClick={() => setShowFindCustomers(true)}
            >
              FIND CUSTOMERS
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-4 sm:mt-6"
          >
            <SearchBar
              placeHolder="What's on your to-do list?"
              onSubmit={handleSearchSubmit}
              wilayaOptions={wilayaOptions}
              className="search-bar"
              wilayaSelectClassName="wilaya"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-2 sm:mt-4 text-base sm:text-lg text-gray-700"
          >
            Try searching for a <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors">Plumber</a>, <a href="#" className="text-blue-500 hover:text-blue-700 transition-
            colors">Handyman</a>, <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors">Landscaper</a> or <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors">Electrician</a>.
            </motion.div>
          </motion.div>
        )}
      </div>
    );
  }