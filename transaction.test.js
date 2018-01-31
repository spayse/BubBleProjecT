const Transaction = require('./transaction');
const Wallet = require('./wallet');
const { MINING_REWARD } = require('./config');

describe('Transaction', () => {
  let transaction, wallet, amount, recipient;

  beforeEach(() => {
    wallet = new Wallet();
  });

  describe('creating a normal transaction', () => {
    beforeEach(() => {
      amount = 50;
      recipient = 'r3c1p13nt';
      transaction = Transaction.normalTransaction(wallet, recipient, amount);
    });

    it('inputs the balance of the wallet', () => {
      expect(transaction.input.address).toEqual(wallet.publicKey);
    });

    it('ouputs the `amount` subtracted from the wallet balance', () => {
      expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
        .toEqual(wallet.balance - amount);
    });

    it('outputs the `amount` added to the recipient', () => {
      expect(transaction.outputs.find(output => output.address === recipient).amount)
        .toEqual(amount);
    });
  });

  describe('creating a reward transaction', () => {
    beforeEach(() => {
      transaction = Transaction.rewardTransaction(wallet);
    });

    it(`rewards the miner's wallet`, () => {
      expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
        .toEqual(MINING_REWARD);
    });
  });
});