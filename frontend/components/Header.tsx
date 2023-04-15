import React from "react";
import ConnectButton from "@/components/ConnectButton";

function Header() {
  return (
    <header className="bg-gray-300 w-full p-4 text-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-lg text-gray-500">Logo</div>
          <div className="flex">
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
