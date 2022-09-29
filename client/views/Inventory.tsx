import React, { useState, Dispatch, SetStateAction } from "react";
import { toast } from "../components/ToastManager";
import axios, { AxiosResponse } from "axios";
import Trade from "../views/Trade";

const Inventory = ({
  items, props
  
}: {
  
  items: any; props: any;
  
}): JSX.Element => {
    
    //const image = "../imagens/" + item.image;
    const [coins, setCoins] = useState<string>("1");
    const [amount, setAmount] = useState<string>("1");
    
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
                toast.show({ title: response.data['message'], content: "", duration: 4000, mode: "success"});
                return response.data; 
            })
            .catch(error => {  
                toast.show({ title: error, content: "", duration: 4000, mode: "error"});
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
    
    const runIt = async (props: any): Promise<AxiosResponse> => {
        
        if(props.action == 'Delete'){
            props.props.setTitleModal("Delete");
            props.props.setContentModal( <div className="width350"><div className="bold center"> Delete this item from your Inventory? </div> <hr/><div className="center"><button className="btn btn-plus btn-red" onClick={ props.props.toggle() }>No</button> <button className="btn btn-plus btn-success" onClick={ () => runOk() }>Yes</button></div> </div> );
        }
        if(props.action == 'Use'){
            props.props.setTitleModal("Use");
            props.props.setContentModal( <div className="width350"><div className="bold center"> Do you want to use this item? </div> <hr/><div className="center"><button className="btn btn-plus btn-red" onClick={ props.props.toggle() }>No</button> <button className="btn btn-plus btn-success" onClick={ () => runOk() }>Yes</button></div> </div> );
        }
        props.props.toggle();
    }

    return (
        <div className="Inventory centerView">
            <div className="btn-close pointer" onClick={closeOverScreen}><i className="fa fa-times"></i></div>
            <h2 className="title titleUp">Inventory</h2>
            { Object.keys(items.data.data).map((d)=>{ return(
            <div className="pp_square_black cflx gap-10 center-flex" key={items.data.data[d].id}>
                <div className="fr1 mgR2">
                    <img src={"./imagens/" + items.data.data[d].image} height="40" className="mgR2"/>
                </div>
                <div className="fr1 center mgR"><div className="badge3">{items.data.data[d].amount} x</div></div>
                <div className="fr5 cflx center-flex">
                    <h3 className="title mg0">{items.data.data[d].title}</h3>                    
                </div>
                <div className="fr2 gap-10 cflx justify-right">
                    <button className="btn btn-success btn-sm" onClick={() => { runIt({id: items.data.data[d].id, props: props, action: 'Use'});   }}> <i className="fa fa-check-circle"></i> Use</button>
                    <button className="btn btn-main btn-sm" onClick={() => { tradeIt({id: items.data.data[d].id, props: props});   }} > <i className="fa fa-compass"></i> Trade</button>
                    <button className="btn btn-red btn-sm" onClick={() => { runIt({id: items.data.data[d].id, props: props, action: 'Delete'});   }}> <i className="fa fa-times"></i></button>
                </div>
            </div>
            ) }) 
            }
        </div>
    );
};

export default Inventory;