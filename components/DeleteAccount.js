import React from "react";

const DeleteAccount = ({accountId}) => {
    const handleDelete = () => {
        fetch(`/api/${accountId}/delete/`, {
            method: "DELETE",
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => console.log(error))
    };

    return (
        <div>
            <h2>Delete Account</h2>
            <p>Are you sure you want to delete this account?</p>
            <button onClick={handleDelete}>Delete Account</button>
        </div>
    );
};

export default DeleteAccount;