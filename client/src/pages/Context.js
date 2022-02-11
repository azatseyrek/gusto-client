import Axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const myContext = createContext({})

const Context = (props) => {
    const [user, setUser] = useState()
    useEffect(()=> {
        Axios.get("http://localhost:4000/user", {withCredentials:true}).then(res => {
            setUser(res.data)
        })
    },[])


    return (
        <myContext.Provider value={user}>
            {props.children}
        </myContext.Provider>
    )
};

export default Context;
