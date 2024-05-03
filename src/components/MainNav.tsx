import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import UsernameMenu from "./UsernameMenu";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const iconColor = "#222831";

  return (
    <nav className='flex justify-between items-center'>
      <ul className='flex justify-between flex-grow'>
        <li>
          <Button
            variant='ghost'
            className='text-[#222831] cursor-pointer hover:text-[#F3CF00]'
          >
            Home
          </Button>
        </li>
        <li>
          <Button
            variant='ghost'
            className='text-[#222831] cursor-pointer hover:text-[#F3CF00]'
          >
            Categories
          </Button>
        </li>
        <li>
          <Button
            variant='ghost'
            className='text-[#222831] cursor-pointer hover:text-[#F3CF00]'
          >
            About Us
          </Button>
        </li>
      </ul>
      <ul className='flex justify-end space-x-4'>
        <li>
          <span>
            {isAuthenticated ? (
              <UsernameMenu />
            ) : (
              <Button
                variant='ghost'
                className='text-[#222831] cursor-pointer hover:text-[#F3CF00]'
                onClick={async () => await loginWithRedirect()}
              >
                <LogIn size={24} color={iconColor} /> Log In
              </Button>
            )}
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;
