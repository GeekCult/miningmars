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
    
    const [userPower, setUserPower] = useState<number>(5);
    const [userDefense, setUserDefense] = useState<number>(3);
    const [userLuck, setUserLuck] = useState<number>(1);
    const [userLife, setUserLife] = useState<number>(10);
    const [userTurn, setUserTurn] = useState<boolean>(true);
    
    const [enemyPower, setEnemyPower] = useState<number>(9);
    const [enemyLife, setEnemyLife] = useState<number>(14);
    const [enemyLuck, setEnemyLuck] = useState<number>(0);
    const [enemyDefense, setEnemyDefense] = useState<number>(4);

    const [statusModal, setStatusModal] = useState<string>('');
    
    //console.log(user);
    const closeOverScreen = function() {
        const element = document.getElementById('overScreen');
        element.classList.remove("act");
    }
    
    
    
    const astronautAttack = async (props: any): Promise<AxiosResponse> => {
        
        if(userTurn){
            setUserTurn(false);
            let dano = userPower - enemyDefense;
            if(dano < 0) dano = 0;
            let life = enemyLife - dano;
            setEnemyLife(life);
            enemyAttack();
        }
    }
    
 
    const enemyAttack = async (props: any): Promise<AxiosResponse> => {
            
        let dano = enemyPower - userDefense;
        if(dano < 0) dano = 0;
        let life = userLife - dano;
        setUserLife(life);
        setUserTurn(true);
        
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

        //Runawayy
        if(props.action == 'Flee'){
            setStatusModal('active');
        }

        //Runawayy
        if(props.action == 'RunAway'){
            setStatusModal('');
            closeOverScreen();
        }
        
        //Close Modal Fight
        if(props.action == 'Cancel'){
            setStatusModal('');
        }
    }
    
    return (
        <div className="Fight centerView ctnFight">
            <div className="btn-close pointer hide" onClick={closeOverScreen}><i className="fa fa-times"></i></div>
            <h2 className="title titleUp">Fight</h2>
            
            <div id="ctnFight">
                <div className="row">
                    <div className="col-md-6 hide_resp">
                        <div className="ctnIn">
                            <div className="cflx center-flex">
                                <img src="../imagens/ic_power_pp.png" alt="" height="15" className="mgR0"/>
                                <div>{userPower} Power</div>
                            </div>
                            <div className="cflx center-flex">
                                <img src="../imagens/ic_shield_pp.png" alt="" height="15" className="mgR0"/>
                                <div>{userDefense} Defense</div>
                            </div>
                            <div className="cflx center-flex">
                                <img src="../imagens/ic_luck_pp.png" alt="" height="15" className="mgR0"/>
                                <div>{userLuck} Luck</div>
                            </div>
                            <div className="cflx center-flex">
                                <img src="../imagens/ic_heart_pp.png" alt="" height="15" className="mgR0"/>
                                <div>{userLife} Life</div>
                            </div>
                        </div>
                        <img src="../imagens/astronaut.png" alt="player1"/>
                    </div>
                    <div className="col-md-6">
                        <div className="ctnInRight">
                            <div className="cflx center-flex justify-right">
                                <div>Power {enemyPower}</div>
                                <img src="../imagens/ic_power_pp.png" alt="" height="15" className="mgL0"/>
                            </div>
                            <div className="cflx center-flex justify-right">
                                <div>Defense {enemyDefense}</div>
                                <img src="../imagens/ic_shield_pp.png" alt="" height="15" className="mgL0"/>
                            </div>
                            <div className="cflx center-flex justify-right">
                                <div>Luck {enemyLuck}</div>
                                <img src="../imagens/ic_luck_pp.png" alt="" height="15" className="mgL0"/>
                            </div>
                            <div className="cflx center-flex justify-right">
                                <div>Life {enemyLife}</div>
                                <img src="../imagens/ic_heart_pp.png" alt="" height="15" className="mgL0"/>
                            </div>
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
                                        <button className="btnFight btnFightC btn-block" onClick={astronautAttack}>Attack</button>
                                    </div>
                                    <div className="fr1">
                                        <button className="btnFight btnFightR btn-block" onClick={() => { runIt({action: 'Flee'});   }}>Flee</button>
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
            <div className={'modalFight ' + statusModal }>
                <div className='center'>
                    <h3>Are you sure to flee?</h3>
                    <p>You will lose some energy for this action</p>
                    <button className='btn btn-second mgR' onClick={() => { runIt({action: 'Cancel'});   }}> Cancel</button>
                    <button className='btn btn-main' onClick={() => { runIt({action: 'RunAway'});   }}> Flee</button>
                </div>
            </div>
        </div>
    );
};

export default Fight;