import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import './Login.css';
import InputControl from '../InputControl/InputControl';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase';

function Login() {

    useEffect(() => {
         localStorage.setItem("search", "")
    }, [])

    const navigate = useNavigate();
    const [values, setValues] = useState({
      email: "",
      pass: "",
    });
  
  const [errorMsg, setErrorMsg] = useState(" ");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  
    const handleSubmission = () => {
      
      if(!values.email || !values.pass){
          setErrorMsg("Fill all Fields")
          return;
      }
      setErrorMsg("");
      
      setSubmitButtonDisabled(true);
      signInWithEmailAndPassword(auth, values.email, values.pass).then(async(res)=>{
          setSubmitButtonDisabled(false);
        
         localStorage.setItem("id", values.email)
          navigate("dashboard");
          
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
        <div className="container1">
          <div className="innerBox">
              <h1 className="heading">Login</h1>

              <InputControl label='Email' placeholder="Enter email address"
              onChange={(event) =>setValues((prev) =>({...prev,email:event.target.value}))} />
              <InputControl label='Password' placeholder="Enter password"
              onChange={(event) =>setValues((prev) =>({...prev,pass:event.target.value}))} />
              <div className="footer">
                <b className="error">{errorMsg}</b>
                <button disabled={submitButtonDisabled} onClick={handleSubmission}>Login</button>
                <p>
                    Already have an account?{" "} 
                    <span>
                        <Link to="/signup">
                           Sign up
                        </Link>
                    </span>
                </p>
              </div>
          </div>
        </div>
    )
}

export default Login
