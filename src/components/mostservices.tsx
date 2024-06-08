// Define the services array
const services = [
  {
    category: "Home Services",
    image:
      "https://img.freepik.com/free-photo/front-view-woman-cleaning-home_23-2150453317.jpg?t=st=1717862634~exp=1717866234~hmac=305bd784e967369605f0ff61fe308b00151d792014914861aaa8ef59ff64c1d6&w=740",
    service: "House Cleaning",
  },
  {
    category: "Auto Services",
    image:
      "https://img.freepik.com/free-photo/close-up-car-care-washing_23-2149172897.jpg?t=st=1717862688~exp=1717866288~hmac=285077f568962406acd880172fbbfec2e97567282bb8d359d600ed66d5777f12&w=740",
    service: "Car Washing",
  },
  {
    category: "Moving/Delivery Services",
    image:
      "https://img.freepik.com/free-photo/courier-doing-jobs-logistics_23-2149229218.jpg?t=st=1717862728~exp=1717866328~hmac=503de95dccf1a375bf7b8539c0eb3813a6521eed69494c7e62cf33a8b2dc7ee7&w=740",
    service: "Local Moving",
  },
  {
    category: "Professional Services",
    image:
      "https://img.freepik.com/free-photo/businesspeople-working-finance-accounting-analyze-financi_74952-1411.jpg?t=st=1717862809~exp=1717866409~hmac=0dd952fe575a4ac34a6aae221c9208bd9192a773286b616104db55abc84b4b1b&w=740",
    service: "Accounting/Tax Preparation",
  },
];

// ServiceCard component
const ServiceCard = ({
  category,
  image,
  service,
}: {
  category: string;
  image: string;
  service: string;
}) => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg m-4'>
      <img className='w-full' src={image} alt={category} />
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{category}</div>
        <p className='text-gray-700 text-base'>{service}</p>
      </div>
    </div>
  );
};

// ServiceCards component
const ServiceCards = () => {
  return (
    <div className='flex flex-wrap justify-around'>
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          category={service.category}
          image={service.image}
          service={service.service}
        />
      ))}
    </div>
  );
};

export default ServiceCards;
