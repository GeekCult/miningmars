import React, { useState, Dispatch, SetStateAction } from "react";
import { toast } from "../components/ToastManager";
import axios, { AxiosResponse } from "axios";

const Trade = ({
  item
  
}: {
  
  item: any;
  
}): JSX.Element => {
    
    const image = "../imagens/" + item.image;
    const [coins, setCoins] = useState<string>("1");
    const [amount, setAmount] = useState<string>("1");
    
    const closeOverScreen = function() {
        const element = document.getElementById('overScreen');
        element.classList.remove("act");
    }
    
    const closeOverScreen2 = function() {
        const element = document.getElementById('overScreen2');
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
    

    return (
        <div className="Trade centerView">
            <div className="btn-close pointer" onClick={closeOverScreen2}><i className="fa fa-times"></i></div>
            <h2 className="mgB title">Trade</h2>
            <div className="cflx gap-10">
                <div className="fr1 mgR2">
                    <img src={image} alt={item.title} />
                </div>
                <div className="fr3">
                    <h3 className="title">{item.title}</h3>
                    <p className="txt-white paragraph">{item.description}</p>
                    <div className="cflx">
                        <div>
                            <label className="txt-white">Quantity</label>
                            <input type="number" className="form-control txt-plus mgR2 width-100" placeholder="Amount" value={amount} min="1" max={item.amount} onChange={ e => setAmount(e.target.value) }/>
                        </div>
                        <div>
                            <label className="txt-white">Coins</label>
                            <input type="number" className="form-control txt-plus mgR2 width-100" placeholder="Coins" value={coins} min="1" onChange={ e => setCoins(e.target.value) }/>
                        </div>
                        <div>
                            <label className="txt-white">&nbsp;</label>
                            <div className="clear"></div>
                            <button className="btn btn-main btn-plus" onClick={ () => { sellItem({id: item.id, amount: amount, coins: coins, title: item.title, image: item.image}) } }><i className="fa fa-check"></i> Sell</button>
                        </div>
                        
                    </div>
                    
                </div>
                <div className="fr1">
                    
                </div>
            </div>
            <p className="sF2 legend">This action cannot be undone</p>
        </div>
    );
};

export default Trade;