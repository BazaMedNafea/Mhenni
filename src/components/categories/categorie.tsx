type Props = {
  name: string;
  description?: string;
  image: string;
};

const Categorie = ({ name, description, image }: Props) => {
  const overlayStyles = `p-5 absolute z-30 flex
    h-[380px] w-[450px] flex-col items-center justify-center
    whitespace-normal bg-primary-500 text-center text-white
    opacity-0 transition duration-500 hover:opacity-90`;

  return (
    <li className='relative mx-5 inline-block h-[380px] w-[450px]'>
      <div className={overlayStyles} style={{ backgroundColor: "#222831" }}>
        <p className='text-2xl text-white'>{name}</p>
        {description && <p className='mt-5 text-white'>{description}</p>}
      </div>
      <img alt={`${image}`} src={image} />
    </li>
  );
};

export default Categorie;
