export interface IRegistrationFields {
    username: string
    password: string
    firstName: string
    lastName: string
    phone: string
    email: string
}

export interface IRecoveryFields {
    password: string
    passwordConfirmation: string
    email: string
}

export interface IAuthResponse {
    jwt: string
    user: IUser
}

export interface IAuthFields {
    identifier: string
    password: string
}

export interface IForgotPassRequest {
    email: string
}

export interface IResetPassRequest {
    password: string
    passwordConfirmation: string
    code: string
}

export interface IUser {
    id: number
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
    firstName: string
    lastName: string
    phone: string

}
