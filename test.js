let skx = require('./index.js');

console.log(skx.network);
skx.getBalance().then(r => console.log(r));
skx.proxy.getContracts(0).then(r => console.log(r));