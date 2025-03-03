import React, { ReactNode } from "react";
import { View,SafeAreaView, Text } from "react-native";
import colors from "../utils/colors";


interface Props {
    children:ReactNode
}

const AppContainer :React.FC<Props> = ({children}) =>{
    return(
       <SafeAreaView style={{ flex:1 }} >
        {/* <Text style={{ fontSize:30, backgroundColor:'red', color:'white' }} >Notification</Text> */}
        {children}
       </SafeAreaView>
    )
}

export default AppContainer