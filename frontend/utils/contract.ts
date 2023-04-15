import type { Signer } from '@ethersproject/abstract-signer';
import type { Provider } from '@ethersproject/providers';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { providers } from 'ethers';

export const getContract = (abi: any, address: string, signer?: Signer | Provider) => {
    const signerOrProvider = signer ?
        signer?.constructor.name === 'StaticJsonRpcProvider' ?
            signer :
            new providers.Web3Provider((signer) as any)?.getSigner?.() :
        new StaticJsonRpcProvider('https://goerli.infura.io/v3/523f349175754736998911b8e4e3b3ff');;
    const contract = new Contract(address, abi, signerOrProvider);
    return contract;
};