import React from "react";
import { View,StyleSheet, Pressable,Text } from "react-native";
import colors from "../utils/colors";


interface Props {
    title: string;
    onPress?: ()=>void 
}

const AppLink :React.FC<Props> = ({title,onPress}) =>{
    return(
        <Pressable onPress={onPress}>
            <Text style={{ color:colors.SECONDARY }} >{title}</Text>
        </Pressable>
    )
}

export default AppLink