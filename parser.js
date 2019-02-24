let r = [
	'4',
	'5',
	'$298,101.00',
	'$97,174.00',
	'$2,507,854.00',
	'$1,456,874.00',
	'$1,764,753.00',
	'$6,124,756.00',
	'$1,124,756.00',
	'$2,000,000.00',
	'$2,000,000.00',
	'$1,000,000.00',
	'$4,499.02',
	'$12,000.00',
	'$16,000.00',
	'$10,000.00',
	'$42,499.02',
	'4.87%',
	'1.59%',
	'40.95%',
	'23.79%',
	'28.81%',
	'$2,068.49',
	'$674.28',
	'$17,401.73',
	'$10,109.09',
	'$12,245.43'
]

console.log(r.length);

let v = {}

v.numRates = r.shift();
v.numAccounts = r.shift();

v.accounts = [];
for (i = 0; i < v.numAccounts; i++) {
	v.accounts[i] = r.shift();
}

v.accountsTotal = r.shift();

v.breaks = [];
for (i = 0; i < v.numRates; i++) {
	v.breaks[i] = r.shift();
}

v.breakFees = [];
for (i = 0; i < v.numRates; i++) {
	v.breakFees[i] = r.shift();
}

v.feeTotal = r.shift();

v.accountWeight = [];
for (i = 0; i < v.numAccounts; i++) {
	v.accountWeight[i] = r.shift();
}

v.accountFees = [];
for (i = 0; i < v.numAccounts; i++) {
	v.accountFees[i] = r.shift();
}

console.log(JSON.stringify(v, null, 2));
console.log(r.length);