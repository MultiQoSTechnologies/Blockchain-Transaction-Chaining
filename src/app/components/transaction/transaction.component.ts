import {Component, ElementRef, ViewChild} from '@angular/core';
import {Web3} from 'web3';
import Swal from 'sweetalert2';

/**
 * TransactionComponent
 * A component for handling Ethereum wallet connections, transactions, and blockchain data fetching.
 */
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent {
  toAddress = ''; // Recipient address for the transaction
  amount = ''; // Amount of ETH to send
  walletConnected = false; // Indicates if the wallet is connected
  walletAddress: string = ''; // Connected wallet address
  transactionPending: boolean = false; // Tracks if a transaction is in progress
  walletBalance: any; // Balance of the connected wallet in ETH
  chain: any[] = []; // Stores fetched blockchain data (blocks and transactions)
  submitted: boolean = false; // Indicates if the form has been submitted
  @ViewChild('scrollContainer') scrollContainer!: any; // Reference to the scrolling container element

  // Web3.js instance for interacting with the blockchain
  private web3: Web3;
  private contract: any; // Smart contract instance
  private contractAddress = 'Add your deployed smart contract address'; // Deployed contract address
  private ABI = [
    // ABI definition for interacting with the smart contract
    {
      anonymous: false,
      inputs: [
        {indexed: true, internalType: 'address', name: 'from', type: 'address'},
        {indexed: true, internalType: 'address', name: 'to', type: 'address'},
        {indexed: false, internalType: 'uint256', name: 'value', type: 'uint256'},
      ],
      name: 'TransactionSent',
      type: 'event',
    },
    {
      inputs: [{internalType: 'address payable', name: '_to', type: 'address'}],
      name: 'sendTransaction',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
  ];  // Change your generated ABI of your smart contracts

  constructor() {
    // Initialize Web3 and smart contract instances
    this.web3 = new Web3((window as any).ethereum);
    this.contract = new this.web3.eth.Contract(this.ABI, this.contractAddress);
  }

  /**
   * Connects the user's Ethereum wallet to the application.
   * Fetches the wallet balance and blockchain data upon successful connection.
   */
  async connectWallet() {
    try {
      const accounts = await this.web3.eth.requestAccounts();
      if (accounts.length > 0) {
        this.walletConnected = true;
        this.walletAddress = accounts[0];
        await this.fetchWalletBalance();
        await this.showAlert(`Wallet connected: ${this.walletAddress}`, 'success').then(async (res: any) => {
          if (res.isConfirmed) {
            await this.fetchBlockchainData();
          }
        });
      } else {
        await this.showAlert(`No accounts found`, 'info');
      }
    } catch (error) {
      await this.showAlert(`Failed to connect wallet`, 'error');
      console.error('Error connecting wallet:', error);
    }
  }

  /**
   * Fetches the balance of the connected wallet in ETH.
   */
  async fetchWalletBalance() {
    try {
      const balance = await this.web3.eth.getBalance(this.walletAddress);
      this.walletBalance = this.web3.utils.fromWei(balance.toString(), 'ether');
    } catch (error) {
      await this.showAlert(`Failed to fetch wallet balance`, 'error');
      console.error('Error fetching wallet balance:', error);
    }
  }

  /**
   * Sends an Ethereum transaction to the specified recipient address.
   * Resets form fields and updates blockchain data upon success.
   */
  async sendTransaction() {
    this.submitted = true; // Mark form as submitted
    this.transactionPending = true; // Indicate transaction in progress
    const from = this.walletAddress; // Sender's wallet address
    const to = this.toAddress; // Recipient's wallet address
    try {
      await this.contract.methods.sendTransaction(this.toAddress).send({
        from,
        to,
        value: this.web3.utils.toWei(this.amount, 'ether'),
      });
      await this.showAlert(
        `Your ${this.amount} ETH is successfully transferred into ${this.toAddress}.`,
        'success'
      ).then(async (res: any) => {
        if (res.isConfirmed) {
          this.amount = ''; // Reset amount
          this.toAddress = ''; // Reset recipient address
          await this.fetchBlockchainData(); // Refresh blockchain data
        }
      });
    } catch (error) {
      this.transactionPending = false;
      await this.showAlert(`Transaction failed!`, 'error');
      console.error('Transaction failed:', error);
    } finally {
      this.submitted = false; // Reset form submission status
    }
  }

  /**
   * Fetches blockchain data (blocks and transactions) starting from the latest block.
   * Updates the local `chain` array with block and transaction details.
   */
  async fetchBlockchainData() {
    try {
      const latestBlockNumber = await this.web3.eth.getBlockNumber();
      this.chain = [];
      for (let i = latestBlockNumber; i >= Math.max(0, Number(latestBlockNumber - BigInt(100))); i--) {
        const block = await this.web3.eth.getBlock(i, true); // Fetch full block with transactions
        if (block.transactions.length > 0) {
          const blockData = {
            blockHash: block.hash,
            previousHash: block.parentHash,
            nextHash: i < latestBlockNumber ? this.chain[0]?.blockHash : null,
            transactions: block.transactions.map((tx: any) => ({
              transactionHash: tx.hash,
              from: tx.from,
              to: tx.to,
              value: this.web3.utils.fromWei(tx.value.toString(), 'ether'),
            })),
          };
          await this.chain.unshift(blockData); // Add block to chain
        }
      }
    } catch (error) {
      await this.showAlert(`Failed to fetch blockchain data`, 'error');
      console.error('Error fetching blockchain data:', error);
    }
    await setTimeout(() => this.scrollToBottom(), 1);
  }

  /**
   * Scrolls the transaction display to the bottom.
   */
  scrollToBottom() {
    if (this.scrollContainer) {
      const element = this.scrollContainer.nativeElement;
      element.scrollLeft = element.scrollWidth;
    }
  }

  /**
   * Displays an alert dialog using SweetAlert2.
   * @param text - The message to display in the alert.
   * @param icon - The type of alert (success, error, warning, info, question).
   */
  showAlert(
    text: string,
    icon: 'success' | 'error' | 'warning' | 'info' | 'question'
  ) {
    return Swal.fire({
      text,
      icon,
      confirmButtonText: 'Okay',
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  }
}
