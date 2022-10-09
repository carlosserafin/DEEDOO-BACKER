import CollectionConfigInterface from '../lib/CollectionConfigInterface';
import * as Networks from '../lib/Networks';
import * as Marketplaces from '../lib/Marketplaces';
import whitelistAddresses from './whitelist.json';

const CollectionConfig: CollectionConfigInterface = {
  testnet: Networks.polygonTestnet,
  mainnet: Networks.polygonMainnet,
  // The contract name can be updated using the following command:
  // yarn rename-contract NEW_CONTRACT_NAME
  // Please DO NOT change it manually!
  contractName: 'DeeDooBackerTest02',
  tokenName: 'DEEDOO BACKER Test 02',
  tokenSymbol: 'DEEDOOB2',
  hiddenMetadataUri: 'ipfs://QmdBPHnW8FyWjPDaNW3rm6iJ73bzxMSjTFqi5RqFHYQSpc/hidden.json',
  maxSupply: 1000000,
  whitelistSale: {
    price: 0.0,
    maxMintAmountPerTx: 1,
  },
  preSale: {
    price: 0.0,
    maxMintAmountPerTx: 1,
  },
  publicSale: {
    price: 0.0,
    maxMintAmountPerTx: 1,
  },
  contractAddress: '0xa1e4AEd633615128e39E5B6675E1C53FD6cb3070',
  marketplaceIdentifier: 'DEEDOOBackerTest02',
  marketplaceConfig: Marketplaces.openSea,
  whitelistAddresses,
};

export default CollectionConfig;
