import React, { useState, Dispatch, SetStateAction } from "react";
import { TezosToolkit } from "@taquito/taquito";

const Transfers = ({
  Tezos,
  setUserBalance,
  userAddress
}: {
  Tezos: TezosToolkit;
  setUserBalance: Dispatch<SetStateAction<number>>;
  userAddress: string;
}): JSX.Element => {
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendTransfer = async (): Promise<void> => {
    if (recipient && amount) {
      setLoading(true);
      try {
        const op = await Tezos.wallet
          .transfer({ to: recipient, amount: parseInt(amount) })
          .send();
        await op.confirmation();
        setRecipient("");
        setAmount("");
        const balance = await Tezos.tz.getBalance(userAddress);
        setUserBalance(balance.toNumber());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="Trans">
        <h4 className="mgB">Transfer some Tezos(ꜩ) for a friend</h4>
        <div className="cflx gap-10">
            <div className="fr4">
                <input type="text" placeholder="Wallet's Friend" className="form-control txt-plus mgR0" value={recipient} onChange={e => setRecipient(e.target.value)} />
            </div>
            <div className="fr2">
                <input type="number" className="form-control txt-plus" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
            </div>
            <div className="fr1">
                <button className="btn btn-success btn-plus" disabled={!recipient && !amount} onClick={sendTransfer}>
                  {loading ? (
                    <span>
                      <i className="fas fa-spinner fa-spin"></i>&nbsp; Please wait
                    </span>
                  ) : (
                    <span>
                      <i className="far fa-paper-plane"></i>&nbsp; Send
                    </span>
                  )}
                </button>
            </div>
        </div>
        <p className="sF2 legend">This action cannot be undone</p>
    </div>
    
  );
};

export default Transfers;
