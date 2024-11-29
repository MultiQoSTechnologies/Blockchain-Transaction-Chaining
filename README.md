# Blockchain Transaction Chaining

This project demonstrates an Ethereum blockchain transaction application using Angular and Web3.js. The application allows users to:
- Connect their Ethereum wallet
- Perform Ethereum transactions (send ETH to another address)
- View a visual representation of the blockchain chain with blocks, transaction details, and hashes.
- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.11.

## Features

- **Wallet Connection**: Connect to an Ethereum wallet (MetaMask or other Web3 providers).
- **Ethereum Transactions**: Send Ethereum (ETH) from the connected wallet to a recipient address.
- **Blockchain Chain Representation**: Display blockchain blocks in a chain format with each block containing transaction details such as transaction hash, sender (from), receiver (to), and value (ETH).

## Technology Stack

The following technologies were used in this project:

- **Angular**: A Frontend framework for building the user interface. Angular allows us to create dynamic web applications with a component-based architecture.
- **Web3.js**: A JavaScript library for interacting with the Ethereum blockchain. This library lets us send transactions, interact with smart contracts, and query blockchain data directly from the web.
- **SweetAlert2**: A Library for displaying beautiful and customizable alerts. It shows success and error notifications to the user.
- **RxJS**: A reactive programming library that enables us to manage asynchronous operations such as HTTP requests and events in a declarative manner.
- **MetaMask**: A browser extension that allows users to manage their Ethereum wallet and interact with decentralized applications (dApps) directly from the browser.
- **TypeScript**: A superset of JavaScript that provides optional static typing, enhancing code quality and maintainability.
- **Node.js**: JavaScript runtime for building scalable network applications. It’s used to run the development server and handle dependencies.
- **Ganache**: Personal blockchain for Ethereum development used for local testing. You can use Ganache to deploy contracts and test transactions on a local network.

## Prerequisites

Before you begin, ensure that you have the following installed:

1. **Node.js** (version 16.x or higher) - For running the Angular development server.
   - Download from [Node.js official website](https://nodejs.org/)

2. **Angular CLI** (Command Line Interface)
   - Install globally by running: 
     ```bash
     npm install -g @angular/cli
     ```

3. **MetaMask** browser extension - For connecting to the Ethereum blockchain.
   - Install from [MetaMask's website](https://metamask.io/).

4. **Ganache** - Local Ethereum blockchain for development.
   - Install from [Ganache's website](https://www.trufflesuite.com/ganache).

5. **Remix IDE** - For writing and deploying Solidity smart contracts (if you're working on custom contracts).
   - Access Remix at [Remix IDE](https://remix.ethereum.org/).

## Dependencies

This project relies on the following libraries:

- **@angular/core**: Provides the core functionalities for building Angular applications.
- **web3**: JavaScript library for interacting with the Ethereum blockchain, used for sending transactions and querying blockchain data.
- **@ensdomains/ensjs**: A library for interacting with the Ethereum Name Service (ENS), allowing users to resolve ENS names to Ethereum addresses.
- **sweetalert2**: A library for displaying beautiful, customizable alerts and notifications within the app.

These dependencies are essential for the proper functioning of the blockchain transaction Chaining, allowing interaction with the Ethereum blockchain, transaction management, and user-friendly notifications.

## Step-by-Step Guide

1. **Clone the Repository**

   Clone this repository to your local machine:

   ```bash
   git clone https://github.com/MultiQoSTechnologies/Blockchain-Transaction-Chaining.git
   cd Blockchain-Transaction-Chaining
   ```
2. **Install Dependencies**

   Run the following command to install all necessary dependencies:
   
   ```bash
    npm install
   ```
3. **Run Ganache**

   Open Ganache and start a new workspace. This will create a personal Ethereum blockchain that you can use for testing. Note the RPC URL (typically http://127.0.0.1:7545).

4. **Connect MetaMask to Ganache**

   Open MetaMask, and connect it to the Ganache local network using the RPC URL from step 5. Make sure you import one of the Ganache accounts with ETH to use for transactions.
   
5. **Write and Deploy Solidity Smart Contract (using Remix)**

   1. Open [Remix IDE](https://remix.ethereum.org/).
   2. Create a new Solidity file (e.g., TransactionContract.sol).
   3. Write your contract code.
   4. Compile the contract in Remix.
   5. Deploy the contract to the Ganache network:
       * In Remix, navigate to the "Deploy & Run Transactions" tab.
       * Choose "Injected Web3" as the environment (this will connect Remix to MetaMask).
       * Deploy the contract to Ganache (ensure your MetaMask is connected to the local Ganache network).
       * After deployment, note the contract address and ABI.
         
6. **Update the ABI and Contract Address in Angular**
   * After deploying the contract, you will receive the contract address (e.g., 0x123abc...).
   * Copy the ABI (Application Binary Interface) of the contract. You can find the ABI in the Remix IDE under the "Compilation Details" section.
   * In your Angular project, navigate to the file where you initialize the Web3.js connection (e.g., transection.component.ts or similar).
   * Add the contract address and ABI to your Web3 initialization code:
   ```bash
    const contractAddress = '0x123abc...';  // Replace with your deployed contract address
    const contractABI = [ /* ABI goes here */ ];

    this.web3 = new Web3(window.ethereum);
    this.contract = new this.web3.eth.Contract(contractABI, contractAddress);
   ```
7. **Run the Angular Development Server**

   Start the Angular development server by running the following command:
      ```bash
   ng serve
   ```
   This will start the server and open the application in your browser at http://localhost:4200.
   
9. **Interact with the Application**

  * Connect your MetaMask wallet by clicking the "Connect Wallet" button in the UI.
  * Once connected, you can view your wallet address and balance.
  * Enter a recipient address and amount of ETH to send, then click the "Send Transaction" button.
  * The blockchain blocks will be displayed as a chain, showing the transaction details.
    
## Example Block Representation

After sending a transaction, a typical blockchain block will be displayed in the following format:

```bash
Block Hash: 0xabc123...
Previous Hash: 0xdef456...
Next Hash: 0xghi789...

Transactions:
  - Transaction Hash: 0x123abc...
    From: 0xabc123...
    To: 0xdef456...
    Value: 0.5 ETH
```
Each block shows the transaction details, including the transactionHash, from, to, and value (in ETH).

## Troubleshooting
* MetaMask Not Connecting: Ensure that MetaMask is properly configured and connected to the correct network (Ganache or another Ethereum network).
* Transaction Fails: Check if the account has sufficient ETH in Ganache or MetaMask for the transaction.

## DEMO  
[![Watch the video]](https://github.com/user-attachments/assets/745cd1ba-d268-4a69-b071-84a7582b72ec)

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your improvements.

### Let Us know
For more details, visit [MultiQoS](https://multiqos.com/).

Contact us for collaboration or support:

Email: [biz@multiqos.com](https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=biz@multiqos.com)
