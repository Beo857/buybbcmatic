```javascript
// Import web3
const Web3 = require('web3');

// Create web3 instance with MetaMask provider
const web3 = new Web3(Web3.givenProvider);

// Load ABIs
const auctionAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "addr",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "commitment",
        "type": "uint256"
      }
    ],
    "name": "AddedCommitment",
    "type": "event"
  },
  // ... (Rest of your Auction ABI provided earlier)
];

const erc20Abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  // ... (Rest of your ERC20 ABI provided earlier)
];

const sushiSwapAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "token0",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "token1",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "pair",
        "type": "address"
      },
    ],
    "name": "PairCreated",
    "type": "event"
  },
  // ... (Rest of your SushiSwapFactory ABI provided earlier)
];

const sushiSwapPairAbi = [
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  // ... (Rest of your SushiSwapPair ABI provided earlier)
];

const masterChefAbi = [
  {
    "inputs": [
      {
        "internalType": "contract SushiwapToken",
        "name": "_sushi",
        "type": "address"
      },
      {
        "internalType": "contract SushiSwap_dev",
        "name": "_dev_addr",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_sushi_per_block",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_start_block",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  // ... (Rest of your MasterChef ABI provided earlier)
];

// Contract addresses
const maticAddress = '0x...'; // Replace with the correct MATIC address
const sushiSwapAddress = '0x...'; // Replace with the correct SushiSwapFactory address
const masterChefAddress = '0x...'; // Replace with the correct MasterChef address
const poolId = 0; // Replace with the correct pool ID

async function buyBBC() {
  // ... (previous code)
}
```

