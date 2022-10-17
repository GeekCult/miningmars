import React, { useState, Dispatch, SetStateAction } from "react";
import axios, { AxiosResponse } from "axios";
import { toast } from "../components/ToastManager";

export class ConsumeManager {
    
    const consumeItem = async (item): Promise<void> => {
    //public consumeItem(item any){
        
        let rule = {}
        
        switch(item.id_item){
            
            case "Carrot": case 10:
                rule = {action: 'xp', stamina: 1, coin: 0, xp: 0, item: item, amount: 1, id_user: 0}
                break;
                
            case "Yellow Chicken": case 1:
                rule = {action: 'xp', stamina: 1, coin: 0, xp: 0, item: item, amount: 1, id_user: 0}
                break;
                
            case "Mushroom": case 9:
                rule = {action: 'xp', stamina: 2, coin: 0, xp: 0, item: item, amount: 1, id_user: 0}
                break;
                
            case "Potion": case 16:
                rule = {action: 'xp', stamina: 2, coin: 0, xp: 0, item: item, amount: 1, id_user: 0}
                break;
                
            default:
                rule = {action: 'xp', stamina: 0, coin: 0, xp: 0.1, item: item, amount: 1, id_user: 0}
                break;
        }
        
        let result = await this.executeQuery(rule);
        //console.log('ddd');
        //console.log(result);
        return result;
    }
    
    const executeQuery = async (rule: any): Promise<AxiosResponse> => {
        
        //let result = {}
        
        switch(rule.action){
                
            case "xp":
                
                rule.url = "/user/consume"; rule.action = "user";
                let result2 = await this.saveQuery(rule);
                
                rule.url = "/inventory/consume"; rule.action = "inventory";
                let result2 = await this.saveQuery(rule);
                break;
                
            default:
                result = {status: 'success', error: 0, message: 'Nothing happened'}
                break;
                
        }
        
        return result2
    }
    
    const saveQuery = async (rule: any): Promise<AxiosResponse> => {
        
        //let baseUrl: string = "http://localhost:3000"
        let baseUrl: string = ""
        
        if(rule.action == 'user'){
            const user = await axios.post(baseUrl + rule.url, {'xp': rule.xp, 'coin': rule.coin, 'stamina': rule.stamina, 'id_user': 0} )
                .then(response => {  toast.show({ title: response.data.message, content: "", duration: 4000, mode: response.data.status, image: "../imagens/ic_success.png"}); return response.data; } )
                .catch(error => { console.error('There was an error!', error); }); 
        }
        
        if(rule.action == 'inventory'){
            const inventory = await axios.post(baseUrl + rule.url, {'id_item': rule.item.id, 'amount': rule.amount, 'id_user': rule.id_user} )
                .then(response => { return response.data; } )
                .catch(error => { console.error('There was an error!', error); }); 
        }
            
    }
    
    
};

export const consumeManager = new  ConsumeManager();