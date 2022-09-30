import axios, { AxiosResponse } from "axios";
import React, { Component, useState } from "react";
import Trade from "../views/Trade";
import Marketplace from "../views/Marketplace";
import Inventory from "../views/Inventory";
import { toast } from "../components/ToastManager";

import { mineUtils } from "../components/MineUtils";

    
export class MineManager {
    
    public mine = async (): Promise<AxiosResponse> => {
             
        const baseUrl: string = "http://localhost:3000"
        
        try {   
            let nrItems = mineUtils.randomNumber(1, 1);
            let userMine = {}
            //alert(nrItems);

            const recordSet: AxiosResponse = await axios.get(
                baseUrl + "/inventory/mine", {params: {nr: nrItems}}
            )
            
            userMine.xp = 1; userMine.coin = 0; userMine.stamina = 1;
            recordSet.data.data.push({id: 0, title: 'Xp', image: "xp.png"})
            //let mineResult = [{title: '+1 Yellow Chicken', content: ''}, {title: '+2 Silver Spoons', content: ''}, {title: '+1 Gold', content: ''}];
            
            Object.keys(recordSet.data.data).map((d: any)=>{
                
                var nrQtd = mineUtils.randomNumber(1, 3);
                
                if(recordSet.data.data[d].title != 'Coin' && recordSet.data.data[d].title != 'Xp'){
                    // Send data to the backend via POST
                    const mineResult = axios.post(baseUrl + "/resources", {'id_item': recordSet.data.data[d].id, 'id_user': 0, 'amount': nrQtd} )
                        .then(response => { 
                            toast.show({ title: "+" + nrQtd + " " + recordSet.data.data[d].title,  content: "",  duration: 10000, mode: 'common', image: '../imagens/' + recordSet.data.data[d].image }); return response.data; 

                        })
                        .catch(error => {  console.error('There was an error!', error); }); 
                }
                
                if(recordSet.data.data[d].title == 'Coin' || recordSet.data.data[d].title == 'Xp'){
                    if(recordSet.data.data[d].title == 'Xp') nrQtd = userMine.xp;
                    if(recordSet.data.data[d].title == 'coin') userMine.coin = nrQtd;
                    toast.show({ title: "+" + nrQtd + " " + recordSet.data.data[d].title,  content: "",  duration: 10000, mode: 'common', image: '../imagens/' + recordSet.data.data[d].image });
                }
                 
            });
            
             
            let update = this.updateUser(userMine);
            
            //recordSet.forEach(function (value) {
                //toast.show({ title: value.title,  content: value.value,  duration: 4000  }); 
                //min = min + 100;
            //}); 
            
            return recordSet;
            
        } catch (error: any) {
            throw new Error(error);
        }
    };
       
    public updateUser = async (props): Promise<AxiosResponse> => {
        
        const baseUrl: string = "http://localhost:3000"
        
        // Send data to the backend via POST
        const user = await axios.post(baseUrl + "/user/xp", {'xp': props.xp, 'coin': props.coin, 'stamina': props.stamina, 'id_user': 0} )
            .then(response => { return response.data; })
            .catch(error => {  toast.show({ title: 'There was an error!' + error,  content: "",  duration: 4000, mode: 'error', image: "" }); console.error('There was an error!', error); }); 

        return user;
    };
    
    public saveMine = async (): Promise<AxiosResponse> => {
        
        const baseUrl: string = "http://localhost:3000"
        let nrItems = mineUtils.randomNumber(1, 5);

        // Send data to the backend via POST
        const mineResult = await axios.post(baseUrl + "/resources", {'id_item': 5, 'id_user': 0, 'amount': nrItems} )
            .then(response => { toast.show({ title: "Saved test",  content: "",  duration: 4000, mode: 'success', image: "" }); return response.data; })
            .catch(error => {  toast.show({ title: 'There was an error!' + error,  content: "",  duration: 4000, mode: 'error', image: "" }); console.error('There was an error!', error); }); 

        return mineResult;
    };
     

