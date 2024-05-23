import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import SearchBar, { SearchForm } from "./SearchBar";

export default function Test() {
  const navigate = useNavigate(); // Create a navigate function

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    const { searchQuery, selectedWilaya } = searchFormValues;
    let queryParams = `query=${searchQuery}`;

    if (selectedWilaya) {
      queryParams += `&wilaya=${selectedWilaya}`;
    }

    navigate(`/search?${queryParams}`);
  };

  const wilayaOptions = [
    "Adrar",
    "Chlef",
    "Laghouat",
    "Oum El Bouaghi",
    "Batna",
    "Béjaïa",
    "Biskra",
    "Béchar",
    "Blida",
    "Bouira",
    "Tamanrasset",
    "Tébessa",
    "Tlemcen",
    "Tiaret",
    "Tizi Ouzou",
    "Algiers",
    "Djelfa",
    "Jijel",
    "Sétif",
    "Saïda",
    "Skikda",
    "Sidi Bel Abbès",
    "Annaba",
    "Guelma",
    "Constantine",
    "Médéa",
    "Mostaganem",
    "M'Sila",
    "Mascara",
    "Ouargla",
    "Oran",
    "El Bayadh",
    "Illizi",
    "Bordj Bou Arréridj",
    "Boumerdès",
    "El Tarf",
    "Tindouf",
    "Tissemsilt",
    "El Oued",
    "Khenchela",
    "Souk Ahras",
    "Tipaza",
    "Mila",
    "Aïn Defla",
    "Naâma",
    "Aïn Témouchent",
    "Ghardaïa",
    "Relizane",
  ];

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
          placeHolder='Search any service'
          onSubmit={handleSearchSubmit}
          wilayaOptions={wilayaOptions}
          className='search-bar-white' // Add a different class name
          wilayaSelectClassName='wilaya-select-white'
        />
      </motion.div>
    </div>
  );
}
