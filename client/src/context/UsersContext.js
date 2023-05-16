import { useState, createContext } from "react";

export const UsersContext = createContext();

export const UsersContextProvider =  props => {
    const [users, setUsers] = useState([]);
    const [loggedUser, setLoggedUser] = useState(null);

    const addUser = (user) => {
        setUsers([...users, user]);
    }

    return(
       < UsersContext.Provider 
            value={{users, setUsers, loggedUser, setLoggedUser, addUser}}>
            {props.children}
       </UsersContext.Provider>
)}; 