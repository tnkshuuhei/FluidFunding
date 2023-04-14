import React, { ReactNode, useEffect, useState } from 'react';
import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
  WALLET_ADAPTERS,
} from '@web3auth/base';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { Web3AuthOptions } from '@web3auth/modal';
import {
  SafeAuthKit,
  SafeAuthSignInData,
  Web3AuthAdapter,
  Web3AuthEventListener,
} from '@safe-global/auth-kit';

interface AuthContextInterface {
  provider: any;
  address: string;
  login: () => void;
  logout: () => void;
  isAuthLoading: boolean;
}

const connectedHandler: Web3AuthEventListener = (data) =>
  console.log('CONNECTED', data);
const disconnectedHandler: Web3AuthEventListener = (data) =>
  console.log('DISCONNECTED', data);

const getPrefix = (chainId: string) => {
  switch (chainId) {
    case '0x1':
      return 'eth';
    case '0x5':
      return 'gor';
    case '0x100':
      return 'gno';
    case '0x137':
      return 'matic';
    default:
      return 'eth';
  }
};

const AuthContext = React.createContext<AuthContextInterface>({
  provider: null,
  address: '',
  login: () => {},
  logout: () => {},
  isAuthLoading: false,
});

const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [safeAuthSignInResponse, setSafeAuthSignInResponse] =
    useState<SafeAuthSignInData | null>(null);
  const [safeAuth, setSafeAuth] = useState<SafeAuthKit<Web3AuthAdapter>>();
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsAuthLoading(true);
      const options: Web3AuthOptions = {
        clientId:
          'BNJfOv4__jRRp4Iu3ncOLeVUN4YvtnTbtY0NpfHdB9Cqfd1TdWl5WJ1VTrRAijoj0WBYFcTmoxeWQ4NP9ZmpUBw',
        web3AuthNetwork: 'testnet',
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: '0x1',
          // rpcTarget: `https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_KEY}`
        },
        uiConfig: {
          theme: 'dark',
          loginMethodsOrder: ['google', 'facebook'],
        },
      };

      const modalConfig = {
        [WALLET_ADAPTERS.TORUS_EVM]: {
          label: 'torus',
          showOnModal: false,
        },
        [WALLET_ADAPTERS.METAMASK]: {
          label: 'metamask',
          showOnDesktop: true,
          showOnMobile: false,
        },
      };

      const openloginAdapter = new OpenloginAdapter({
        loginSettings: {
          mfaLevel: 'mandatory',
        },
        adapterSettings: {
          uxMode: 'popup',
          whiteLabel: {
            name: 'Safe',
          },
        },
      });

      const adapter = new Web3AuthAdapter(
        options,
        [openloginAdapter],
        modalConfig
      );

      const safeAuthKit = await SafeAuthKit.init(adapter, {
        txServiceUrl: 'https://safe-transaction-goerli.safe.global',
      });

      safeAuthKit.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler);

      safeAuthKit.subscribe(ADAPTER_EVENTS.DISCONNECTED, disconnectedHandler);

      setSafeAuth(safeAuthKit);
      setIsAuthLoading(false);

      return () => {
        safeAuthKit.unsubscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler);
        safeAuthKit.unsubscribe(
          ADAPTER_EVENTS.DISCONNECTED,
          disconnectedHandler
        );
      };
    })();
  }, []);

  const login = async () => {
    if (!safeAuth) return;

    setIsAuthLoading(true);
    try {
      const response = await safeAuth.signIn();
      console.log('SIGN IN RESPONSE: ', response);

      setSafeAuthSignInResponse(response);
      setProvider(safeAuth.getProvider() as SafeEventEmitterProvider);
    } catch (error: any) {
      console.log('ERROR: auth: ', error.message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = async () => {
    if (!safeAuth) return;

    await safeAuth.signOut();

    setProvider(null);
    setSafeAuthSignInResponse(null);
  };

  return (
    <AuthContext.Provider
      value={{
        address: safeAuthSignInResponse?.eoa || '',
        provider,
        login,
        logout,
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextInterface => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
