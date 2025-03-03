import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";


export interface USerProfile {
    id: string;
    name: string;
    email: string;
    verified: boolean;
    avatar?: string | undefined;
    followers: number;
    followings: number;
}

interface AuthState {
    profile: USerProfile | null;
    loggedIn: boolean;
    busy: boolean
}

const initialState: AuthState ={
    profile:null,
    loggedIn: false,
    busy: false
}

const slice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        updateProfile(authState,{payload}){
            authState.profile = payload
        },
        updateLoggedInState(authState,{payload}){
            authState.loggedIn = payload
        },
        updateBusyState(authState,{payload}){
            authState.busy = payload
        }
    }
})

export const {updateLoggedInState,updateProfile,updateBusyState} = slice.actions

export const getAuthState = createSelector(
    (state:RootState) => state,
    authState => authState
    
)

export default slice.reducer