    public connect = async (props: any): Promise<AxiosResponse> => {
        
        const baseUrl: string = "http://localhost:3000"
        
        try {
            //alert(props.Title);
            
            const todos: AxiosResponse = await axios.get(
              baseUrl + "/resources"
            )
            
            
            props.setTitleModal('Fetching Database Records');
            props.setContentModal(Object.keys(todos.data.data).map((d: any)=>{ return( 
                <div className="pp_square_bg mgB0 p-10 hover width350" key={todos.data.data[d].id} >
                    <div className="cflx center-flex">
                        <div className="fr1 mgR">
                            <img src={"./imagens/" + todos.data.data[d].image} height="40"/>
                        </div>
                        <div className="fr3">{todos.data.data[d].title}</div> 
                        <div className="fr1">{todos.data.data[d].value}</div>
                    </div>
                </div>) 
                })
            );
            
            
            //console.log(result);
            //Object.keys(todos).map(key => ( alert(todos[key].name)));
            //todos && todos.data.map((d)=>{ console.log(d.name);});
            
            props.toggle();
           
            return todos;
             
        } catch (error: any) {
            throw new Error(error);
        }
        
        
    }
    
    public inventory = async (props: any): Promise<AxiosResponse> => {
        
        const baseUrl: string = "http://localhost:3000"
        
        try {
            
            const items: AxiosResponse = await axios.get(
              baseUrl + "/inventory"
            )
            
            let element = document.getElementById('overScreen');
            //alert(props.id);
            props.setContentOverScreen(<Inventory items={items} props={props}/>);
            element.classList.add("act");
             
        } catch (error: any) {
            throw new Error(error);
        } 
    }
    
    /*
    const tradeIt = async (props: any): Promise<AxiosResponse> => {
        
        let baseUrl: string = "http://localhost:3000"
        
        let item: AxiosResponse = await axios.get(
            baseUrl + "/inventory/item", {params: {nr: props.id}} 
        )

        //alert('oo');
        let element = document.getElementById('overScreen');
        //alert(props.id);
        props.props.setContentOverScreen(<Trade item={item.data.data}/>);
        element.classList.add("act");
        
        return baseUrl;
    }
    
    
    
    public inventoryOld = async (props: any): Promise<AxiosResponse> => {
        
        const baseUrl: string = "http://localhost:3000"
        
        try {
            //alert(props.Title);
            
            const todos: AxiosResponse = await axios.get(
              baseUrl + "/inventory"
            )
            
            props.setTitleModal('My Inventory');
            props.setContentModal(Object.keys(todos.data.data).map((d)=>{ return(
                <div className="pp_square_bg mgB0 p-10 hover width450" key={todos.data.data[d].id} > 
                    <div className="cflx center-flex">
                        <div className="fr1">
                            <img src={"./imagens/" + todos.data.data[d].image} height="40"/>
                        </div>  
                        <div className="fr1 center mgR"><div className="badge2">{todos.data.data[d].amount} x</div></div> 
                        <div className="fr4">{todos.data.data[d].title}</div> 
                        <div className="fr1"><button className="btn btn-main btn-sm" onClick={() => { this.tradeIt({id: todos.data.data[d].id, props: props});   }} >Trade</button></div>
                    </div>
                </div>
                ) })
                );

            props.toggle();
            
            return todos;
             
        } catch (error: any) {
            throw new Error(error);
        } 
    } */
    
    
    
    public marketPlace = async (props: any): Promise<AxiosResponse> => {

        try {
            const baseUrl: string = "http://localhost:3000"
            
            const items: AxiosResponse = await axios.get(
              baseUrl + "/inventory/marketplace"
            )

            let element = document.getElementById('overScreen');
            //alert(props.id);
            props.setContentOverScreen(<Marketplace items={items}/>);
            element.classList.add("act");

            return baseUrl;
             
        } catch (error: any) {
            throw new Error(error);
        } 
    }
  
};

export const mineManager = new  MineManager();