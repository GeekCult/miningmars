import React from 'react'



type ButtonProps = {

};

const Footer = ({


    
}: ButtonProps): JSX.Element => {
        

    return (
        <div className="Footer">
            <div className="container mgT2">
                <hr className="hrSpecial"/>
                <div className='cflx'>
                    <div className="fr1">
                        <a href="https://tezostaquito.io/" target="_blank" title="Takito SDK for Tezos Blockchain">
                            <img src="./imagens/built-with-taquito.png" alt="taquito" />
                        </a>
                    </div>
                    <div className="fr1 cflx justify-right">
                        <a href="https://tezos.com/" target="_blank" title="Tezos Blockchain">
                            <img src="./imagens/xtz.png" alt="tezos" height="40"/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="modal">
            </div>
        </div>
    );
};

export default Footer;