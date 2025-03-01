import React from "react";
import { View,StyleSheet, Pressable,Text } from "react-native";
import colors from "../utils/colors";
import Entypo from "react-native-vector-icons/Entypo";

interface Props {
    privateIcon: boolean
}

const PasswordVisibilityIcon :React.FC<Props> = ({privateIcon}) =>{
    return(
        privateIcon ? <Entypo name='eye' color={colors.SECONDARY} size={16} /> : <Entypo name='eye-with-line' color={colors.SECONDARY} size={16} />
    )
}

export default PasswordVisibilityIcon