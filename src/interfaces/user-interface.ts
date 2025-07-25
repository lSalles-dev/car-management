
export interface newUser {
    id: string,
    createdAt: Date,
    displayName: string,
    password: string,
    email: string,
}

export interface userLogin {
    email: string,
    password: string
}