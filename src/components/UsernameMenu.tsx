import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth0, LogoutOptions } from "@auth0/auth0-react"; // Import LogoutOptions
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useGetMyUser } from "@/api/MyUserApi";
import { UserType } from "../types";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();
  const { currentUser } = useGetMyUser();

  const isProvider = currentUser?.type === UserType.Provider;
  const isCustomer = currentUser?.type === UserType.Customer;

  const handleLogout = () => {
    logout({ returnTo: window.location.origin } as LogoutOptions); // Cast options to LogoutOptions
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-yellow-500 gap-2">
        <CircleUserRound className="text-yellow-500" />
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isProvider && (
          <DropdownMenuItem>
            <Link
              to="/manage-requests-provider"
              className="font-bold hover:text-yellow-500"
            >
              Manage Requests
            </Link>
          </DropdownMenuItem>
        )}
        {isProvider && (
          <DropdownMenuItem>
            <Link
              to="/manage-services"
              className="font-bold hover:text-yellow-500"
            >
              Manage Services
            </Link>
          </DropdownMenuItem>
        )}
        {isCustomer && (
          <DropdownMenuItem>
            <Link
              to="/manage-requests-customer"
              className="font-bold hover:text-yellow-500"
            >
              Manage Requests
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Link to="/profile" className="font-bold hover:text-yellow-500">
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={handleLogout}
            className="flex flex-1 font-bold bg-yellow-500"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
