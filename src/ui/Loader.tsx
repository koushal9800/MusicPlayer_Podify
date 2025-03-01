import React, { useEffect } from "react";
import { View,StyleSheet, Pressable,Text } from "react-native";
import colors from "../utils/colors";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import AntDesign from 'react-native-vector-icons/AntDesign'

interface Props {
    color?:string
}

const Loader :React.FC<Props> = ({color=colors.CONTRAST}) =>{
    const initialRotation = useSharedValue(0)
    const transform = useAnimatedStyle(()=>{
        return {
            transform:[{rotate:`${initialRotation.value}deg`}]
        }
    })

    useEffect(()=>{
        initialRotation.value = withRepeat(withTiming(360),-1)
    })
    return(
        <Animated.View style={transform} >
            <AntDesign name="loading1" size={24} color={color} />
        </Animated.View>
    )
}

export default Loader