import React, { FunctionComponent, useState, useEffect} from 'react';
import axios, { AxiosResponse } from "axios";
import { render } from 'react-dom';
import { Modal } from '../components/Modal';
import { useModal } from '../components/useModal';
    
export class TezosManager {

    public mine(){
        
        let mineResult = [{title: '+1 Yellow Chicken', content: ''}, {title: '+2 Silver Spoons', content: ''}, {title: '+1 Gold', content: ''}];
        return mineResult;
        
        //return true;
    };
       
     
    
    public connect = async (props : any): Promise<void> => {
        
        // KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi - FXHash
        //const contractAddress: string = "KT1JfEVQj4w1aTJmg6gSHKvV2UQZAjuguemr";
        const contractAddress: string = "KT1FU6K4DLszGV3DKtTfoAdwFuD5YKBXdJDw";
        
        try {
            props.Tezos.wallet
            .at(contractAddress)
            .then((contract : any) => {
              const i = 7;

              console.log(`Incrementing storage value by ${i}...`);
              return contract.methods.increment(i).send();
            })
            .then((op : any) => {
                console.log(`Waiting for ${op.opHash} to be confirmed...`);
                return op.confirmation(3).then(() => op.opHash);
            })
            .then((hash : any) => console.log(`Operation injected: https://ithaca.tzstats.com/${hash}`))
            .catch((error : any) => console.log(`Error: ${JSON.stringify(error, null, 2)}`)); 
            
            
        } catch (error: any) {
            throw new Error(error)
        }
        
        
    }
    
    public inspectContract = async (props : any): Promise<void> => {
        
        // KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi - FXHash
        //const contractAddress: string = "KT1JfEVQj4w1aTJmg6gSHKvV2UQZAjuguemr";
        const contractAddress: string = "KT1FU6K4DLszGV3DKtTfoAdwFuD5YKBXdJDw";
        let message: string = "OPs";
      
        try {
            
            props.Tezos.wallet
                .at(contractAddress)
                .then((c: any) => {
                    let methods = c.parameterSchema.ExtractSignatures();
                    message = JSON.stringify(methods, null, 2);
                })
                .catch((error: any) => message = `Error: ${error}`);
            
            //return <Modal isShown="true" hide="false" modalContent={message} headerText="Result"/>
            
        
        } catch (error: any) {
            throw new Error(error)
        }
        
        
    } 
};

export const tezosManager = new  TezosManager();