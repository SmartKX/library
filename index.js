function skx () {
	const Web3 = require('web3');
	const EthCrypto = require('eth-crypto');

	// Config Files / Contract Locations & ABI
	const acct = require('./accounts.json');
	const config = require('./config.json');
	const contracts = require('./inc/contracts.json');

	var web3 = new Web3(new Web3.providers.HttpProvider(config.rpcUrls[config.network]));

	let privKey = acct[config.network][0].privateKey;
	let pubAddr = acct[config.network][0].publicAddr;

	let proxy = new web3.eth.Contract(contracts[config.network].proxy.abi, contracts[config.network].proxy.address);

	function getBalance () {
		return new Promise((resolve, reject) => {
			web3.eth.getBalance(pubAddr, function (error, result) {
				if (!error) {
					resolve({
						ether: web3.utils.fromWei(result,'ether'),
						wei: result
					});
				} else {
					console.log('Error: ', error); // Should dump errors here
					reject(error);
				}
			});
		});
	};

	function getContracts (_appId) {
		return new Promise((resolve, reject) => {
	    proxy.methods.getContracts(_appId, pubAddr).call({from: pubAddr}, (error, result) => {
				if (!error) {
				  resolve(result);
				} else {
					console.log('Error: ', error); // Should dump errors here
					reject(error)
				}
			});
		});
	};

	return {
		"privKey": privKey,
		"pubAddr": pubAddr,
		"contracts": contracts,
		"config": config,
		"acct": acct,
		"network": config.network,
		"proxy": {
			"addr": contracts[config.network].proxy.address,
			"abi": contracts[config.network].proxy.abi,
			"getContracts": getContracts
		},
		"getBalance": getBalance
	}

};

module.exports = skx();