function skx () {

	// Config Files / Contract Locations & ABI
	const acct = require('./accounts.json');
	const config = require('./config.json');
	const contracts = require('./inc/contracts.json');

	const Web3 = require('web3');
	let web3 = new Web3(new Web3.providers.HttpProvider(config.rpcUrls[config.network]));

	const ethcrypto = require('eth-crypto');

	let privKey = acct[config.network][0].privateKey; // stored in accounts.json
	let pubKey = ethcrypto.publicKeyByPrivateKey(privKey); // derived from private key, not stored in accounts.json
	let pubAddr = ethcrypto.publicKey.toAddress(pubKey); // derived from public key, not stored in accounts.json

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
					reject(error)
				}
			});
		});
	};

	function encrypt (msg) {
		return ethcrypto.encryptWithPublicKey(pubKey, msg);
	};

	function decrypt (encryptedMsg, compressed = false) {
		if (compressed == true) {
			return ethcrypto.cipher.parse(encryptedMsg)
				.then((r) => {
					ethcrypto.decryptWithPrivateKey(privKey,r);
				});
		} else {
			return ethcrypto.decryptWithPrivateKey(privKey,encryptedMsg);
		}
	};

	return {
		"privKey": privKey, 					// String
		"pubKey": pubKey,							// String
		"pubAddr": pubAddr, 					// String
		"contracts": contracts, 			// Object
		"config": config,				 			// Object
		"acct": acct,									// Object
		"network": config.network,		// String
		"proxy": {
			"addr": contracts[config.network].proxy.address,	// String
			"abi": contracts[config.network].proxy.abi,				// Object
			"getContracts": getContracts											// Function
		},
		"household": [
			{
				"addr": contracts[config.network].proxy.address,	// String
				"abi": contracts[config.network].proxy.abi,				// Object
				"getContracts": getContracts											// Function
			}
		]
		"getBalance": getBalance,			// Function
		"encrypt": encrypt,						// Function
		"decrypt": decrypt						// Function
	}

};

module.exports = skx();