import { motion } from "framer-motion";
import { Users, Package, Star } from "lucide-react";
import HText from "../Htext";
import Benefit from "./Beniftclass";

const benefits = [
  {
    icon: <Users size={24} />,
    title: "Easy Booking",
    description:
      "Book services effortlessly, without any hassle or complication.",
  },
  {
    icon: <Package size={24} />,
    title: "Wide Range of Choices",
    description:
      "Choose from a variety of services, tailored to your preferences and needs.",
  },
  {
    icon: <Star size={24} />,
    title: "Trusted Providers",
    description:
      "Connect with verified service providers for reliable and high-quality services.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const Benefits = () => {
  return (
    <section id='benefits' className='mx-auto min-h-full w-5/6 py-20'>
      {/* HEADER */}
      <motion.div
        className='md:my-5 md:w-3/5'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <HText> Experience Mhenni </HText>
        <p className='my-5 text-2xl'>
        Explore Mhenni, your go-to platform for accessing a wide range of services. Join our community today and discover the convenience of personalized recommendations and instant access.
        </p>
      </motion.div>

      {/* BENEFITS */}
      <motion.div
        className='mt-5 items-center justify-between gap-8 md:flex text-2xl'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {benefits.map((benefit, index) => (
          <Benefit
            key={index}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default Benefits;
