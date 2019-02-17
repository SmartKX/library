const Web3 = require('web3');
const EthCrypto = require('eth-crypto');

const acct = require('./accounts.json');
const config = require('./config.json');
const contracts = require('./inc/contracts.json');

var web3 = new Web3(new Web3.providers.HttpProvider(config.rpcUrls[config.network]));

let privKey = acct[config.network][0].privateKey;
let pubAddr = acct[config.network][0].publicAddr;

web3.eth.getBalance(pubAddr, function (error, result) {
	if (!error) {
		console.log('Ether:', web3.utils.fromWei(result,'ether')); // Show the ether balance after converting it from Wei
		console.log('Wei:', result); // Show the ether balance after converting it from Wei
	} else {
		console.log('Huston we have a promblem: ', error); // Should dump errors here
	}
});

let proxy = new web3.eth.Contract(abi[config.network].proxy, );

proxy.

// need public key, can't do this with public address
//let x = EthCrypto.encryptWithPublicKey(pubAddr,'foobar');
