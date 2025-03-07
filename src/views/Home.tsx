import React from "react";
import { View,StyleSheet, Pressable,Text, Button } from "react-native";
import colors from "../utils/colors";
import { useDispatch } from "react-redux";
import { updateNotification } from "../store/notification";
import { useQuery } from "react-query";
import client from "../api/client";
import catchAsyncError from "../api/catchError";


interface Props {}

const fetchLatest = async()=>{
    const {data} = await client.get('/audios/latest')
    return data.audios
}

const Home :React.FC<Props> = (props) =>{
    const dispatch = useDispatch()
  const query =  useQuery(['latest-uploads'],{
        queryFn:()=> fetchLatest(),
        onError(err){
            const errorMessage = catchAsyncError(err)
            dispatch(updateNotification({message:errorMessage,type:'error'}))
        }
    })

    console.log('query',query)
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