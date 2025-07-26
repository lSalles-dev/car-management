import { useState, useEffect, useReducer } from "react"

import { db } from "../firebase/config"
import { collection, addDoc, Timestamp } from "firebase/firestore"


const initialState = {
    loading: null,
    error: null
}

const insertReducer = (state: any, action: any) => {
    switch(action.type){
        case "LOADING":
            return { loading: true, error: null }
        case "INSERTED_DOC":
            return { loading: false, error: null }
        case "ERROR":
            return { loading: false, error: action.payload }
        default: 
            return state;
    }
}

export const useInsertDocument = (docCollectio: string) => {
   
    const [response, dispatch] = useReducer(insertReducer, initialState)

    //ddeal with memorie leak

    const [cancelled, setCancelled] = useState(false)
    
    const checkCancelBeforeDispatch = (action: any) => {
        if(!cancelled){
            dispatch(action)
        }
    }

    const insertDocument = async(document:any) => {
        checkCancelBeforeDispatch({
            type: "LOADING"
        })

        try {
            const newDocument = {...document, createdAt: Timestamp.now()}

            const insertedDocument = await addDoc(
                collection(db, docCollectio),
                newDocument
            )

            checkCancelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: insertedDocument
            })

        } catch (error: unknown) {
              if (error !== null && typeof error === 'object' &&  'message' in error){
                  checkCancelBeforeDispatch({
                      type: "ERROR",
                      payload: error.message
                    })
                }
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    },[])


    return { insertDocument, response };
}