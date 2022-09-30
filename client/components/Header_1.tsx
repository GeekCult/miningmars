import React, { Dispatch, SetStateAction, useState, useEffect } from "react";



type ButtonProps = {
    name: string;
    Footer: (any);   
    ConnectButton: (any);
    Tezos: (any);
    setTezos: (any);
    setContract: Dispatch<SetStateAction<any>>;
    setWallet: Dispatch<SetStateAction<any>>;
    setUserAddress: Dispatch<SetStateAction<string>>;
    setUserBalance: Dispatch<SetStateAction<number>>;
    setStorage: Dispatch<SetStateAction<number>>;
    contractAddress: string;
    userAddress: string;
    setBeaconConnection: Dispatch<SetStateAction<boolean>>;
    setPublicToken: Dispatch<SetStateAction<string | null>>;
    wallet: (any);
};

const Header_1 = ({
    name, Footer, Tezos, ConnectButton, setContract, setWallet, setUserAddress, setUserBalance, setStorage, setTezos, contractAddress, userAddress, setBeaconConnection, setPublicToken, wallet

    
}: ButtonProps): JSX.Element => {
        

    return (
        <div className="ctn">
            <div className="header">
                <div className='cflx'>
                    <div className="fr1">
                        <div className="brand">
                            <img src="./imagens/logo.png" alt="logo"/>
                        </div>
                    </div>
                    <div className="fr1"></div>
                    <div className="fr1 cflx justify-right">
                        <ConnectButton Tezos={Tezos} setContract={setContract} setWallet={setWallet} setUserAddress={setUserAddress} setUserBalance={setUserBalance} setStorage={setStorage} contractAddress={contractAddress} userAddress={userAddress} setTezos={setTezos} setBeaconConnection={setBeaconConnection} setPublicToken={setPublicToken} wallet={wallet}/>
                    </div>
                </div>
            </div>
            <div className="banner r">
                <img src="./imagens/banner.jpg" alt="banner"/>
                <div className="cntContentBanner">
                    <h2>30th Setember, 2087</h2>
                    <p>Planet Mars</p>
                </div>
            </div>
            
        </div>
    );
};

export default Header_1;