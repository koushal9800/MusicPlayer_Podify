import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Upload from '../views/Upload';
import colors from '../utils/colors';

import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator()

const TabNavigator = () =>{
    return(
        <Tab.Navigator screenOptions={{
            headerShown:false,
            tabBarStyle:{
                backgroundColor:colors.PRIMARY
            }
        }} >
            <Tab.Screen name='Home' component={Home}  options={{
                tabBarIcon:(props) =>{
                    return <AntDesign  name='home' size={props.size} color={props.color} />
                }
            }} />
            <Tab.Screen name='Profile' component={Profile} options={{
                tabBarIcon:(props) =>{
                    return <AntDesign  name='user' size={props.size} color={props.color} />
                }
            }} />
            <Tab.Screen name='Upload' component={Upload} 
            options={{
                tabBarIcon:(props) =>{
                    return <MaterialCommunityIcons  name='account-music-outline' size={props.size} color={props.color} />
                }
            }}/>
        </Tab.Navigator>
    )
}

export default TabNavigator