import React, {useState,useContext} from 'react'
import {Redirect} from 'react-router-dom'

import firebaseApp from './../firebase/firebaseConfig'
import AuthContext from './../auth/AuthContext'
import styled from 'styled-components'
import FormInput from './../components/forms/FormInput'
import Button from './../components/buttons/Button'


const RegisterPageStyles = styled.aside`
    width: 480px;
    margin: 6rem auto 0;
    header{
        text-align: center;
        margin-bottom: 3rem;
    }
    h2{
        font-size: 2rem;
        font-weight: 700;

    }
    .create-account{
        margin-top: 3rem;
    }
    

`
const RegisterPage = (props) => {

   // const auth = useContext(AuthContext)

   const [email, setEmail]=useState('')
   const[password, setPassword] = useState('')
   const [isValid, setIsValid] = useState(false)
   
        console.log('render')
        //console.log(auth)
     
     const handleClick = (e) =>{
       firebaseApp.auth().createUserWithEmailAndPassword(email, password)
       .then(userCredential=>{
           // email and password input
            //auth.isUser = true
           setIsValid(true)
       })
       .catch(error=>{
          console.log(error.code)
          console.log(error.message)
       })
      

     }

    if(isValid){
        return <Redirect to="/login"/>

    }else{

        return ( 
            <RegisterPageStyles>
                <header>
                    <h2>Unlimited Free Trial Sign Ups</h2>
                    <p>no credit card required</p>
                </header>
                <FormInput label="name on the account" type="text"/>
                <FormInput type="text" label="email" onChange={(e)=> setEmail(e.target.value.trim())}/>
                <FormInput type="text" label="password" onChange={(e)=> setPassword(e.target.value.trim())}/>
                <Button className="create-account" uiStyle="login" label="create a free account" onClick={handleClick}/>
            </RegisterPageStyles>
         );
    }
   

     
}
 
export default RegisterPage;