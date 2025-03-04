import React from "react";
import { View,StyleSheet, Pressable,Text } from "react-native";
import colors from "../utils/colors";


interface Props {
    progress:number
 }

const Progress :React.FC<Props> = ({progress}) =>{
    return(
        <>
        <Text style={{
            color:colors.CONTRAST,
            paddingVertical:2,
            alignSelf:'flex-end'
        }} >{`${progress}%`}</Text>
        <View style={{ height:10, backgroundColor:colors.CONTRAST, borderRadius:5, width:`${progress}%` }} ></View>
        </>
    )
}

export default Progress