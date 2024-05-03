import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { CircleUserRound, LogOut } from "lucide-react";

const iconColor = "#222831";

const MobileNavLinks = () => {
  const { logout } = useAuth0();

  return (
    <>
      <Link
        to='/customer-profile'
        className='flex bg-white items-center text-[#5C3D2E] cursor-pointer hover:text-orange-500'
      >
        <CircleUserRound
          size={24}
          color={iconColor}
          style={{ marginRight: "8px" }}
        />
        Profile Settings
      </Link>

      <Link
        to='#'
        className='flex bg-white items-center text-[#5C3D2E] cursor-pointer hover:text-orange-500'
        onClick={() => logout()}
      >
        <LogOut size={24} color={iconColor} style={{ marginRight: "8px" }} />
        Log Out
      </Link>
    </>
  );
};

export default MobileNavLinks;
