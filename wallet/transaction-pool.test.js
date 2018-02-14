const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');
const Blockchain = require('../blockchain');

describe('TransactionPool', () => {
  let tp, wallet, bc, transaction;

  beforeEach(() => {
    tp = new TransactionPool();
    wallet = new Wallet();
    bc = new Blockchain();
    transaction = wallet.createTransaction('r4nd-4dr355', 30, bc, tp);
  });

  // unnecessary
  // it('adds a transaction', () => {
  //   expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
  // });

  it('confirms that a transaction by the wallet exists', () => {
    expect(tp.existingTransaction(wallet.publicKey)).toEqual(transaction);
  });

  it('clears transactions', () => {
    tp.clear();

    expect(tp.transactions).toEqual([]);
  });

  it('updates the transaction in the pool', () => {
    transaction = transaction.update(wallet, 'foo-4ddr355', 40);
    tp.updateOrAddTransaction(transaction);

    expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
  });

  it('grabs valid transactions', () => {
    const validTransactions = [...tp.transactions];
    for (let i=0; i<6; i++) {
      wallet = new Wallet();
      transaction = wallet.createTransaction('r4nd-4dr355', 30, bc, tp);
      if (i%2==0) {
        transaction.input.amount = 999;
      } else {
        validTransactions.push(transaction);
      }
    }

    expect(tp.validTransactions()).toEqual(validTransactions);
  });
});