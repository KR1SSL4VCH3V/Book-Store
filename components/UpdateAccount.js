import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const UpdateAccount = ({accountId}) => {
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const navigate = useNavigate()

    useEffect(()=> {
        fetch(`/api/${accountId}/update/`)
            .then((response) => response.json())
            .then((data) => {
                setUsername(data.username)
                setFirstName(data.firstName)
                setLastName(data.lastName)
                setEmail(data.email)
                setPassword1(data.password1)
                setPassword2(data.password2)
            })
            .catch((error) => console.log(error));
    }, [accountId]);

    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`/api/${accountId}/update/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                firstName,
                lastName,
                email,
                password1,
                password2,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                if (data.valid) {
                    navigate('/')
                }
            })
            .catch((error) => console.log(error))
    };

    return (
        <div className="form-field">
            <h1 className="subtitle">Update Account:</h1>
            <form onSubmit={handleUpdate}>
                <lable>
                    Username:
                    <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </lable>

                <lable>
                  FirstName:
                    <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                </lable>

                 <lable>
                  LastName:
                    <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    />
                </lable>

                 <lable>
                  Email:
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </lable>

                 <lable>
                  Password:
                    <input
                    type="password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    />
                </lable>

                 <lable>
                  Confirm Password:
                    <input
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    />
                </lable>

                <button type="submit">Update Account</button>
            </form>
        </div>
    )
}

export default UpdateAccount;