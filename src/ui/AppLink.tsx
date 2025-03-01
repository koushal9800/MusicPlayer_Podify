import React from "react";
import { View,StyleSheet, Pressable,Text } from "react-native";
import colors from "../utils/colors";


interface Props {
    title: string;
    onPress?: ()=>void;
    active?:boolean 
}

const AppLink :React.FC<Props> = ({title,onPress,active=true}) =>{
    return(
        <Pressable onPress={active? onPress: null} style={{ opacity: active? 1:0.4 }} >
            <Text style={{ color:colors.SECONDARY }} >{title}</Text>
        </Pressable>
    )
}

export default AppLink