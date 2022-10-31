import React, { useState, Dispatch, SetStateAction } from "react";
import { toast } from "../components/ToastManager";
import { consumeManager } from "../components/ConsumeManager";
import axios, { AxiosResponse } from "axios";
import Trade from "../views/Trade";

const Inventory = ({
  items, user, props
  
}: {
  
  items: any; user: any; props: any;
  
}): JSX.Element => {
    
    const [ctnItems, setCtnItems] = useState<string>("");
    const [ctnProfile, setCtnProfile] = useState<string>("active");
    const [ctnSpells, setCtnSpells] = useState<string>("");
    const [coins, setCoins] = useState<string>("1");
    const [amount, setAmount] = useState<string>("1");
    
    //console.log(user);
    const closeOverScreen = function() {
        const element = document.getElementById('overScreen');
        element.classList.remove("act");
    }
    
    const sellItem = async (props: any): Promise<AxiosResponse> => {
        
        try{
            //const baseUrl: string = "http://localhost:3000"
            let baseUrl: string = ""
            
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
        
        //let baseUrl: string = "http://localhost:3000"
        let baseUrl: string = ""
        
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
            setCtnProfile("");setCtnItems("");setCtnSpells("");
            
            if(props.action == 'ctnItems'){setCtnItems("active");}
            if(props.action == 'ctnProfile'){setCtnProfile("active");}
            if(props.action == 'ctnSpells'){setCtnSpells("active");}
            
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
        <div className="Inventory centerView">
            <div className="btn-close pointer btnCloseOverScreen" onClick={closeOverScreen}><i className="fa fa-times"></i></div>
            <h2 className="title titleUp">Inventory</h2>
            <div className="cflx mgB ctnProfile">
                <div className="fr1 mgR0 hide_resp">
                    <img src="../imagens/avatar.png" alt="avatar" height='100'/>
                </div>
                <div className="fr7">
                    <h2 className="title mg0">Astronaut</h2>
                    <div className="cflx">
                        <p className="txt-white">Level: <b>1</b></p>
                        <p className="txt-gray mgL2"> XP for next level: <b>999</b></p>
                    </div>
                    <div className="cflx">
                        <div className="mgR2 cflx center-flex">
                            <h4 className="title center mgR">XP</h4>
                            <p className="txt-white">{user.xp}</p>
                        </div>
                        <div className="mgR2 cflx center-flex">
                            <h4 className="title center mgR">Energy</h4>
                            <p className="txt-white">{user.stamina}</p>
                        </div>
                        <div className="mgR2 cflx center-flex">
                            <h4 className="title center mgR">Luck</h4>
                            <p className="txt-white">{user.luck}</p>
                        </div>
                        <div className="cflx center-flex">
                            <h4 className="title center mgR">Coins</h4>
                            <p className="txt-white">{user.coin}</p>
                            <img src="../imagens/ic_coin.png" alt="Coin" className="mgL hide_resp" height="20"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nav-horizontal">
                <button className={ctnProfile} onClick={ () => { handleTab({action: 'ctnProfile'}) }} type="button">Equipments</button> 
                <button className={ctnItems} onClick={ () => { handleTab({action: 'ctnItems'}) }} type="button">Items</button>
                <button className={ctnSpells} onClick={ () => { handleTab({action: 'ctnSpells'}) }} type="button">Spells</button>
            </div>
            <div id="ctnProfile" className={ctnProfile}>
                <div className="cflx">
                    <div className="mgR2 slotItems">
                        <img src="../imagens/wood-spoon.png" alt="tool"/>
                    </div>
                    <div className="mgR2 slotItems">
                        <i className="fa fa-plus"></i>
                    </div>
                    <div className="mgR2 slotItems r">
                        <i className="fa fa-plus"></i>
                    </div>
                </div>
                <hr className="hrSpecial2"/>
            </div>
            
            
            <div id="ctnItems" className={ctnItems} style={{maxHeight: '460px', overflow: 'auto'}}>
                { Object.keys(items.data.data).map((d)=>{ if(items.data.data[d].type == '1' && items.data.data[d].amount > 0){ return(
                <div className="pp_square_black cflx gap-10 center-flex" key={items.data.data[d].id}>
                    <div className="fr1">
                        <img src={"./imagens/" + items.data.data[d].image} height="40"/>
                    </div>
                    <div className="fr1 center mgR"><div className="badge2">{items.data.data[d].amount} x</div></div>
                    <div className="fr5 cflx center-flex hide_resp">
                        <h3 className="title mg0">{items.data.data[d].title}</h3>                    
                    </div>
                    <div className="fr2 gap-10 cflx justify-right">
                        <button className="btn btn-success btn-sm" onClick={() => { runIt({item: items.data.data[d], props: props, action: 'Use'});   }}> <i className="fa fa-check-circle"></i> Use</button>
                        <button className="btn btn-main btn-sm" onClick={() => { tradeIt({id: items.data.data[d].id, props: props});   }} > <i className="fa fa-compass"></i> Trade</button>
                        <button className="btn btn-red btn-sm" onClick={() => { runIt({item: items.data.data[d], props: props, action: 'Delete'});   }}> <i className="fa fa-times"></i></button>
                    </div>
                </div>
                ) }}) 
                }
            </div>
            <div id="ctnSpells" className={ctnSpells} style={{maxHeight: '460px', overflow: 'auto'}}>
                <div className="row">
                    { Object.keys(items.data.data).map((d)=>{ if(items.data.data[d].type == '3' && items.data.data[d].amount > 0){ return(
                    <div className="col-md-6" key={items.data.data[d].id}>
                        <div className="pp_square_black cflx gap-10 center-flex" key={items.data.data[d].id}>
                            <div className="cflx gap-15">
                                <div className="fr2">
                                    <div className="slotItems">
                                        <img src={"./imagens/" + items.data.data[d].image} className="mgR2 "/>
                                    </div>
                                </div>
                                <div className="fr4">
                                    <div className="cflxss">
                                        <div className="fr1">
                                            <h3 className="title mg0">{items.data.data[d].title}</h3>
                                            <p className="paragraph txt-white" style={ {height: 'auto'} }>{items.data.data[d].description}</p>
                                        </div>
                                        <div className="fr1 cflx center-flex">
                                            <div className="fr1">
                                                <button className="btn btn-success" onClick={() => { runIt({item: items.data.data[d], props: props, action: 'Buy'}); } }><i className="fa fa-magic"></i> Use</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    ) }}) 
                    }
                </div>
            </div>
        </div>
    );
};

export default Inventory;