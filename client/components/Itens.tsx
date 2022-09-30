import { render } from 'react-dom';
import { Modal } from '../components/Modal';
import { useModal } from '../components/useModal';
import { PurchaseModal } from '../components/purchase-modal';
import React, { useState } from "react";

type ItemsProps = {
    wallet:(any);
    Tezos:(any);
    setTezos: (any);
}

const Itens = ({Tezos, setTezos, wallet}: ItemsProps): JSX.Element => {
        
    const { isShown, toggle } = useModal();
    const onConfirm = () => toggle();
    const onCancel = () => toggle();
    const [valueE, setValueE] = useState<string>("");
    const [titleE, setTitleE] = useState<string>("");
    const [priceE, setPriceE] = useState<any>(0);
    const v1 = 1;
    
    const clickItem: React.MouseEventHandler<HTMLElement> = (e) => {
        
        try {
            setValueE(e.currentTarget.dataset.src as string);
            setTitleE(e.currentTarget.dataset.title as string);
            setPriceE(e.currentTarget.dataset.price as any);
            //console.log(valueE);
            toggle();
            
        } catch (error) {
            console.log(error);
        }
        
    }
    
    return (
        <div className="Itens">
            <div className="container">
                <h2 className="txt-white"><span className="txt-orange">C</span>hoose your tool</h2>
                <div className='cflx mgT2 gap-20'>
                    <div className="fr1">
                        <div className="pp_square_dark">
                            <img src="./imagens/sinzel.png" alt="item" />
                            <div className="cflx center-flex">
                                <div className="fr1">
                                    <h3 className="txt-white">Sinzel</h3>
                                </div>
                                <div className="fr1 cflx justify-right">
                                    <p className="txt-white sF">{v1} ꜩ</p>
                                </div>
                            </div>
                            <div className="cflx gap-10 mgB2">
                                <div className="cflx gap-10 center-flex ctnIcItem">
                                    <img src="../imagens/ic_power_bw.png" alt="power" height="15"/>
                                    <div>1</div>
                                </div>
                                <div className="cflx gap-10 center-flex ctnIcItem">
                                    <img src="../imagens/ic_heart_bw.png" alt="stamina" height="15"/>
                                    <div>1</div>
                                </div>
                                <div className="cflx gap-10 center-flex ctnIcItem">
                                    <img src="../imagens/ic_luck_bw.png" alt="luck" height="15"/>
                                    <div>0</div>
                                </div>
                            </div>
                            <button className="btn btn-orange" onClick={clickItem} data-src="./imagens/sinzel.png" data-id="1" data-title="Sinzel" data-price={v1}><i className="fa fa-shopping-cart mgR0"></i>Buy</button>
                        </div>
                    </div>
                    <div className="fr1">
                        <div className="pp_square_dark">
                            <img src="./imagens/picareta.png" alt="item" />
                            <div className="cflx center-flex">
                                <div className="fr1">
                                    <h3 className="txt-white">Pickaxe</h3>
                                </div>
                                <div className="fr1 cflx justify-right">
                                    <p className="txt-white sF">{v1 + 1} ꜩ</p>
                                </div>
                            </div>
                            <div className="cflx gap-10 mgB2">
                                <div className="cflx gap-10 center-flex ctnIcItem">
                                    <img src="../imagens/ic_power_bw.png" alt="power" height="15"/>
                                    <div>2</div>
                                </div>
                                <div className="cflx gap-10 center-flex ctnIcItem">
                                    <img src="../imagens/ic_heart_bw.png" alt="stamina" height="15"/>
                                    <div>1</div>
                                </div>
                                <div className="cflx gap-10 center-flex ctnIcItem">
                                    <img src="../imagens/ic_luck_bw.png" alt="luck" height="15"/>
                                    <div>0</div>
                                </div>
                            </div>
                            <button className="btn btn-orange" onClick={clickItem} data-src="./imagens/picareta.png" data-id="2" data-title="Pickaxe" data-price={v1 + 1}><i className="fa fa-shopping-cart mgR0"></i>Buy</button>
                        </div>
                    </div>
                    <div className="fr1">
                        <div className="pp_square_dark">
                            <img src="./imagens/dinamite.png" alt="item" />
                            <div className="cflx center-flex">
                                <div className="fr1">
                                    <h3 className="txt-white">Dinamite</h3>
                                </div>
                                <div className="fr1 cflx justify-right">
                                    <p className="txt-white sF">{v1 + 2} ꜩ</p>
                                </div>
                            </div>
                            <div className="cflx gap-10 mgB2">
                                <div className="cflx gap-10 center-flex ctnIcItem">
                                    <img src="../imagens/ic_power_bw.png" alt="power" height="15"/>
                                    <div>4</div>
                                </div>
                                <div className="cflx gap-10 center-flex ctnIcItem">
                                    <img src="../imagens/ic_heart_bw.png" alt="stamina" height="15"/>
                                    <div>3</div>
                                </div>
                                <div className="cflx gap-10 center-flex ctnIcItem">
                                    <img src="../imagens/ic_luck_bw.png" alt="luck" height="15"/>
                                    <div>1</div>
                                </div>
                            </div>
                            <button className="btn btn-orange" onClick={clickItem} data-src="./imagens/dinamite.png" data-id="3" data-title="Dinamite" data-price={v1 + 2} data-p="3" data-s="2" data-luck="1"><i className="fa fa-shopping-cart mgR0"></i>Buy</button>
                        </div>
                    </div>
                    <div className="fr1">
                        <div className="pp_square_dark">
                            <img src="./imagens/shovel.png" alt="item" />
                            <div className="cflx center-flex">
                                <div className="fr1">
                                    <h3 className="txt-white">Shovel</h3>
                                </div>
                                <div className="fr1 cflx justify-right">
                                    <p className="txt-white sF">{v1 + 3} ꜩ</p>
                                </div>
                            </div>
                            <div className="cflx gap-10 mgB2">
                                <div className="cflx gap-10 center-flex ctnIcItem">
                                    <img src="../imagens/ic_power_bw.png" alt="power" height="15"/>
                                    <div>3</div>
                                </div>
                                <div className="cflx gap-10 center-flex ctnIcItem">
                                    <img src="../imagens/ic_heart_bw.png" alt="stamina" height="15"/>
                                    <div>2</div>
                                </div>
                                <div className="cflx gap-10 center-flex ctnIcItem">
                                    <img src="../imagens/ic_luck_bw.png" alt="luck" height="15"/>
                                    <div>1</div>
                                </div>
                            </div>
                            <button className="btn btn-orange" onClick={clickItem} data-src="./imagens/shovel.png" data-id="4" data-title="Shovel" data-price={v1 + 3}><i className="fa fa-shopping-cart mgR0"></i>Buy</button>
                        </div>
                    </div>
                </div>
                <div className="mods">
                    <Modal isShown={isShown} hide={toggle} modalContent={ <PurchaseModal  onConfirm={onConfirm} imageSrc={valueE} titleItem={titleE} Tezos={Tezos} price={priceE} message=""/> } headerText="Buy"/>
                </div>
            </div>
        </div>
    );
};

export default Itens;