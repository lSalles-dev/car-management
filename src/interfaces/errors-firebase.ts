
interface errorsFirebase {
    message: string, 
    domain: string,
    reason: string
}

export interface firebaseError {
    code: number,
    message: string,
    errors: errorsFirebase[]
}
