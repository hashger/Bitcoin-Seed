const secureRandom = require('secure-random');
const bip39 = require('bip39');
const hdkey = require('hdkey');
const ripemd160 = require('ripemd160');
const sha256 = require('js-sha256');
const bitcoin = require("bitcoinjs-lib")

const SEED = bip39.generateMnemonic(256, secureRandom.randomBuffer, bip39.wordlists.english); //generates string
console.log(SEED);
const seed = bip39.mnemonicToSeedSync(SEED);
const root = hdkey.fromMasterSeed(seed);
const masterPrivateKey = root.privateKey.toString('hex');
console.log('XPRV', root.privateExtendedKey, 'XPUB', root.publicExtendedKey, 'MPK:', masterPrivateKey, 'RPK: ', root.publicKey.toString('hex'));
const addrNode = root.derive("m/84'/0'/0'/0/0"); // p2wpkh: Electrum derivation path for address 0
// const addrNode = root.derive("m/84'/0'/0'/1/0"); // p2wpkh: Electrum derivation path for change address 0
// const addrNode = root.derive("m/44'/0'/0'/0/0"); // p2pkh: Electrum derivation path for address 0
// const addrNode = root.derive("m/44'/0'/0'/1/0"); // p2pkh: Electrum derivation path for change address 0

console.log('Nueva direccion PKEY %s y PubKey %s', addrNode.privateKey.toString('hex'), addrNode.publicKey.toString('hex'))
// Pay to witness public key hash (bech32, witness bitcoin address)
const bech32addr = bitcoin.payments.p2wpkh({ pubkey: addrNode.publicKey, network: bitcoin.networks.bitcoin }).address;
console.log(bech32addr);
// Pay to public key hash (default bitcoin address)
const base58addr = bitcoin.payments.p2pkh({ pubkey: addrNode.publicKey, network: bitcoin.networks.bitcoin }).address;
console.log(base58addr);