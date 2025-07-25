import { useContext, createContext } from "react";
import type { ReactNode } from "react"

const AuthContext = createContext<any | undefined>(undefined)

export  function AuthProvider({ children, value } : {children: ReactNode, value: any}){
    return <AuthContext.Provider value={value} >{ children } </AuthContext.Provider>
}

export function useAuthValue(){
    return useContext(AuthContext)
}