import { db } from "../firebase/config.ts"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth"
import { useState, useEffect } from "react"

import type { newUser, userLogin } from "@/interfaces/user-interface.js"

export const useAuthentication = () => {
    const [error, setError] = useState<string | null>(null)
    const [load, setLoad] = useState<boolean>(false)
    const [cancelled, setCancelled] = useState<boolean>(false)

    //cleanup
    //deal with memory liquid

    const auth = getAuth()

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    const createUser = async (data: newUser) => {
        checkIfIsCancelled()

        setLoad(true)
        setError(null)
        try {
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password)

            await updateProfile(user, { displayName: data.displayName })

            setLoad(false)
            return user

        } catch (error: unknown) {
            if (typeof error === 'object' && error !== null && 'code' in error && 'message' in error) {

                let systemErrorMessage

                if (typeof error.message === "string" && error.message.includes("Password")) {
                    systemErrorMessage = "A senha deve conter no minimo 6 caracteres."
                } else if (typeof error.message === "string" && error.message.includes("email-aready")) {
                    systemErrorMessage = "Usuario com e-mail ja cadastrado."
                } else {
                    systemErrorMessage = "Ocorreu um erro. Por favor tente mais tarde"
                }
                setError(systemErrorMessage)
            }
            setLoad(false)
        }


    }

    // logout 

    const logout = () => {
        checkIfIsCancelled()

        signOut(auth)
    }

    // login

    const login = async (data: userLogin) => {
        checkIfIsCancelled()

        setLoad(true)
        setError(null)

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoad(false)

        } catch (error: unknown) {
            if (typeof error === 'object' && error !== null && 'code' in error && 'message' in error) {

                let systemErrorMessage
                console.log(error)
                if (typeof error.message === "string" && error.message.includes("invalid-credential")) {
                    systemErrorMessage = "E-mail ou senha incorreto"
                } else if (typeof error.message === "string" && error.message.includes("user-not-found")) {
                    systemErrorMessage = "Usuario nao encontrado"
                } else if (typeof error.message === "string" && error.message.includes("wrong-password")) {
                    systemErrorMessage = "senha incorreta."
                } else {
                    systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde"
                }

                setError(systemErrorMessage)
            }
            setLoad(false)
        }

    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return { auth, createUser, error, load, logout, login }
}