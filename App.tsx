import React from "react";
import { View } from "react-native";
import colors from "./src/utils/colors";
// import SignUp from "views/auth/SignUp";
import SignUp from './src/views/auth/SignUp'
import SignIn from "./src/views/auth/SignIn";
import LostPassword from "./src/views/auth/LostPassword";
import Verification from "./src/views/auth/Verification";
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from "./src/navigation/AuthNavigator";

const App = () =>{
  return(
 
<NavigationContainer>
  <AuthNavigator/>
</NavigationContainer>

    
  )
}

export default App