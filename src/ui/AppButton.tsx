import React from "react";
import { View,StyleSheet, Pressable,Text } from "react-native";
import colors from "../utils/colors";
import Loader from "./Loader";

interface Props {
    title:string,
    onPress?:()=>void,
    busy?:boolean,
    borderRadius?:number
}

const AppButton :React.FC<Props> = ({title,onPress,busy,borderRadius}) =>{
    return(
        <Pressable 
        onPress={onPress}
        style={{
            width:'100%',
            height:45,
            backgroundColor:colors.SECONDARY,
            alignItems:'center',
            borderRadius:borderRadius || 25,
            justifyContent:'center'
        }} >
            
{busy? <Loader /> : <Text style={{ color:colors.CONTRAST, fontSize:18 }} >{title}</Text>}
        </Pressable>
    )
}

export default AppButton