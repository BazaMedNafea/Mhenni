import { motion } from "framer-motion";
import { categoriestype } from "@/types";
import Categorie from "./categorie";
import { SelectedPage } from "@/types/selectepage";
import HText from "../Htext";

const categories: Array<categoriestype> = [
  {
    name: "Transportation Services",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://img.freepik.com/free-photo/low-angle-delivery-man-with-package-list_23-2148590677.jpg?t=st=1713293900~exp=1713297500~hmac=d15766463b8c474cc902a495299065602a12d25180ec9b67e4dbd5f663e12632&w=740",
  },
  {
    name: "House Services",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://img.freepik.com/premium-photo/low-section-man-standing-floor_1048944-23932194.jpg?w=740",
  },
  {
    name: "Construction Services",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://img.freepik.com/premium-photo/low-section-man-standing-floor_1048944-23932194.jpg?w=740",
  },
  {
    name: "Health and Wellness",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://img.freepik.com/premium-photo/low-section-man-standing-floor_1048944-23932194.jpg?w=740",
  },
  {
    name: "Education",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://img.freepik.com/premium-photo/low-section-man-standing-floor_1048944-23932194.jpg?w=740",
  },
  {
    name: "Payment",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://img.freepik.com/premium-photo/low-section-man-standing-floor_1048944-23932194.jpg?w=740",
  },
  {
    name: "Party and Event",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://img.freepik.com/premium-photo/low-section-man-standing-floor_1048944-23932194.jpg?w=740",
  },
  {
    name: "Food Delivery",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://img.freepik.com/premium-photo/low-section-man-standing-floor_1048944-23932194.jpg?w=740",
  },
];

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const OurCategories = ({ setSelectedPage }: Props) => {
  return (
    <section
      id='ourcategories'
      className='w-full py-40'
      style={{ backgroundColor: "#F8E36B" }}
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onViewportEnter={() => setSelectedPage(SelectedPage.OurCategories)}
      >
        <motion.div
          className='mx-auto w-5/6'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <div className='md:w-3/5'>
            <HText>OUR CATEGORIES</HText>
            <p className='py-5'>
              Explore our diverse range of categories to find the services you
              need.
            </p>
          </div>
        </motion.div>
        <div className='mt-10 flex overflow-x-auto overflow-y-hidden'>
          {categories.map((item: categoriestype, index) => (
            <motion.div
              key={`${item.name}-${index}`}
              className='flex-shrink-0 mr-4' // Adjust margin as needed
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Categorie
                name={item.name}
                description={item.description}
                image={item.image}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default OurCategories;
