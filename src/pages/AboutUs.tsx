import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

import hero from "../assets/hero3.jpg";
import Benefits from "@/components/Benifts/Benifts";
import ContactUs from "@/components/ContactUs";
import { SelectedPage } from "@/types/selectepage";
import { Blockquote } from "flowbite-react";

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false); // State to control animation visibility

  return (
    <div>
      <Header />
      <div className="mb-8"></div>
      <motion.div
        initial={{ opacity: 0, y: -50 }} // Initial animation state (hidden above)
        animate={{ opacity: 1, y: 0 }} // Animation to perform when component is mounted (visible)
        transition={{ duration: 1, delay: 0.5 }} // Animation duration with a delay
        className="flex items-center justify-center"
      >
        <div className="p-4 text-center">
          <h1 className="text-4xl font-bold text-black  font-serif">
            About Us
          </h1>
          <p className="mt-2 text-lg text-black font-mono italic">
            {" "}
            "Welcome to our company! We are dedicated to providing the best
            services"...
          </p>
        </div>
      </motion.div>
      <div className="mb-8"></div>
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }} // Initial animation state (hidden above)
          animate={{ opacity: 1, y: 0 }} // Animation to perform when component is mounted (visible)
          transition={{ duration: 1, delay: 0.7 }} // Animation duration with a delay
          className="p-4 shadow-md flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold mb-4 font-serif">Our Story</h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-lg text-black font-sans italic"
            style={{ lineHeight: "1.5" }}
          >
            Transforming lives, one task at a time. We bring people together.
            It's at the heart of everything we do. We know that for every person
            who needs their radiator fixed before winter, the nursery set up for
            their newborn, or a TV mounted in time for game day, there's someone
            nearby who is ready, willing, and able to help, without delay. When
            these two people come together, they help each other in a profound
            way—they offer each other a better way of living.
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -50 }} // Initial animation state (hidden above)
          animate={{ opacity: 1, y: 0 }} // Animation to perform when component is mounted (visible)
          transition={{ duration: 1, delay: 0.7 }} // Animation duration with a delay
          className="p-4 shadow-md flex flex-col justify-center"
        >
          <img
            src={hero}
            alt="Hero"
            className="class"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </motion.div>
      </div>
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }} // Initial animation state (hidden to the left)
          animate={{ opacity: 1, x: 0 }} // Animation to perform when component is mounted (visible)
          transition={{ duration: 1, delay: 0.7 }} // Animation duration with a delay
          className="p-4  shadow-md flex flex-col justify-center"
        >
          <img
            src="https://img.freepik.com/free-photo/male-electrician-works-switchboard-with-electrical-connecting-cable_169016-15090.jpg?t=st=1714842568~exp=1714846168~hmac=34afa9f3dc7fced2a1000605a3f3cc56054704b49e0c4667cae9aff973f6fc36&w=740"
            alt="Electrician"
            className="class"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }} // Initial animation state (hidden to the right)
          animate={{ opacity: 1, x: 0 }} // Animation to perform when component is mounted (visible)
          transition={{ duration: 1, delay: 0.7 }} // Animation duration with a delay
          className="p-4  shadow-md flex flex-col justify-center"
          style={{ textAlign: "left", padding: "20px" }}
        >
          <h2 className="text-3xl font-bold mb-4 font-serif">Our Story</h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-lg text-black italic"
            style={{ lineHeight: "1.5" }}
          >
            Transforming lives, one task at a time. We bring people together.
            It's at the heart of everything we do. We know that for every person
            who needs their radiator fixed before winter, the nursery set up for
            their newborn, or a TV mounted in time for game day, there's someone
            nearby who is ready, willing, and able to help, without delay. When
            these two people come together, they help each other in a profound
            way—they offer each other a better way of living.
          </motion.p>
        </motion.div>
      </div>
      <Benefits />

      <Footer />
    </div>
  );
}
