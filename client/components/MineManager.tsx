import axios, { AxiosResponse } from "axios";
import React, { Component } from "react";
    
export class MineManager {

    public mine(){
        
        //const baseUrl: string = "http://localhost:3000"
        
        let mineResult = [{title: '+1 Yellow Chicken', content: ''}, {title: '+2 Silver Spoons', content: ''}, {title: '+1 Gold', content: ''}];
        //const article = { title: 'React POST Request Example' };
            //axios.post(baseUrl + "/resources", article)
               // .then(response => "done");
        //}
        
        return mineResult;
        
        //return true;
    };
       
    public saveMine = async (): Promise<AxiosResponse> => {
        
        const baseUrl: string = "http://localhost:3000"
        
        //let mineResult = [{title: '+1 Yellow Chicken', content: ''}, {title: '+2 Silver Spoons', content: ''}, {title: '+1 Gold', content: ''}];
        const article = { title: 'Super title' };
        const response = await axios.post(baseUrl + "/resources", article, { headers: { 'Content-Type': 'application/json',  Accept: 'application/json', },)
            .then(response => {message: "done"})
            .catch(error => { console.error('There was an error!', error); }); 
            
        
        
        //return mineResult;
        
        //return true;
    };
     

    public connect = async (props): Promise<AxiosResponse> => {
        
        const baseUrl: string = "http://localhost:3000"
        
        try {
            //alert(props.Title);
            
            const todos: AxiosResponse = await axios.get(
              baseUrl + "/resources"
            )
            
            props.setTitleModal('Fetching Database Records');
            props.setContentModal(Object.keys(todos.data.data).map((d)=>{ return( 
                <div className="pp_square_bg mgB0 p-10 hover" key={todos.data.data[d].id} >
                    <div className="cflx center-flex">
                        <div className="fr1">
                            <img src={"./imagens/" + todos.data.data[d].image} height="25"/>
                        </div>
                        <div className="fr4">{todos.data.data[d].title}</div> 
                        <div className="fr1">{todos.data.data[d].value}</div>
                    </div>
                </div>) 
            });

            //console.log(result);
            //Object.keys(todos).map(key => ( alert(todos[key].name)));
            //todos && todos.data.map((d)=>{ console.log(d.name);});
            
            props.toggle();
           
            return todos;
             
        } catch (error) {
            throw new Error(error);
        }
        
        
    }
    
    public inventory = async (props): Promise<AxiosResponse> => {
        
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
                            <img src={"./imagens/" + todos.data.data[d].image} height="25"/>
                        </div>  
                        <div className="fr1">{todos.data.data[d].amount}</div> 
                        <div className="fr4">{todos.data.data[d].title}</div> 
                        <div className="fr1"><button className="btn btn-main btn-sm">Trade</button></div>
                    </div>
                </div>) });

            //console.log(result);
            //Object.keys(todos).map(key => ( alert(todos[key].name)));
            //todos && todos.data.map((d)=>{ console.log(d.name);});
            
            props.toggle();
            

            return todos; 
        } catch (error) {
            throw new Error(error);
        }
        
        
    }
    
    //public connectWebSocket(){  
        
        
       
            //const WebSocket = require('isomorphic-ws');
            /* 
            const ws = new WebSocketServer('wss://websocket-echo.com/');

            ws.onopen = function open() {
              console.log('connected');
              ws.send(Date.now());
            };

            ws.onclose = function close() {
              console.log('disconnected');
            };

            ws.onmessage = function incoming(data) {
              console.log(`Roundtrip time: ${Date.now() - data.data} ms`);

              setTimeout(function timeout() {
                ws.send(Date.now());
              }, 500);
            };
            */

        
    //}
  
};

export const mineManager = new  MineManager();