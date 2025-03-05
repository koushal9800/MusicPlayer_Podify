import React from "react";
import { View,StyleSheet, Pressable,Text, Button } from "react-native";
import colors from "../utils/colors";
import { useDispatch } from "react-redux";
import { updateNotification } from "../store/notification";


interface Props {}

const Home :React.FC<Props> = (props) =>{
    const dispatch = useDispatch()
    return(
       <View>
        <Text>Home</Text>
        <Button title="test" onPress={()=>{
            dispatch(updateNotification({message:"just for testing", type:'success'}))
        }} />
       </View>
    )
}

export default Home