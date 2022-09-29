import React, { useState, Dispatch, SetStateAction } from "react";
import { toast } from "../components/ToastManager";
import axios, { AxiosResponse } from "axios";

const Marketplace = ({
  items, toggle, Modal,
  
}: {
  
  items: any; toggle: any; Modal: any;
  
}): JSX.Element => {
    
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
    

    return (
        <div className="Marketplace centerView">
            <div className="btn-close pointer" onClick={closeOverScreen}><i className="fa fa-times"></i></div>
            <h2 className="mgB title titleUp">MarketPlace</h2>
            <div className="cflx gap-10 mgB">
                <div className="fr4">
                    <input type="text" placeholder="Search an special item" className="form-control txt-plus mgR0" value="" onChange={e => alert('hehe')} />
                </div>
                <div className="fr1">
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
                <div className="fr2">
                    <div className="mgR txt-white">{items.data.data[d].coins} <i className="fab fa-bitcoin txt-yellow"></i></div>
                </div>
                <div className="fr1 cflx justify-right">
                    <button className="btn btn-success" onClick={toggle}><i className="fa fa-shopping-cart"></i> Buy</button>
                </div>
            </div>
            ) }) 
            }
        </div>
    );
};

export default Marketplace;