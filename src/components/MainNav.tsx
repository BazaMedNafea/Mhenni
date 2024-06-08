import { Link } from "react-router-dom";
import { User, Home, Info } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import UsernameMenu from "./UsernameMenu";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const iconColor = "#222831";

  const handleLogin = () => {
    localStorage.setItem("returnTo", window.location.pathname);
    loginWithRedirect();
  };

  const menuItems = [
    { name: "Homepage", path: "/", icon: <Home size={24} color={iconColor} /> },

    {
      name: "About Us",
      path: "/about-us",
      icon: <Info size={24} color={iconColor} />,
    },
  ];

  return (
    <nav className='flex justify-between items-center'>
      <ul className='flex justify-center space-x-8'>
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className='flex items-center text-[#222831] cursor-pointer text-lg'
            >
              {item.icon}
              <span className='ml-2'>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className='flex space-x-4'>
        <li>
          {isAuthenticated ? (
            <UsernameMenu />
          ) : (
            <button
              className='flex items-center text-[#222831] cursor-pointer ml-4'
              onClick={handleLogin}
            >
              <User size={24} color={iconColor} />
              <span className='ml-2'>Log In</span>
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;
