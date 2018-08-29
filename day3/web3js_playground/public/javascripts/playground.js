const web3 = new Web3('ws://localhost:7545');
const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "val",
        "type": "uint256"
      }
    ],
    "name": "add",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "increment",
        "type": "uint256"
      }
    ],
    "name": "Incremented",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "read",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]
const address = '0x4bb2490749a3701c8a6608abd969c6954a71602c'
let contract

function initContract () {
  contract = new web3.eth.Contract(abi, address)
}

function getContract () {
  if (!contract) initContract();
  return contract;
}

function getAccounts() {
  web3.eth.getAccounts()
      .then(function (accounts) {
        console.log('All accounts:', accounts)
      }
}
