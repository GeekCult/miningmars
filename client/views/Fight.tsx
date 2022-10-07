import React, { useState, Dispatch, SetStateAction } from "react";
import { toast } from "../components/ToastManager";
import { consumeManager } from "../components/ConsumeManager";
import axios, { AxiosResponse } from "axios";
import Trade from "../views/Trade";

const Fight = ({
  items, user, props
  
}: {
  
  items: any; user: any; props: any;
  
}): JSX.Element => {
    
    const [ctnItems, setCtnItems] = useState<string>("");
    const [ctnProfile, setCtnProfile] = useState<string>("active");
    const [coins, setCoins] = useState<string>("1");
    const [amount, setAmount] = useState<string>("1");
    
    //console.log(user);
    const closeOverScreen = function() {
        const element = document.getElementById('overScreen');
        element.classList.remove("act");
    }
    
    const sellItem = async (props: any): Promise<AxiosResponse> => {
        
        try{
            const baseUrl: string = "http://localhost:3000"
            
            // Send data to the backend via POST
            const sell = await axios.post(baseUrl + "/inventory/sell", {'id_item': props.id, 'id_user': 0, 'amount': props.amount, 'coins': props.coins, 'title': props.title, 'image': props.image} )
            .then(response => { 
                toast.show({ title: response.data['message'], content: "", duration: 4000, mode: "success", image: ""});
                return response.data; 
            })
            .catch(error => {  
                toast.show({ title: error, content: "", duration: 4000, mode: "error", image: ""});
                console.error('There was an error!', error); 
            }); 
        
            
            return sell;
            
        } catch (error: any) {
            throw new Error(error);
        }
    }
    
    const tradeIt = async (props: any): Promise<AxiosResponse> => {
        
        let baseUrl: string = "http://localhost:3000"
        
        let item: AxiosResponse = await axios.get(
            baseUrl + "/inventory/item", {params: {nr: props.id}} 
        )

        //alert('oo');
        let element = document.getElementById('overScreen2');
        //console.log(props);
        props.props.setContentOverScreen2(<Trade item={item.data.data}/>);
        element.classList.add("act");
        
        return baseUrl;
    }
    
    const runOk = function() {
        try {
            
            console.log('ehrehr');
            
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleTab = function(props: any) {
        try {
            setCtnProfile("");setCtnItems("");
            
            if(props.action == 'ctnItems'){setCtnItems("active");}
            if(props.action == 'ctnProfile'){setCtnProfile("active");}
            
        } catch (error) {
            console.log(error);
        }
    }
    
    const runIt = async (props: any): Promise<AxiosResponse> => {
         
        if(props.action == 'Delete'){
            props.props.setTitleModal("Delete");
            let image = "../imagens/" + props.item.image;
            props.props.setContentModal( <div className="width350 center"><img src={image} alt="item" /><div className="bold center"> Delete this item from your Inventory? </div> <hr/><div className="center"><button className="btn btn-plus btn-success" onClick={ props.props.toggle() }>No</button> <button className="btn btn-plus btn-red" onClick={ () => runIt({action: 'Consume', item:props.item, props: props}) }>Yes</button></div> </div> );
            props.props.toggle();
        }
        
        if(props.action == 'Use'){
            props.props.setTitleModal("Use");
            let image = "../imagens/" + props.item.image;
            props.props.setContentModal( <div className="width350 center"><img src={image} alt="item" /><h3 className="title">{props.item.title}</h3><div className="bold center"> Do you want to use this item? </div> <hr/><div className="center"><button className="btn btn-plus btn-red" onClick={ props.props.toggle() }>No</button> <button className="btn btn-plus btn-success" onClick={ () => runIt({action: 'Consume', item:props.item, props: props}) }>Yes</button></div> </div> );
            props.props.toggle();
        }
        
        if(props.action == 'Consume'){
            let consumeIt = await consumeManager.consumeItem(props.item)
                .then(response => {  return response; } )
                .catch(error => { console.error('There was an error!', error); }); 
                
                console.log(consumeIt);            
        }
        
    }
    
    return (
        <div className="Fight centerView ctnFight">
            <div className="btn-close pointer" onClick={closeOverScreen}><i className="fa fa-times"></i></div>
            <h2 className="title titleUp">Fight</h2>
            
            <div id="ctnFight">
                <div className="row">
                    <div className="col-md-6">
                        <div className="ctnIn">
                            <div className="cflx center-flex">
                                <img src="../imagens/ic_power_pp.png" alt="" height="15" className="mgR0"/>
                                <div>5 Power</div>
                            </div>
                            <div className="cflx center-flex">
                                <img src="../imagens/ic_shield_pp.png" alt="" height="15" className="mgR0"/>
                                <div>3 Defense</div>
                            </div>
                            <div className="cflx center-flex">
                                <img src="../imagens/ic_luck_pp.png" alt="" height="15" className="mgR0"/>
                                <div>2 Luck</div>
                            </div>
                            <div className="cflx center-flex">
                                <img src="../imagens/ic_heart_pp.png" alt="" height="15" className="mgR0"/>
                                <div>10 Life</div>
                            </div>
                        </div>
                        <img src="../imagens/astronaut.png" alt="player1"/>
                    </div>
                    <div className="col-md-6">
                        <div className="ctnInRight">
                            <div>Power 9</div>
                            <div>Defense 4</div>
                            <div>Luck 1</div>
                            <div>Life 14</div>
                        </div>
                        <img src="../imagens/monster.png" alt="player2" />
                    </div>
                </div>
                              
            </div>
            <div className="bar-dark">
                <div className="row">
                    <div className="col-md-6">
                        <div className="CtnItFl r">
                            <div className="ctnBtFight">
                                <div className="cflx gap-10">
                                    <div className="fr1">
                                        <button className="btnFight btnFightL btn-block">Inventory</button>
                                    </div>
                                    <div className="fr1">
                                        <button className="btnFight btnFightC btn-block">Attack</button>
                                    </div>
                                    <div className="fr1">
                                        <button className="btnFight btnFightR btn-block">Flee</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bar-ind">
                            
                            <div className="cflx center-flex">
                                <div className="ctnName fr1">
                                    <h3 className='title'>Astrounaut</h3>
                                    <p className='txt-white'>Level: 1</p>
                                </div>
                                <div className="ctnName fr1 cflx justify-right">
                                    <img src="../imagens/sinzel.png" alt="tool" height="50" className='mgL'/>
                                    <img src="../imagens/artfact_shell.png" alt="tool" height="50" className='mgL'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 ">
                        <div className="bar-ind">
                            <h3 className='title'>Zork</h3>
                            <p className='txt-white'>Level: 3</p>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    );
};

export default Fight;