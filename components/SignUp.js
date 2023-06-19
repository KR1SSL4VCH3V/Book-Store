import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
}
    from 'mdb-react-ui-kit';


const SignUp = () => {
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const navigate = useNavigate()

    const handleSignUp = (e) => {
        e.preventDefault();
        const payload = {
            username: username,
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password1,
            password2: password2,
        };

        fetch("/api/signup/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })

            .then((response) => {
                if (response.ok)
                    navigate("/")
                console.log(response)
                return response.json()
            })
            .then((data) => {
                console.log(data);

            })
            .catch((error) => console.log(error));
    };

    return (
        <MDBContainer
            fluid
            className='d-flex align-items-center justify-content-center bg-image'
        >
            <MDBCard className='m-5' style={{maxWidth: '600px'}}>
                <div className="Auth-form-content">
                <MDBCardBody className='form-field'>
                    <h1 className="subtitle">Create an account</h1>
                    <MDBInput
                        wrapperClass='mb-4'
                        size='lg'
                        id='form1'
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <MDBInput wrapperClass='mb-4'
                              placeholder='First Name'
                              size='lg' id='form1'
                              type='text'
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                    />
                    <MDBInput wrapperClass='mb-4'
                              placeholder='Last Name' size='lg'
                              id='form1'
                              type='text'
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}

                    />
                    <MDBInput wrapperClass='mb-4'
                              placeholder='Your Email'
                              size='lg' id='form2'
                              type='email'
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                    />
                    <MDBInput wrapperClass='mb-4'
                              placeholder='Password'
                              size='lg'
                              id='form3'
                              type='password'
                              value={password1}
                              onChange={(e) => setPassword1(e.target.value)}
                    />
                    <MDBInput wrapperClass='mb-4'
                              placeholder='Repeat your password'
                              size='lg'
                              id='form4'
                              type='password'
                              value={password2}
                              onChange={(e) => setPassword2(e.target.value)}
                    />
                    <div className='d-flex flex-row justify-content-center mb-4'>

                    </div>
                    <Link to={"/"}>
                        <MDBBtn className='ghost-round' size='lg' onClick={handleSignUp}>Sign Up</MDBBtn>
                    </Link>
                    <p>Already have an account, please </p>
                    <Link to={'/api/signin'}>
                        <p>Sign In</p>

                    </Link>
                </MDBCardBody>
                    </div>
            </MDBCard>
        </MDBContainer>
    );
}

export default SignUp
