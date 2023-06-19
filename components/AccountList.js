import React, {useState, useEffect} from "react";

const AccountList = () => {
   const [accounts, setAccounts] = useState([]);

   useEffect(() => {
       fetch('/api/accounts/')
           .then((response) => response.json())
           .then((data)=> setAccounts(data))
           .catch((error) => console.log(error));
   }, []);

   return (
       <div>
           <h2>Account List</h2>
           <ul>
               {accounts.map((account) => (
                   <li key={account.id}>{account.username}</li>
               ))}
           </ul>
       </div>
   )
}

export default AccountList;

