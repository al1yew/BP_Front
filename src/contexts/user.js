import React, { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({
    user: {
        email: "",
        name: "",
        surname: "",
        userName: "",
        token: "",
        id: ""
    },
    setUser: null
});

export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        if (localStorage.getItem("user") == null) {
            return {
                email: "",
                name: "",
                surname: "",
                userName: "",
                token: "",
                id: ""
            }
        }
        else {
            return JSON.parse(localStorage.getItem("user"))
        }
    })

    if (localStorage.getItem("user") == null) {
        localStorage.setItem("user", JSON.stringify(user))
    }

    return (<UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>)
}