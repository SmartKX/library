let skx = require('./index.js');

console.log(skx.network);

let a = 
skx.getBalance().then(r => console.log('Balances\n' + JSON.stringify(r)));
skx.proxy.getContracts(0).then(r => console.log('Contract Addresses (' + r.length + ')\n' + JSON.stringify(r)));

skx.encrypt('foobar').then(r => console.log('Encrypt\n' + JSON.stringify(r)));
skx.encrypt('foobar').then(r => skx.decrypt(r)).then(r => console.log(r));