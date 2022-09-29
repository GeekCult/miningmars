import React from 'react'
import { render } from 'react-dom';
import { Modal } from '../components/Modal';
import { useModal } from '../components/useModal';
import { ConfirmationModal } from '../components/confirmation-modal';
import { mineManager } from "../components/MineManager";

type ButtonProps = {
    Modal: (any),
    wallet: (any),
    userAddress: (any),
    toast: (any),
};



const MineButton = ({
    Modal, wallet, userAddress, toast

    
}: ButtonProps): JSX.Element => {
        
    const { isShown, toggle } = useModal();
    const onConfirm = () => toggle();
    const onCancel = () => toggle();
    
    const runMine = function() {
        try {
            
            if(userAddress === '' || wallet === null){
                toggle();
                
            }else{
                
                let result = mineManager.mine();
                return result;
            }
            
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <div className="MineButton bg-black2">
            <div className="container">
                <div className='center p-20'>
                    <button className="btn btn-orange btn-lg btn-mine" onClick={runMine}>
                    <i className="fas fa-dice mgR0"></i> Mine</button>
                <Modal isShown={isShown} hide={toggle} modalContent={
                <ConfirmationModal
                onConfirm={onConfirm}
                onCancel={onCancel}
                message="You need to Connect your wallet first"
            /> } headerText="Ops"/>
                </div>
            </div>
        </div>
    );
};

export default MineButton;