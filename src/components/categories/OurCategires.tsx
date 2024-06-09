import { useState } from "react";
import { motion } from "framer-motion";
import { categoriestype } from "@/types";
import { SelectedPage } from "@/types/selectepage";
import HText from "../Htext";
import { Car, Home, Hammer, Heart, X } from "lucide-react";

const categories: Array<categoriestype> = [
  {
    name: "Home Services",
    icon: <Home size={40} />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://img.freepik.com/premium-photo/low-section-man-standing-floor_1048944-23932194.jpg?w=740",
    services: [
      {
        name: "House Cleaning/Housekeeping",
        image:
          "https://img.freepik.com/free-photo/cleaning-service-cleaning-modern-living-room_23-2148820706.jpg",
      },
    ],
  },
  {
    name: "Auto Services",
    icon: <Car size={40} />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://img.freepik.com/free-photo/low-angle-delivery-man-with-package-list_23-2148590677.jpg",
    services: [
      {
        name: "Car Washing/Detailing",
        image:
          "https://img.freepik.com/free-photo/close-up-car-care-washing_23-2149172897.jpg?t=st=1717862688~exp=1717866288~hmac=285077f568962406acd880172fbbfec2e97567282bb8d359d600ed66d5777f12&w=740",
      },
      {
        name: "Oil Changes/Maintenance",
        image:
          "https://as2.ftcdn.net/v2/jpg/06/78/88/85/1000_F_678888582_kwG1pTxirlRuFdUqF3sW8UwXVXxEMd5s.jpg",
      },
      {
        name: "Tire Services",
        image:
          "https://cdn-ghpaj.nitrocdn.com/HOEUSibVHIzcJgbFZSZiiKrgCviobVHJ/assets/images/optimized/rev-8c37a3f/www.ramonatire.com/wp-content/uploads/sites/4/2021/06/mechanic-change-tire-repairing-service-87YKRJZ-1.jpg",
      },
      {
        name: "Windshield Repair/Replacement",
        image:
          "https://www.safelite.com/imagesv3/default-source/refresh/windshield-repair/expert-windshield-repair@1x.jpg?sfvrsn=59c706d6_2",
      },
    ],
  },
  {
    name: "Moving",
    icon: <Car size={40} />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://img.freepik.com/premium-photo/low-section-man-standing-floor_1048944-23932194.jpg?w=740",
    services: [
      {
        name: "Local Moving",
        image:
          "https://img.freepik.com/free-photo/moving-house-concept-with-house-shaped-box_23-2147898975.jpg",
      },
      {
        name: "Long-Distance Moving",
        image:
          "https://img.freepik.com/free-photo/relocation-concept-with-moving-boxes-doors_23-2148829646.jpg",
      },
      {
        name: "Packing/Unpacking Services",
        image:
          "https://img.freepik.com/free-photo/close-up-man-packing-moving-box_23-2148829714.jpg",
      },
      {
        name: "Courier/Delivery Services",
        image:
          "https://img.freepik.com/free-photo/delivery-man-giving-customer-boxes_342744-196.jpg",
      },
    ],
  },
  {
    name: "Repair Services",
    icon: <Hammer size={40} />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://img.freepik.com/premium-photo/low-section-man-standing-floor_1048944-23932194.jpg?w=740",
    services: [
      {
        name: "Appliance Repair",
        image:
          "https://img.freepik.com/free-photo/man-fixing-washing-machine_1303-23887.jpg",
      },
      {
        name: "Furniture Repair",
        image:
          "https://img.freepik.com/free-photo/carpenter-fixing-chair-leg-with-screwdriver_23-2147898972.jpg",
      },
      {
        name: "Computer/Electronics Repair",
        image:
          "https://img.freepik.com/free-photo/close-up-technician-repairing-motherboard-with-soldering-iron_342744-53.jpg",
      },
      {
        name: "Bicycle Repair",
        image:
          "https://img.freepik.com/free-photo/close-up-bike-repair_23-2147881451.jpg",
      },
    ],
  },
  {
    name: "Health/Wellness",
    icon: <Heart size={40} />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://img.freepik.com/premium-photo/low-section-man-standing-floor_1048944-23932194.jpg?w=740",
    services: [
      {
        name: "In-Home Care Services",
        image:
          "https://img.freepik.com/free-photo/nurse-checking-blood-pressure-patient_23-2148877991.jpg",
      },
      {
        name: "Nursing Services",
        image:
          "https://img.freepik.com/free-photo/nurse-giving-medicine-elderly-patient_23-2148877996.jpg",
      },
      {
        name: "Counseling/Therapy",
        image:
          "https://img.freepik.com/free-photo/woman-during-therapy-session_23-2148722552.jpg",
      },
    ],
  },
  {
    name: "Entertainment",
    icon: <Heart size={40} />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://img.freepik.com/premium-photo/low-section-man-standing-floor_1048944-23932194.jpg?w=740",
    services: [
      {
        name: "DJ Services",
        image:
          "https://img.freepik.com/free-photo/dj-turntable-playing-songs-during-party-concert_482257-17458.jpg",
      },
      {
        name: "Catering",
        image:
          "https://img.freepik.com/free-photo/catering-service-buffet-wedding_1339-96151.jpg",
      },
      {
        name: "Party/Event Rentals",
        image:
          "https://img.freepik.com/free-photo/photo-young-people-sitting-tables-arranged-with-flowers-wineglasses_8353-994.jpg",
      },
      {
        name: "Local Tours/Experiences",
        image:
          "https://img.freepik.com/free-photo/group-young-tourists-exploring-modern-city_23-2148979275.jpg",
      },
    ],
  },
];

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const MenuItem = ({
  name,
  icon,
  onClick,
}: {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <motion.li
      className='cursor-pointer p-6 hover:bg-gray-200 transition duration-200 ease-in-out group text-2xl'
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
    >
      <div className='flex flex-col items-center space-y-2'>
        {icon}
        <span>{name}</span>
      </div>
    </motion.li>
  );
};

