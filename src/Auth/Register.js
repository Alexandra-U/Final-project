import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import { Redirect } from 'react-router-dom';


const errorMessages = {
    'username': 'You must enter a username!',
    'password': 'You must enter a password!',
    'retype-password': 'You must retype the password!',
    'different-passwords': 'You must enter the same password twice!',
};

export default function Register() {

    const [formData, setFormData] = useState({
        'username': '',
        'password': '',
        'retype-password': ''
    });

    const [formError, setFormError] = useState({
        'username': '',
        'password': '',
        'retype-password': '',
        'different-passwords': ''
    });

    const [globalErrorMessage, setGlobalError] = useState('');
    const [isSuccessfull, setSuccessfull] = useState(false);
    const [isDirty, setDirty] = useState(false);
    const { setUser } = useContext(AuthContext);
    

    async function handleSubmit(e) { 
        e.preventDefault(); 

        setGlobalError('');
        setSuccessfull(false);
        const isInvalid = validateFormData();

        if(!isInvalid) {
            setDirty(false);
            try {
                const data = {...formData};
                delete data["retype-password"];

                const existingUser = await axios('http://localhost:4000/users?username=' + data.username).then(res=>res.data);
                if(existingUser.length) {
                    setGlobalError('User already exists');
                    return;
                }

                const res = await axios('http://localhost:4000/users', {
                    data: data,
                    method: 'POST'
                })
                console.log(res);

                if(res.data) {
                    setUser(res.data);
                    localStorage.setItem('user', JSON.stringify(res.data));
                    setSuccessfull(true);
                } else { 
                    isInvalid(true);
                }


            } catch(e) {   
                console.warn(e); 
            }
        }
    }



    function validateFormData() {
        const inputs = ['username', 'password', 'retype-password'];
        const newError = { ...formError };
        let isInvalid = false;
        
        for(const input of inputs) {
            if(!formData[input]) {
                newError[input] = errorMessages[input];
                isInvalid = true;
            }     
        }

    
        if(formData.password !== formData['retype-password']) {
           newError['different-passwords'] = errorMessages['different-passwords'];
           isInvalid = true;
        }

        setFormError(newError);
        return isInvalid;
    }


    function handleInputChange(e) {
      
        setDirty(true);

        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        });

     
        const newError = { 
            ...formError, 
            [e.currentTarget.id]: '',
        };

        if(e.currentTarget.id === 'password' || e.currentTarget.id === 'retype-password') {
            newError['different-passwords'] = '';
        }
        setFormError(newError);  
    }

    

    return (
        <>
            

            {  (globalErrorMessage ?  
                <div className="alert-danger" role="alert">
                 We already have this username. Try another one!
                </div>
            : null) }

            { (isSuccessfull ?  
                <div className="alert-success" role="alert">
                        <Redirect to="/" />

                </div>
            : null) }

            

            <form  className= "form-container" onSubmit={ handleSubmit }>
                <div className="form-group">   
                    <input 
                        onChange={ handleInputChange }
                        value={ formData.username }
                        type="text"
                        className={ 'form-control' + (formError.username ? ' is-invalid' : '') }
                        id="username"
                        name = 'username'
                        placeholder="Enter username"
                    />
    
                <div className="invalid-feedback">
                        { formError.username }
                    </div>
                </div>

                <div className="form-group">     
                    <input
                        onChange={ handleInputChange }
                        value={ formData.password }
                        type="password"
                        className={ 'form-control' + (formError.password ? ' is-invalid' : '') }
                        id="password"
                        placeholder="Password"
                    />
                 <div className="invalid-feedback">
                        { formError.password }
                    </div>
                </div>

                <div className="form-group">     
                    <input
                        onChange={ handleInputChange }
                        value={ formData['retype-password'] }
                        type="password"
                        className={ 'form-control' + (formError['retype-password'] || formError['different-passwords']  ? ' is-invalid' : '') }
                        id="retype-password"
                        placeholder="Retype Password" 
                    />
                 <div className="invalid-feedback">
                        { formError['retype-password'] }
                        { formError['retype-password'] ? <br /> : '' }
                        { formError['different-passwords'] }
                    </div>
                    
                    
                </div>
                <button type="submit" className="btn" disabled={ !isDirty }>Register</button>        
            </form>
        </>
    )
}