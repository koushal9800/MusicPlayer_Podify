interface NewUserResponse{
    id: string;
    name: string;
    email: string
}

export type AuthStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    LoastPassword: undefined;
    Verification: {userInfo:NewUserResponse};
}