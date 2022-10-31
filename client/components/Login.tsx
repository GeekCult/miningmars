import React, { useState, Dispatch, SetStateAction } from "react";
import axios, { AxiosResponse } from "axios";

const Login = ({
  setUserBalance,
  userAddress
}: {
  setUserBalance: Dispatch<SetStateAction<number>>;
  userAddress: string;
}): JSX.Element => {

    const [recipient, setRecipient] = useState<string>("");
    const [nameUser, setNameUser] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    
    const submitUser = async (props: any): Promise<AxiosResponse> => {
        
        // Send data to the backend via POST
        const save = await axios.post("/user/save", {'name': props.name} )
        .then(response => { 
            //toast.show({ title: response.data['message'], content: "", duration: 4000, mode: "success", image: ""});
            return response.data; 
        })
        .catch(error => {  
            //toast.show({ title: error, content: "", duration: 4000, mode: "error", image: ""});
            console.error('There was an error!', error); 
        }); 
        
        return save;
    }

    return (
        <div className="modal-lg p-15">
            <div className="row">
                <div className="col-md-5 hide_resp">
                    <h4 className="mgB">Login</h4>
                    <div className="form-group">
                        <label>User</label>
                        <input type="text" placeholder="Type your e-mail" className="form-control txt-plus mgR0" value={recipient} onChange={e => setRecipient(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Pass</label>
                        <input type="password" placeholder="Type your password" className="form-control txt-plus mgR0" value={recipient} onChange={e => setRecipient(e.target.value)}/>
                    </div>
                    <hr/>
                    <button type="button" className="btn btn-main">Login</button>
                </div>
                <div className="col-md-7">
                    <h4 className="mgB">Create a new account</h4>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" placeholder="Type your full name" className="form-control txt-plus mgR0" value={nameUser} onChange={e => setNameUser(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>E-mail</label>
                        <input type="text" placeholder="Type your e-mail" className="form-control txt-plus mgR0" value={recipient} onChange={e => setRecipient(e.target.value)}/>
                    </div>
                    <hr/>
                    <button type="button" className="btn btn-main" onClick={() => { submitUser({name: nameUser}); } } >Signin</button>
                </div>
            </div>
        </div>

    );
};

export default Login;