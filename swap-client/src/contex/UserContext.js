import { createContext,useReducer } from "react";

import { LOG_OUT, SIGN_IN } from "./actions";

import { userReducer } from "./userReducer";

export const UserContext = createContext();

export function UserProvider({ children }) {

  const intitialState = JSON.parse(localStorage.getItem("userSwap"))

  const [user,dispatch] = useReducer(userReducer,intitialState);

  function signIn(user){
    dispatch({
      type:SIGN_IN,
      payload:user
    })
  }

  function logOut(){
    dispatch({
      type:LOG_OUT
    })
  }

  return (
    <UserContext.Provider value={{user,signIn,logOut}}>{children}</UserContext.Provider>
  );
}

