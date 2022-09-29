import React, { Component, FunctionComponent, useState } from "react";
import { TezosToolkit } from "@taquito/taquito";

import ConnectButton from "./components/Header";
import Itens from "./components/Itens";

import MineButton from "./components/MineButton";
import Footer from "./components/Footer";
import Header_1 from "./components/Header_1";
import DisconnectButton from "./components/DisconnectWallet";
import qrcode from "qrcode-generator";
import UpdateContract from "./components/UpdateContract";
import Transfers from "./components/Transfers";
import { mineManager } from "./components/MineManager";
import { tezosManager } from "./components/TezosManager";

import { render } from 'react-dom';
import { Modal } from './components/Modal';
import { useModal } from './components/useModal';
import { ConfirmationModal } from './components/confirmation-modal';
import { toast } from "./components/ToastManager";


enum BeaconConnection {
  NONE = "",
  LISTENING = "Listening to P2P channel",
  CONNECTED = "Channel connected",
  PERMISSION_REQUEST_SENT = "Permission request sent, waiting for response",
  PERMISSION_REQUEST_SUCCESS = "Wallet is connected"
}

const App = () => {
    
    const rpc: string = "https://mainnet.api.tez.ie";
    //const rpc: string = "https://jakartanet.ecadinfra.com";//Teste
    //const rpc: string = "https://ithacanet.ecadinfra.com";//Teste
    //const rpc: string = "https://ithacanet.smartpy.io/";//Teste
    
    const [Tezos, setTezos] = useState<TezosToolkit>( new TezosToolkit(rpc) );
    const [contract, setContract] = useState<any>(undefined);
    const [publicToken, setPublicToken] = useState<string | null>("");
    const [wallet, setWallet] = useState<any>(null);
    const [userAddress, setUserAddress] = useState<string>("");
    const [userBalance, setUserBalance] = useState<number>(0);
    const [storage, setStorage] = useState<number>(0);
    const [contentModal, setContentModal] = useState<any>(undefined);
    const [contentOverScreen, setContentOverScreen] = useState<any>(undefined);
    const [contentOverScreen2, setContentOverScreen2] = useState<any>(undefined);
    const [titleModal, setTitleModal] = useState<string>("Transfer");
    const [copiedPublicToken, setCopiedPublicToken] = useState<boolean>(false);
    const [beaconConnection, setBeaconConnection] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>("transfer");

    // Granadanet Increment/Decrement contract
    // const contractAddress: string = "KT1K3XVNzsmur7VRgY8CAHPUENaErzzEpe4e";
    // Hangzhounet Increment/Decrement contract
    const contractAddress: string = "KT1FU6K4DLszGV3DKtTfoAdwFuD5YKBXdJDw";
    
    const address: string = 'tz1a4BZwWbN6Q4jN6oE36TjWB5sFq5VhghCo';
    
    const { isShown, toggle } = useModal();
    const onConfirm = () => toggle();
    const onCancel = () => toggle();

    const generateQrCode = (): { __html: string } => {
      const qr = qrcode(0, "L");
      qr.addData(publicToken || "");
      qr.make();

      return { __html: qr.createImgTag(4) };
    };
    
    const connectIt = function() {
        let result = mineManager.connect({ Modal: Modal, toggle: toggle, setTitleModal: setTitleModal, setContentModal: setContentModal });        
    }
    
    const purchaseIt = function() {
        const result = tezosManager.connect({ Tezos: Tezos,  wallet: wallet });
    }
    
    const saveIt = function() {
        const result = mineManager.saveMine();
    }
    
    const inspectIt = function() {
        const result = tezosManager.inspectContract({ Tezos: Tezos,  wallet: wallet });
    }
    
    const inventoryIt = function() {
        const result = mineManager.inventory({ Modal: Modal, toggle: toggle, setTitleModal: setTitleModal, setContentModal: setContentModal, setContentOverScreen: setContentOverScreen, setContentOverScreen2: setContentOverScreen2 });    
    }
    
    const marketPlaceIt = function() {
        const result = mineManager.marketPlace({ Modal: Modal, toggle: toggle, setTitleModal: setTitleModal, setContentModal: setContentModal, setContentOverScreen: setContentOverScreen }); 
    }
    
    const transferIt = function() {
        setTitleModal("Transfer Tezos");
        setContentModal( <Transfers Tezos={Tezos} setUserBalance={setUserBalance} userAddress={userAddress}/> );
        toggle()    
    }
    
    const toastIt = function() {
        
        toast.show({  
            id: 'my-id',  
            title: "You received a chicken",  
            content: "Yellow magnetic chicken",  
            duration: 4000,
            mode: 'common'
          });
          //toast.destroy('my-id');
    }
    
    return (
        
        <div className="mainPan">
            <Header_1 name="Carlos Garcia" Footer={Footer} ConnectButton={ConnectButton} Tezos={Tezos} setTezos={setTezos} wallet={wallet} contractAddress={contractAddress} setPublicToken={setPublicToken} setStorage={setStorage} setUserAddress={setUserAddress} setUserBalance={setUserBalance} setWallet={setWallet} setContract={setContract} userAddress={userAddress} setBeaconConnection={setBeaconConnection}/>
            <div className="Mine">
                <MineButton Modal={Modal} userAddress={userAddress} wallet={wallet} toast={toast}/>
            </div>
            <div className="itens form-group">
                <Itens Tezos={Tezos} setTezos={setTezos} wallet={wallet}/>
            </div>
            <div className="Action">
                <div className="container">
                    <h2 className="txt-white"><span className="txt-orange">C</span>ool Actions</h2>
                    <button className="btn btn-main mgR" onClick={transferIt}><i className="fa fa-wallet"></i> Transfer</button>
                    <button className="btn btn-main mgR" onClick={connectIt}><i className="fa fa-star"></i> Resources</button>
                    <button className="btn btn-main mgR" onClick={purchaseIt}><i className="fas fa-dollar-sign"></i> Purchase</button>
                    <button className="btn btn-main mgR" onClick={inspectIt}><i className="fas fa-receipt"></i> Inspect</button>
                    <button className="btn btn-main mgR" onClick={inventoryIt}><i className="fas fa-receipt"></i> Inventory</button>
                    <button className="btn btn-main mgR" onClick={saveIt}><i className="fas fa-save"></i> Save</button>
                    <button className="btn btn-main mgR" onClick={marketPlaceIt}><i className="fas fa-store"></i> MarketPlace</button>
                </div>
            </div>
            <div className="Footer">
                <Footer/>
            </div>
           
            <div className="Mine">
                <Modal isShown={isShown} hide={toggle} modalContent={contentModal} headerText={titleModal}/>
            </div>
            <div className="overScreen" id="overScreen">
                <div className="container r">{contentOverScreen}</div>                
            </div>
            <div className="overScreen" id="overScreen2">
                <div className="container r">{contentOverScreen2}</div>                
            </div>
        </div>
    );
};

export default App;