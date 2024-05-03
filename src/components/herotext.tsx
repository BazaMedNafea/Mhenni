import { motion } from "framer-motion";

import SearchBar, { SearchForm } from "./SearchBar";

export default function Test() {
  const handleSearchSubmit = (_searchFormValues: SearchForm) => {
    // Handle search submission
  };

  return (
    <div className='absolute inset-0 flex items-center justify-center'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className='md:px-32 rounded-lg shadow-md py-8 flex flex-col gap-5 text-left'
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          className='text-6xl font-bold tracking-tight text-[#F3CF00] text-center'
        >
          Welcome to Mhenni
        </motion.h1>
        <motion.span
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1 }}
          className='text-xl text-[#FAFAFA] font-medium text-center'
        >
          Services From Everyone, To Everyone{" "}
        </motion.span>

        <SearchBar
          placeHolder='Search by City or Town'
          onSubmit={handleSearchSubmit}
        />
      </motion.div>
    </div>
  );
}
