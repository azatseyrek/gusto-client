import { createContext, useState } from "react";

export const myContext = createContext({});

const Context = (props) => {
  const [user, setUser] = useState();

  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <myContext.Provider value={{ user, updateUser }}>
      {props.children}
    </myContext.Provider>
  );
};

export default Context;
