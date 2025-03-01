import React from "react";
import { View,StyleSheet, Pressable,Text } from "react-native";
import colors from "../utils/colors";

interface Props {
    title:string,
    onPress?:()=>void
}

const AppButton :React.FC<Props> = ({title,onPress}) =>{
    return(
        <Pressable 
        onPress={onPress}
        style={{
            width:'100%',
            height:45,
            backgroundColor:colors.SECONDARY,
            alignItems:'center',
            borderRadius:25,
            justifyContent:'center'
        }} >
<Text style={{ color:colors.CONTRAST, fontSize:18 }} >{title}</Text>
        </Pressable>
    )
}

export default AppButton