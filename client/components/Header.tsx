import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType, BeaconEvent, defaultEventCallbacks} from "@airgap/beacon-sdk";
import DisconnectButton from "../components/DisconnectWallet";


import { render } from 'react-dom';
import { Modal } from '../components/Modal';
import { useModal } from '../components/useModal';

type ButtonProps = {
  Tezos: TezosToolkit;
  setTezos: (any);
  setContract: Dispatch<SetStateAction<any>>;
  setWallet: Dispatch<SetStateAction<any>>;
  setUserAddress: Dispatch<SetStateAction<string>>;
  setUserBalance: Dispatch<SetStateAction<number>>;
  setStorage: Dispatch<SetStateAction<number>>;
  contractAddress: string;
  userAddress: string;
  userBalance: number;
  setBeaconConnection: Dispatch<SetStateAction<boolean>>;
  setPublicToken: Dispatch<SetStateAction<string | null>>;
  wallet: BeaconWallet;
};

const ConnectButton = ({
    Tezos,
    setContract,
    setWallet,
    setUserAddress,
    setUserBalance,
    userAddress,
    userBalance,
    setStorage,
    setTezos,
    contractAddress,
    setBeaconConnection,
    setPublicToken,
    wallet
    }: ButtonProps): JSX.Element => {
    
    const [loadingNano, setLoadingNano] = useState<boolean>(false);
    const { isShown, toggle } = useModal();
    const [message, setMessage] = useState<string>("Ops");
    const [title, setTitleMessage] = useState<string>("Msg");
    const [amount, setAmount] = useState<number>(2);

    const setup = async (userAddress: string): Promise<void> => {
        setUserAddress(userAddress);
        // updates balance
        //const balance = await Tezos.tz.getBalance(userAddress);
        const balance = 0;
        //setUserBalance(balance.toNumber());
        // creates contract instance
        //const contract = await Tezos.wallet.at(contractAddress);
        //const storage: any = await contract.storage();
        //setContract(contract);
        //setStorage(storage.toNumber());
    };

    const connectTemple = async (): Promise<void> => {
        try {
            const activeAccount = await wallet.client.getActiveAccount();
            
            if (!activeAccount) {
                const permissions = await wallet.client.requestPermissions();
                console.log("New connection:", permissions.address);
                let myAddress = permissions.address;
                const userAddress = await wallet.getPKH();
                await setup(userAddress);
                setBeaconConnection(true);
              } else {
                const userAddress = activeAccount.address;
              }
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        (async () => {
          // creates a wallet instance
          const wallet = new BeaconWallet({
            name: "Mining Mars",
            iconUrl: '../imagens/xtz.png',
            //appUrl: "http://localhost:3000",
            appUrl: "http://mars.kinghost.net",
            preferredNetwork: NetworkType.HANGZHOUNET,
            disableDefaultEvents: true, // Disable all events / UI. This also disables the pairing alert.
            eventHandlers: {
              // To keep the pairing alert, we have to add the following default event handlers back
              [BeaconEvent.PAIR_INIT]: {
                handler: defaultEventCallbacks.PAIR_INIT
              },
              [BeaconEvent.PAIR_SUCCESS]: {
                handler: data => setPublicToken(data.publicKey)
              }
            }
          });
          Tezos.setWalletProvider(wallet);
          setWallet(wallet);
          // checks if wallet was connected before
          const activeAccount = await wallet.client.getActiveAccount();
          if (activeAccount) {
            const userAddress = await wallet.getPKH();
            await setup(userAddress);
            setBeaconConnection(true);
          }
        })();
    }, []);
    
    
    
    const address = 'tz1a4BZwWbN6Q4jN6oE36TjWB5sFq5VhghCo';
    
    const runEstime = async (): Promise<void> => {
        setMessage("My message"); setTitleMessage('Ops');
        //<Modal isShown={isShown} hide={toggle} modalContent={message} headerText={title}/>
        toggle();
    }
    
    const runEstime11 = async (): Promise<void> => {
        setTitleMessage("Estiming Smart Contract");
        setMessage("Muito tempo:" + amount);
        setAmount(amount + 1);
        toggle();
    }
    
    const runEstime22 = async (): Promise<void> => {
        const smartContract = 'KT1FU6K4DLszGV3DKtTfoAdwFuD5YKBXdJDw';
        
        setTitleMessage(`Estimating Smart Contract Fees ${smartContract}`);
        setMessage("Connecting to smart contract...");
        
        toggle();
        Tezos.wallet
        .at(smartContract)
        .then((contract) => {
          const i = 7;
          return contract.methods.increment(i).toTransferParams({});
        })
        .then((op) => {
            setMessage("Estimating the smart contract call...");
            console.log(`Estimating the smart contract call : `);
            return Tezos.estimate.transfer(op);
        })
        .then((est) => {
            setMessage("Success - " + `burnFeeMutez : ${est.burnFeeMutez}, 
            gasLimit : ${est.gasLimit}, 
            minimalFeeMutez : ${est.minimalFeeMutez}, 
            storageLimit : ${est.storageLimit}, 
            suggestedFeeMutez : ${est.suggestedFeeMutez}, 
            totalCost : ${est.totalCost}, 
            usingBaseFeeMutez : ${est.usingBaseFeeMutez}`);
            console.log(`burnFeeMutez : ${est.burnFeeMutez}, 
            gasLimit : ${est.gasLimit}, 
            minimalFeeMutez : ${est.minimalFeeMutez}, 
            storageLimit : ${est.storageLimit}, 
            suggestedFeeMutez : ${est.suggestedFeeMutez}, 
            totalCost : ${est.totalCost}, 
            usingBaseFeeMutez : ${est.usingBaseFeeMutez}`);
        })
        .catch((error) => console.table(`Error: ${JSON.stringify(error, null, 2)}`));
    }
    
    const getBalance = async (): Promise<void> => {
        //const contract = await Tezos.wallet.at('KT1BJC12dG17CVvPKJ1VYaNnaT5mzfnUTwXv');
        const balance : (any) = await Tezos.tz.getBalance(userAddress);
        var total = (balance / 1000000).toLocaleString("en-US") + "ꜩ";
        console.log(total);
    }
    
    const runEstime3 = async (): Promise<void> => {
        try {
            console.log(wallet);
            //return true
            //Tezos.setProvider({ signer: await InMemorySigner.fromSecretKey('your_private_key') });
            
            console.log(`Estimating the transfer of ${amount} ꜩ to ${address} : `);
            
            Tezos.estimate
              .transfer({ to: address, amount: amount })
              .then((est) => {
                console.log(`burnFeeMutez : ${est.burnFeeMutez}, 
                gasLimit : ${est.gasLimit}, 
                minimalFeeMutez : ${est.minimalFeeMutez}, 
                storageLimit : ${est.storageLimit}, 
                suggestedFeeMutez : ${est.suggestedFeeMutez}, 
                totalCost : ${est.totalCost}, 
                usingBaseFeeMutez : ${est.usingBaseFeeMutez}`);
              })
              .catch((error) => console.table(`Error: ${JSON.stringify(error, null, 2)}`));  
                    
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="buttons cflx center-flex">
            <div className="txt-white mgR0"> { (userAddress === '') ? "" : userAddress } </div>
            <button className={ (userAddress !== '') ? "hide" : 'btn btn-main' } onClick={connectTemple}>
                <i className="fas fa-wallet"></i> Connect Wallet
            </button>
            { (userAddress === '' || wallet === null) ? "" : 
            <DisconnectButton
                wallet={wallet}
                setPublicToken={setPublicToken}
                setUserAddress={setUserAddress}
                setUserBalance={setUserBalance}
                setWallet={setWallet}
                setTezos={setTezos}
                setBeaconConnection={setBeaconConnection}
              />
            }
            
            <Modal isShown={isShown} hide={toggle} modalContent={message} headerText={title}/>
        </div>
    );
};

export default ConnectButton;