import {
  Menu,
  CircleUserRound,
  LogIn,
  Home,
  List,
  Phone,
  UserPlus,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";
import { Link } from "react-router-dom";

const iconColor = "#222831";

const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='text-[#5C3D2E]' />
      </SheetTrigger>
      <SheetContent className='flex flex-col items-center justify-center space-y-3 bg-gray-100 p-8'>
        <SheetTitle className='text-center text-2xl text-gray-800 mb-4'>
          {isAuthenticated ? (
            <span className='flex items-center font-bold gap-2'>
              <CircleUserRound className='text-orange-500' />
              {user?.email}
            </span>
          ) : (
            <span> Welcome to Mhenni.com</span>
          )}
        </SheetTitle>
        <SheetDescription className='flex flex-col gap-4 text-lg'>
          <Link
            to='/'
            className='text-[#5C3D2E] cursor-pointer hover:text-orange-700 flex items-center'
          >
            <Home size={24} color={iconColor} />{" "}
            <span style={{ marginLeft: "0.5rem" }}>Home</span>
          </Link>
          <span className='text-[#5C3D2E] cursor-pointer hover:text-orange-700 flex items-center'>
            <List size={24} color={iconColor} />{" "}
            <span style={{ marginLeft: "0.5rem" }}>Our Categories</span>
          </span>
          <span className='text-[#5C3D2E] cursor-pointer hover:text-orange-700 flex items-center'>
            <Phone size={24} color={iconColor} />{" "}
            <span style={{ marginLeft: "0.5rem" }}>Contact Us</span>
          </span>
          <span className='text-[#5C3D2E] cursor-pointer hover:text-orange-700 flex items-center'>
            <UserPlus size={24} color={iconColor} />{" "}
            <span style={{ marginLeft: "0.5rem" }}>Join Us Provider</span>
          </span>
          {!isAuthenticated && (
            <Link
              to='/'
              className='text-[#5C3D2E] cursor-pointer hover:text-orange-700 flex items-center'
              onClick={async () => await loginWithRedirect()}
            >
              <LogIn size={24} color={iconColor} />{" "}
              <span style={{ marginLeft: "0.5rem" }}>Log In</span>
            </Link>
          )}
          {isAuthenticated && <MobileNavLinks />}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
