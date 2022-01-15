## Arcanar Project - NFTHack 2022 - ERC1155 & Fractionalization

Arcanar is a decentralized application that aims to solve a big problem for project owners. Monetizing your project & raising money has been one of the hardest things a founder has to do. Takes all energy and focus. By turning their projects into NFTs, founders can monetize them very fast & also help other people to buy/sell their NFTs so they can profit as well.
Fractionalization will help people invest into an NFT/Project by putting as much money as they want for a share portion.

#### OpenSea collection testing preview: https://testnets.opensea.io/collection/unidentified-contract-elhudsnflb

### Some info for file structure
```bash
> public
> src
> truffle
package-lock.json
package.json
```

Public has all the assets (most of them)
src is the client side code (ReactJS project)
truffle folder has all the blockchain/backend related code
Solidity contracts, migrations configs etc

### Start the project
Install all dependencies first
```bash
npm install
```

### Edit config file
To make it work you need RPC URL to interact with blockchain
and you also need your metamask's seed phrase
You need to go in the truffle folder
```bash
and edit the truffle-config.js file
```
```bash
use the .secret & .secretrpc files
and simple paste there your seed phrase (.secret)
and simple paste the rpc url (.secretrpc)
```
### Ready to go
Once you edit the truffle-config.js file
Now you can start the development server
```bash
npm start
```
