import React from "react";
import ConnectButton from "@/components/ConnectButton";
import ConnectButtonMetamask from "./ConnectButtonMetamask";
import { useAuth } from "@/contexts/auth";

function Header() {
  const { loggedInWith } = useAuth();
  return (
    <header className="bg-gray-100 w-full p-4 text-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-lg text-gray-500">
            FluidFunding - Perpetual Public Funding Protocol
          </div>
          <div className="flex">
            {loggedInWith == "safe" ||
              (loggedInWith == "" && <ConnectButton />)}
            <div style={{ marginRight: "8px" }}></div>
            {<ConnectButtonMetamask />}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
