import { APP_CONFIG } from "@/constants";
import { useAuth } from "@/contexts/auth";
import { Button } from "@chakra-ui/react";

function ConnectButton() {
  const { address, isAuthLoading, login, logout } = useAuth();

  return address ? (
    <Button
      colorScheme={APP_CONFIG.PRIMARY_COLOR}
      isLoading={isAuthLoading}
      onClick={logout}
    >
      Logout: {address}
    </Button>
  ) : (
    <Button
      colorScheme={APP_CONFIG.PRIMARY_COLOR}
      isLoading={isAuthLoading}
      onClick={login}
    >
      Login With Safe
    </Button>
  );
}

export default ConnectButton;
