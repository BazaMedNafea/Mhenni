import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import UsernameMenu from "./UsernameMenu";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const iconColor = "#222831";

  const handleLogin = () => {
    // Store returnTo in local storage before redirecting to login
    localStorage.setItem("returnTo", window.location.pathname);
    // Redirect to login page
    loginWithRedirect();
  };

  return (
    <nav className="flex justify-between items-center">
      <ul className="flex justify-center space-x-8">
        <li>
          <Link
            to="/"
            className="text-[#222831] cursor-pointer hover:text-[#F3CF00]"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/categories"
            className="text-[#222831] cursor-pointer hover:text-[#F3CF00]"
          >
            Categories
          </Link>
        </li>
        <li>
          <Link
            to="/about-us"
            className="text-[#222831] cursor-pointer hover:text-[#F3CF00]"
          >
            About Us
          </Link>
        </li>
        {/* Add a link to the search page */}
        <li>
          <Link
            to="/search"
            className="text-[#222831] cursor-pointer hover:text-[#F3CF00]"
          >
            Search
          </Link>
        </li>
      </ul>
      <ul className="flex space-x-4">
        <li>
          {isAuthenticated ? (
            <UsernameMenu />
          ) : (
            <button
              className="flex items-center text-[#222831] cursor-pointer hover:text-[#F3CF00] ml-4"
              onClick={handleLogin}
            >
              <User size={24} color={iconColor} />
              <span className="ml-2">Log In</span>
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;
