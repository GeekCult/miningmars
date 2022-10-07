import React, { useState, Dispatch, SetStateAction } from "react";
import { toast } from "../components/ToastManager";
import axios, { AxiosResponse } from "axios";

const Marketplace = ({
  items, store, toggle, Modal, props
  
}: {
  
  items: any; store: any; toggle: any; Modal: any;
  
}): JSX.Element => {
    
    const [ctnItems, setCtnItems] = useState<string>("");
    const [ctnProfile, setCtnProfile] = useState<string>("active");
    const [coins, setCoins] = useState<string>("1");
    const [amount, setAmount] = useState<string>("1");
    
    const closeOverScreen = function() {
        const element = document.getElementById('overScreen');
        element.classList.remove("act");
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
    
    const runIt = async (props: any): Promise<AxiosResponse> => {
        
        if(props.action == 'Buy'){
            props.props.setTitleModal("Buy");
            let image = "../imagens/" + props.item.image;
            props.props.setContentModal( <div className="width350 center"><img src={image} alt="item" /><div className="bold center"> Delete this item from your Inventory? </div> <hr/><div className="center"><button className="btn btn-plus btn-success" onClick={ props.props.toggle() }>No</button> <button className="btn btn-plus btn-red" onClick={ () => runIt({action: 'Consume', props: props}) }>Yes</button></div> </div> );
            props.props.toggle();
        }
        
        if(props.action == 'Use'){
            props.props.setTitleModal("Use");
            let image = "../imagens/" + props.item.image;
            props.props.setContentModal( <div className="width350 center"><img src={image} alt="item" /><div className="bold center"> Do you want to use this item? </div> <hr/><div className="center"><button className="btn btn-plus btn-red" onClick={ props.props.toggle() }>No</button> <button className="btn btn-plus btn-success" onClick={ () => runIt({action: 'Consume', props: props}) }>Yes</button></div> </div> );
            props.props.toggle();
        }
        
        if(props.action == 'Consume'){
            toast.show({ title: 'Your it was consumed', content: "", duration: 4000, mode: "success", image: "../imagens/ic_success.png"});
        }
        
    }
    

    return (
        <div className="Marketplace centerView">
            <div className="btn-close pointer" onClick={closeOverScreen}><i className="fa fa-times"></i></div>
            <h2 className="mgB title titleUp">MarketPlace</h2>
            <div className="nav-horizontal">
                <button className={ctnProfile} onClick={ () => { handleTab({action: 'ctnProfile'}) }} type="button">Store</button> 
                <button className={ctnItems} onClick={ () => { handleTab({action: 'ctnItems'}) }} type="button">Trades</button>
            </div>
            <div id="ctnProfile" className={ctnProfile} style={{maxHeight: '400px', overflow: 'auto'}}>
                <div className="cflx gap-10 mgB">
                    <div className="fr4">
                        <input type="text" placeholder="Search for a special item" className="form-control txt-plus mgR0" value="" onChange={e => alert('search')} />
                    </div>
                    <div className="fr4">
                        <button className="btn btn-main btn-plus" onClick={ () => { alert('Search');} } >
                            <i className="fa fa-search"></i> Search
                        </button>
                    </div>
                </div>
                <div className="row">
                    { Object.keys(store.data.data).map((d)=>{ return(
                    <div className="col-md-6" key={store.data.data[d].id}>
                        <div className="pp_square_black">
                            <div className="cflx">
                                <div className="fr2">
                                    <img src={"./imagens/" + store.data.data[d].image} height="120" className="mgR2"/>
                                    
                                </div>
                                <div className="fr4">
                                    <div className="cflxss">
                                        <div className="fr1">
                                            <h3 className="title mg0">{store.data.data[d].title}</h3>
                                            <p className="paragraph txt-white" style={ {height: '50px'} }>{store.data.data[d].description}</p>
                                        </div>
                                        <div className="fr1 cflx center-flex">
                                            <div className="fr1">
                                                <button className="btn btn-success" onClick={() => { runIt({item: store.data.data[d], props: props, action: 'Buy'}); } }><i className="fa fa-shopping-cart"></i> Buy</button>
                                            </div>
                                            <div className="cflx fr1 justify-right">
                                                <img src="../imagens/ic_coin.png" alt="" height="20"/>
                                                <div className="mgL txt-white">{store.data.data[d].value}</div>
                                            </div>
                                        </div>
                                    </div>
                                                       
                                </div>
                            </div>
                        </div>
                    </div>
                    ) }) 
                    }
                </div>
            </div>
            <div id="ctnItems" className={ctnItems} style={{maxHeight: '400px', overflow: 'auto'}}>
                <div className="cflx gap-10 mgB">
                    <div className="fr4">
                        <input type="text" placeholder="Search for a special item" className="form-control txt-plus mgR0" value="" onChange={e => alert('search')} />
                    </div>
                    <div className="fr4">
                        <button className="btn btn-main btn-plus" onClick={ () => { alert('Search');} } >
                            <i className="fa fa-search"></i> Search
                        </button>
                    </div>
                </div>
                { Object.keys(items.data.data).map((d)=>{ return(
                <div className="cflx gap-10 pp_square_black center-flex" key={items.data.data[d].id}>
                    <div className="fr5">
                        <div className="cflx center-flex">
                            <img src={"./imagens/" + items.data.data[d].image} height="40" className="mgR2"/>
                            <div className="badge2 mgR">{items.data.data[d].amount} x</div>
                            <h3 className="title mg0">{items.data.data[d].title}</h3>

                        </div>

                    </div>
                    <div className="fr2 cflx center-flex">
                        <img src="../imagens/ic_coin.png" alt="" height="20"/>
                        <div className="mgL txt-white">{items.data.data[d].coins}</div>                    
                    </div>
                    <div className="fr1 cflx justify-right">
                        <button className="btn btn-success" onClick={() => {alert('oo')} }><i className="fa fa-shopping-cart"></i> Buy</button>
                    </div>
                </div>
                ) }) 
                }
            </div>
        </div>
    );
};

export default Marketplace;