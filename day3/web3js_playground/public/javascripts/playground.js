const web3 = new Web3(Web3.givenProvider || 'ws://localhost:7545');
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
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
const address = '0x0713fd4376fdfa595aec2133285418a39fde9fee'
let contract

function initContract () {
  contract = new web3.eth.Contract(abi, address)
}

function getContract () {
  if (!contract) initContract();
  return contract;
}

function getAccounts () {
  web3.eth.getAccounts()
    .then(function (accounts) {
      console.log('All accounts:', accounts)
    })
}

function sendTransaction () {
  web3.eth.sendTransaction({
    from: '0x18941DaACEcAd987eB790e374067B3582e3D7958',
    to: '0x12C9e2595719105dbDF2Ab713054Dd6E6bB1550a',
    value: '1000000000000000'
  })
    .once('transactionHash', function (hash) {
      console.log('transactionHash:' + hash)
    })
    .once('receipt', function (receipt) {
      console.log('receipt:', receipt)
    })
    .on('confirmation', function (confirmationNumber, receipt) {
      console.log('confirmation number:' + confirmationNumber)
      console.log('receipt:', receipt)
    })
    .on('error', console.error) // If a out of gas error, the second parameter is the receipt.
    .then(function (receipt) {
      console.log('Finished:', receipt)
      getBalance('0x18941DaACEcAd987eB790e374067B3582e3D7958')
      getBalance('0x12C9e2595719105dbDF2Ab713054Dd6E6bB1550a')
    });
}

function getBalance (address) {
  web3.eth.getBalance(address)
    .then(console.log)
}

function contractCall () {
  var contract = getContract()
  contract.methods.read().call()
    .then(function (res) {
      console.log('Result:', res)
    })
}

function contractSend (value) {
  var contract = getContract()

  web3.eth.getAccounts()
    .then(function (accounts) {
      const myAccount = accounts[0]
      contract.methods.add(value).send({ from: myAccount })
        .once('transactionHash', function (hash) {
          console.log('transactionHash:' + hash)
        })
        .once('receipt', function (receipt) {
          console.log('receipt:', receipt)
        })
        // .on('confirmation', function (confirmationNumber, receipt) {
        //   console.log('confirmation number:' + confirmationNumber)
        //   console.log('receipt:', receipt)
        // })
        .on('error', console.error)
        .then(function (res) {
          console.log('Result:', res)
          console.log('Event Incremented value by: ', res.events.Incremented.returnValues.increment)
        })
    })
}

// For this method to work you need to remove "Web3.givenProvider ||" from first line
function litenEvents () {
  var contract = getContract()

  contract.events.Incremented(null, function (error, result) {
    if (error) console.error(error)
    console.log('Event result', result)
  })
    .on('data', function (event) {
      console.log('Event result DATA', event); // same results as the optional callback above
    })
    .on('changed', function (event) {
      // remove event from local database
    })
    .on('error', console.error);
}