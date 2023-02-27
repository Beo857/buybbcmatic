const Web3 = require('web3');
const web3 = new Web3('https://polygon-mainnet.infura.io/v3/4e6d43c3b02a4147b7c8b24c4e0796d0');


async function buyBBC() {
  const auctionAddress = '0xDCD1AeDB97b40e5234C8a7AEefE37dE79A88D1b3';
  const tokenAddress = '0xEe8fA06C8354F0e27f3112509843d0E3104b4BaE';
  const amountEth = document.getElementById('ethAmount').value;

  // Check if MetaMask is installed
  if (typeof window.ethereum === 'undefined') {
    alert('Please install MetaMask to use this dApp');
    return;
  }

  // Request account access
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  // Get contract instances
  const auctionContract = new web3.eth.Contract(auctionAbi, auctionAddress);
  const tokenContract = new web3.eth.Contract(erc20Abi, tokenAddress);

  // Convert ETH to Wei
  const weiAmount = web3.utils.toWei(amountEth, 'ether');

  // Approve spending of BBC tokens
  const approveTx = await tokenContract.methods.approve(auctionAddress, weiAmount).send({ from: account });
  console.log('Approved spending of BBC tokens: ', approveTx.transactionHash);

  // Buy BBC tokens from the auction
  const buyTx = await auctionContract.methods.buy(weiAmount).send({ from: account, value: weiAmount });
  console.log('Bought BBC tokens from the auction: ', buyTx.transactionHash);

  // Add liquidity to the BBC-MATIC pool
  const bbcBalance = await tokenContract.methods.balanceOf(account).call();
  const maticBalance = await web3.eth.getBalance(account);

  const sushiSwapContract = new web3.eth.Contract(sushiSwapAbi, sushiSwapAddress);
  const pairAddress = await sushiSwapContract.methods.getPair(tokenAddress, maticAddress).call();
  const pairContract = new web3.eth.Contract(sushiSwapPairAbi, pairAddress);

  const addLiquidityTx = await pairContract.methods.addLiquidity(tokenAddress, maticAddress, bbcBalance, maticBalance, 0, 0, account, Math.floor(Date.now() / 1000) + 60 * 10).send({ from: account });
  console.log('Added liquidity to the BBC-MATIC pool: ', addLiquidityTx.transactionHash);

  // Provide staking rewards
  const stakingContract = new web3.eth.Contract(stakingAbi, stakingAddress);

  const stakeTx = await stakingContract.methods.stake(pairAddress, addLiquidityTx.events.Mint.returnValues.amount0, addLiquidityTx.events.Mint.returnValues.amount1).send({ from: account });
  console.log('Staked LP tokens: ', stakeTx.transactionHash);

  alert('Success! Bought BBC tokens and added liquidity to the BBC-MATIC pool.');
}

async function swapLpTokens() {
  const amountTokens = document.getElementById('lpTokenAmount').value;

  // Check if MetaMask is installed
  if (typeof window.ethereum === 'undefined') {
    alert('Please install MetaMask to use this dApp');
    return;
  }

  // Request account access
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  // Get contract instances
  const sushiSwapContract = new web3.eth.Contract(sushiSwapAbi, sushiSwapAddress);
const pairAddress = await sushiSwapContract.methods.getPair(tokenAddress, maticAddress).call();
const pairContract = new web3.eth.Contract(sushiSwapPairAbi, pairAddress);

// Check the balance of the LP tokens
const lpBalance = await pairContract.methods.balanceOf(account).call();

// Approve spending of LP tokens
const approveTx = await pairContract.methods.approve(sushiSwapAddress, lpBalance).send({ from: account });
console.log('Approved spending of LP tokens: ', approveTx.transactionHash);

// Swap LP tokens for MATIC
const maticOutput = await sushiSwapContract.methods.getAmountsOut(lpBalance, [pairAddress, maticAddress]).call();
const minMaticOutput = maticOutput[1] - (maticOutput[1] * 10 / 100); // Set minimum output as 90% of expected output

const swapTx = await sushiSwapContract.methods.swapExactTokensForTokens(lpBalance, minMaticOutput, [pairAddress, maticAddress], account, Math.floor(Date.now() / 1000) + 60 * 10).send({ from: account });
console.log('Swapped LP tokens for MATIC: ', swapTx.transactionHash);

// Provide staking rewards
const stakingContract = new web3.eth.Contract(stakingAbi, stakingAddress);

const stakeTx = await stakingContract.methods.stake(maticAddress, swapTx.events.Swap.returnValues.amountOut).send({ from: account });
console.log('Staked MATIC: ', stakeTx.transactionHash);

alert('Success! Swapped LP tokens for MATIC and staked in the MATIC pool.');
}