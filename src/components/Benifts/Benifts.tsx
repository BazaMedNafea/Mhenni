import { motion } from "framer-motion";
import { Clock, Users, Package, Star } from "lucide-react";
import HText from "../Htext";
import Benefit from "./Beniftclass";
import { Button } from "../ui/button";

const benefits = [
  {
    icon: <Clock size={24} />,
    title: "Instant Access to Services",
    description:
      "Access a wide range of services instantly, saving time and effort.",
  },
  {
    icon: <Users size={24} />,
    title: "Flexible Schedule",
    description:
      "Service providers can set their own schedules, offering flexibility for both providers and users.",
  },
  {
    icon: <Package size={24} />,
    title: "Variety of Services",
    description:
      "A diverse selection of services available, catering to various needs and preferences.",
  },
  {
    icon: <Star size={24} />,
    title: "Quality Assurance",
    description:
      "Service providers are vetted to ensure high-quality services and customer satisfaction.",
  },
];

const container = {
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
        <HText>MORE THAN JUST Service Marketplace.</HText>
        <p className='my-5 text-sm'>
          We provide world class fitness equipment, trainers and classes to get
          you to your ultimate fitness goals with ease. We provide true care
          into each and every member.
        </p>
      </motion.div>

      {/* BENEFITS */}
      <motion.div
        className='mt-5 items-center justify-between gap-8 md:flex'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
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

      {/* GRAPHICS AND DESCRIPTION */}
      <div className='mt-16 items-center justify-between gap-20 md:mt-28 md:flex'>
        {/* GRAPHIC */}
        <img
          className='mx-auto'
          alt='benefits-page-graphic'
          src='https://img.freepik.com/free-photo/plumbing-professional-doing-his-job_23-2150721533.jpg?t=st=1713487335~exp=1713490935~hmac=a339d324fcd803ff4761e09c2d6d0336dc4f1817ddc3c9a4b32a6955659b2be7&w=740'
        />

        {/* DESCRIPTION */}
        <div>
          {/* TITLE */}
          <div className='relative'>
            <div className='before:absolute before:-top-20 before:-left-20 before:z-[1] before:content-abstractwaves'>
              <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <HText>
                  bla bla to be a{" "}
                  <span className='text-yellow-300'>Provider</span>
                </HText>
              </motion.div>
            </div>
          </div>

          {/* DESCRIPT */}
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <p className='my-5'>
              Nascetur aenean massa auctor tincidunt. Iaculis potenti amet
              egestas ultrices consectetur adipiscing ultricies enim. Pulvinar
              fames vitae vitae quis. Quis amet vulputate tincidunt at in nulla
              nec. Consequat sed facilisis dui sit egestas ultrices tellus.
              Ullamcorper arcu id pretium sapien proin integer nisl. Felis orci
              diam odio.
            </p>
            <p className='mb-5'>
              Fringilla a sed at suspendisse ut enim volutpat. Rhoncus vel est
              tellus quam porttitor. Mauris velit euismod elementum arcu neque
              facilisi. Amet semper tortor facilisis metus nibh. Rhoncus sit
              enim mattis odio in risus nunc.
            </p>
          </motion.div>

          {/* BUTTON */}
          <div className='relative mt-16'>
            <div className='before:absolute before:-bottom-20 before:right-40 before:z-[-1] before:content-sparkles'>
              <Button className='bg-yellow-300 text-black hover:bg-[#222831] hover:text-yellow-300'>
                Join Us Provider
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