const ServiceCard = ({
  service,
}: {
  service: { name: string; image: string };
}) => {
  return (
    <div className='bg-white p-4 shadow rounded-lg text-center'>
      <img
        src={service.image}
        alt={service.name}
        className='w-full h-96 object-cover rounded-lg mb-4'
      />
      <p className='text-xl font-semibold'>{service.name}</p>
    </div>
  );
};

const OurCategories = ({ setSelectedPage }: Props) => {
  const [selectedCategory, setSelectedCategory] =
    useState<categoriestype | null>(null);

  const handleCategoryClick = (category: categoriestype) => {
    setSelectedCategory(category);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  const scrollLeft = () => {
    document.getElementById("service-cards")!.scrollLeft -= 200;
  };

  const scrollRight = () => {
    document.getElementById("service-cards")!.scrollLeft += 200;
  };

  return (
    <section id='ourcategories' className='w-full py-20 bg-gray-100'>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onViewportEnter={() => setSelectedPage(SelectedPage.OurCategories)}
      >
        <motion.div
          className='mx-auto w-4/5'
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
            <p className='py-5 text-2xl'>
              Explore our diverse range of categories to find the services you
              need.
            </p>
          </div>
        </motion.div>
        <div className='mt-10'>
          <ul className='flex flex-wrap justify-center space-x-8 bg-white p-10 shadow rounded-lg'>
            {categories.map((item, index) => (
              <MenuItem
                key={`${item.name}-${index}`}
                name={item.name}
                icon={item.icon}
                onClick={() => handleCategoryClick(item)}
              />
            ))}
          </ul>
          {selectedCategory && (
            <div className='relative mt-10'>
              <button
                onClick={handleBackClick}
                className='absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700'
              >
                <X size={24} />
              </button>
              <div className='flex justify-between items-center mt-4'>
                <button
                  onClick={scrollLeft}
                  className='p-4 text-gray-500 hover:text-gray-700 text-4xl'
                >
                  &#10094;
                </button>
                <div
                  id='service-cards'
                  className='flex overflow-x-auto space-x-8 p-4 w-full'
                >
                  {selectedCategory.services.map((service, index) => (
                    <div className='flex-shrink-0' key={index}>
                      <ServiceCard service={service} />
                    </div>
                  ))}
                </div>
                <button
                  onClick={scrollRight}
                  className='p-4 text-gray-500 hover:text-gray-700 text-4xl'
                >
                  &#10095;
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default OurCategories;
