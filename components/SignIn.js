import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {MDBBtn, MDBCardBody, MDBInput} from "mdb-react-ui-kit";


const SignIn = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();
        fetch('/api/signin/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Invalid credentials');
                }
            })
            .then((data) => {
                console.log(data);
                navigate('/')

            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="form-field">
            <MDBCardBody className="form-field">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                     <MDBInput
                        wrapperClass='mb-4'
                        size='lg'
                        id='form1'
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="form-group mt-3">

                        <MDBInput wrapperClass='mb-4'
                              placeholder='Password'
                              size='lg'
                              id='form3'
                              type='password'
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    <Link to={"/"}>
                        <MDBBtn className='ghost-round' size='lg' onClick={handleSignIn}>Sign In</MDBBtn>
                    </Link>
                     <p>If you don't have an account, please click and </p>
                    <Link to={"/api/signup/"}>
                        <p>Register</p>
                    </Link>

                </div>
            </MDBCardBody>
        </div>
    )
}

export default SignIn;