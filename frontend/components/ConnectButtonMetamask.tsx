import { APP_CONFIG } from "@/constants";
import { useAuth } from "@/contexts/auth";
import { Button } from "@chakra-ui/react";

function ConnectButtonMetamask() {
  const { address, isAuthLoading, loginWithMetamask, logout } = useAuth();

  return address ? (
    <Button colorScheme={APP_CONFIG.PRIMARY_COLOR} onClick={logout}>
      Logout: {address}
    </Button>
  ) : (
    <Button colorScheme={APP_CONFIG.PRIMARY_COLOR} onClick={loginWithMetamask}>
      Login Metamask
    </Button>
  );
}

export default ConnectButtonMetamask;
