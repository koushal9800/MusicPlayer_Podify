import React, { useEffect } from "react";
import { View,StyleSheet, Pressable,Text } from "react-native";
import colors from "../utils/colors";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationState, updateNotification } from "../store/notification";



interface Props {
    
}

const AppNotification :React.FC<Props> = (props) =>{

const {message,type} = useSelector(getNotificationState)
let backgroundColor = colors.ERROR
let textColor = colors.CONTRAST
const height = useSharedValue(0)
const dispatch = useDispatch()

const heightStyle = useAnimatedStyle(()=>{
    return{
        height : height.value
    }
})

useEffect(()=>{
let timeoutId = 0
const performAnimation = ()=>{
    height.value = withTiming(45,{
        duration:150
    });
     timeoutId = setTimeout(()=>{
        height.value = withTiming(0,{
            duration:150
        });
        dispatch(updateNotification({message:'',type}))
    },3000)
}
if(message) performAnimation()
return ()=>{
    clearTimeout(timeoutId)
}
},[message])

switch(type){
    case  'success':
        backgroundColor=colors.SUCCESS;
        textColor = colors.PRIMARY;
        break;
}

    return(
        <Animated.View style={[{
            width:'100%',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:backgroundColor,
            
        },heightStyle]} >
<Text style={{
    fontSize:18,
    alignItems:'center',
    color:textColor
}} >{message}</Text>
        </Animated.View>
    )
}

export default AppNotification