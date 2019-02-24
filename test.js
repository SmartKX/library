const skx = require('./index.js');
const chalk = require ('chalk');

function log(title, msg) {
	console.log(`${chalk.green(title)}\n${typeof msg} ${JSON.stringify(msg, null, 2)}\n`);
}

// Show Balance
skx.getBalance().then(r => log('Balances', r));

// Get contract addresses from AppId 0
skx.proxy.getContracts(0).then(r => log(`Contract Addresses (${r.length})`, r));

// Encrypt "foobar"
skx.encrypt('foobar').then(r => log('Encrypt', r));

// Encrypt, then decrypt "foobar", round trip
skx.encrypt('foobar').then(r => skx.decrypt(r)).then(r => log('Round trip encrypt, decrypt', r));
