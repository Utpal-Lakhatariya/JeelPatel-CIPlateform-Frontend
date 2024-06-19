export interface ILogin{
    email:string,
    password:string,
}

export interface ISignup{
    firstName:string,
    lastName:string,
    phoneNumber:string,
    email:string,
    password:string,
    confirmPassword:string
}

export interface IForgot{
    email:string
}
export interface IReset{
    password:string,
    confirmPassword:string
    token?:string
    email?:string
}

export interface AuthResponse<T> {
    data: T;
    isSuccess: boolean;
    statusCode: string;
    message: string;
}
