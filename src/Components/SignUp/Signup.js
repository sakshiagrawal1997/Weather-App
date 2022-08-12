import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import InputControl from '../InputControl/InputControl';
import './Signup.css';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase';

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });

const [errorMsg, setErrorMsg] = useState(" ");
const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    
    if(!values.name || !values.email || !values.pass){
        setErrorMsg("Fill all Fields")
        return;
    }
    setErrorMsg("");
    
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass).then(async(res)=>{
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user,{
            displayName: values.name,
        });
        navigate("/");
        // console.log(user);
        // console.log(res);
    }
    ).catch((err) => 
    {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message)
        // console.log("Error", err);
    }
        );
  };

    return (
        <div className='container1'>
           <div className="innerBox">
              <h1 className="heading">Sign Up</h1>

              <InputControl label='Name' placeholder="Enter your name"
              onChange={(event) =>setValues((prev) =>({...prev,name:event.target.value}))} />
              <InputControl label='Email' placeholder="Enter email address" 
              onChange={(event) =>setValues((prev) =>({...prev,email:event.target.value}))} />
              <InputControl label='Password' placeholder="Enter password" 
              onChange={(event) =>setValues((prev) =>({...prev,pass:event.target.value}))} />
              
              <div className="footer">
                <b className="error">{errorMsg}</b>
                <button onClick={handleSubmission} disabled={submitButtonDisabled}>Sign Up</button>
                <p>
                    Already have an account?{" "} 
                    <span>
                        <Link to="/">
                           Login
                        </Link>
                    </span>
                </p>
              </div>
          </div>
        </div>
    )
}

export default Signup