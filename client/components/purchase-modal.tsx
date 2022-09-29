import React, { FunctionComponent, useState, useEffect} from 'react';
import { TezosToolkit } from "@taquito/taquito";
import { ConfirmationButtons, Message, StyledModal } from '../css/purchase-modal.style';
//import { NetworkType, BeaconEvent, defaultEventCallbacks} from "@airgap/beacon-sdk";
import { BeaconWallet } from "@taquito/beacon-wallet";

interface PurchaseModalProps {
    Tezos: (any);
    onConfirm: () => void;
    message: string;
    imageSrc: string;
    titleItem: string;
    price: number;
}

export const PurchaseModal: FunctionComponent<PurchaseModalProps> = (props) => {
    
    const contractAddress: string = "KT1JfEVQj4w1aTJmg6gSHKvV2UQZAjuguemr";
    
    const buyTool = async (): Promise<void> => {
        
        /*
        props.Tezos.wallet
            .transfer({ to: 'tz1NhNv9g7rtcjyNsH8Zqu79giY5aTqDDrzB', amount: props.price })
            .send()
            .then((op) => {
                console.log(`Hash: ${op.opHash}`);

            op.confirmation()
            .then((result) => {
                console.log(result);
                if (result.completed) {
                    console.log('Transaction correctly processed!');
                } else {
                    console.log('An error has occurred');
                }
            })
            .catch((err) => console.log(err));
        }); */
    }
    
    
    const buyItem11 = async (): Promise<void> => {
        /*
        try {
            const { hash, contractAddress } = await props.Tezos.wallet.originate({
                code: require("./assets/counter.json"),
                init: require("./assets/counter_storage.json"),
            });

            console.log("Successfully deployed contract");
            console.log(`>> Transaction hash: ${hash}`);
            console.log(`>> Contract address: ${contractAddress}`);
            
        } catch (error) {
          console.log(error);
        } */
    }
    
    const incrementInt = async (): Promise<void> => {
        /*
        props.Tezos.wallet
            .at(contractAddress)
            .then((contract) => {
              const i = 7;

              console.log(`Incrementing storage value by ${i}...`);
              return contract.methods.increment(i).send();
            })
            .then((op) => {
                console.log(`Waiting for ${op.opHash} to be confirmed...`);
                return op.confirmation(3).then(() => op.opHash);
            })
            .then((hash) => console.log(`Operation injected: https://ithaca.tzstats.com/${hash}`))
            .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`)); */

    }
    
    const lisMethodsAvailables = async (): Promise<void> => {
        /*
        props.Tezos.contract
            .at(contractAddress)
            .then((contract) => {
              console.log(`List all contract methods: ${Object.keys(contract.methods)}\n`);
              console.log(
                    `Inspect the signature of the 'set_child_record' contract method: ${JSON.stringify(
                    contract.methods.set_child_record().getSignature(),
                    null,
                    2
                )}`
              );
            })
            .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`)); */
    }
    
    const buyItem = async (): Promise<void> => {
        
        props.Tezos.wallet
            .at(contractAddress)
            .then((contract: any) => {
                console.log(contract);
                let incrementParams = contract.methods.decrement(2).toTransferParams();
                console.log(JSON.stringify(incrementParams, null, 2));
            })
            .catch((error: any) => console.log(`Error: ${error}`));
    }
    
    const showMethods = async (): Promise<void> => {
        /*
        props.Tezos.wallet
            .at(contractAddress)
            .then((c) => {
                let methods = c.parameterSchema.ExtractSignatures();
                console.log(JSON.stringify(methods, null, 2));
            })
            .catch((error) => console.log(`Error: ${error}`)); */
    }
    
    const createContract = async (): Promise<void> => {
        
        //const genericMultisigJSONfile = require('./assets/generic.tz');
        /*
        props.Tezos.wallet
            .originate({
                code: require("./assets/contract_lambada.json"),
                init: require("./assets/lambada_storage.json"),
                
            })
            .send()
            .then((originationOp) => {
              console.log(`Waiting for confirmation of origination...`);
              return originationOp.contract();
            })
            .then((contract) => {
              console.log(`Origination completed for ${contract.address}.`);
            })
            .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));  */
    }
    
    const buyItem13 = async (): Promise<void> => {
        /* 
        props.Tezos.contract
            .at(contractAddress)
            .then((contract) => {
              return contract.views.getBalance('tz1a4BZwWbN6Q4jN6oE36TjWB5sFq5VhghCo').read();
            })
            .then((response) => {
              console.log(JSON.stringify(response, null, 2));
            })
            .catch((error) => console.log(`Error: ${error} ${JSON.stringify(error, null, 2)}`)); */
    }
    
    const buyItem2 = async (): Promise<void> => {
        /*
        props.Tezos.wallet
            .originate({
              code: "contractStorageAnnot",
              storage: {
                theAddress: 'tz1PgQt52JMirBUhhkq1eanX8hVd1Fsg71Lr',
                theBool: true,
                theNat: '3',
                theNumber: '5',
                theTez: '10',
              },
            })
            .send()
            .then((originationOp) => {
              console.log(`Waiting for confirmation of origination...`);
              return originationOp.contract();
            })
            .then(() => {
              console.log(`Origination completed.`);
            })
            .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`)); */
    }
    
    
    return (
      <React.Fragment>
          <StyledModal>
              <div className="center">
                  <img src={props.imageSrc} alt="Item"/>
                  <h4>{props.titleItem}</h4>
              </div>
              <Message>{props.message}</Message>
              <ConfirmationButtons>
                  <button onClick={createContract} className="btn btn-success btn-lg btn-block"><i className="fa fa-shopping-cart mgR0"></i>Buy</button>
              </ConfirmationButtons>
          </StyledModal>
      </React.Fragment>
    );
};