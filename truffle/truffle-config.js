const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require('fs');
// information in secret files
const mnemonic = fs.readFileSync(".secret").toString().trim();
const secret_rpc = fs.readFileSync(".secretrpc").toString().trim();

module.exports = {
  networks: {
    // development: {
    //  host: "127.0.0.1",
    //  port: 7545,
    //  network_id: "*"
    // },
    // rinkeby: {
    //     provider: function() { 
    //      return new HDWalletProvider(mnemonic, "...");
    //     },
    //     network_id: 4,
    //     gas: 4500000,
    //     gasPrice: 10000000000,
    // },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, secret_rpc),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
   },
  compilers: {
    solc: {
      version: "0.8.9",
      settings: {
       optimizer: {
         enabled: false,
         runs: 200
       }
      }
    }
  }
};
