import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Header = () => {
  return (
    <div className='border-b-2 border-b-[#222831] py-6 '>
      <div className='container mx-auto flex justify-between items-center '>
        Mhenni
        <div className='md:hidden'>
          <MobileNav />
        </div>
        <div className='hidden md:block'>
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
