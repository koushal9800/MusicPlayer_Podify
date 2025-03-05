import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import colors from '../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FileSelector from '../components/FileSelector';
import AppButton from '../ui/AppButton';
import CategorySelector from '../components/CategorySelector';
import { categories } from '../utils/categories';
import { DocumentPickerOptions, types } from '@react-native-documents/picker';
import * as yup from 'yup'
import client from '../api/client';
import { getFromAsyncStorage, Keys } from '../utils/asyncStorage';
import Progress from '../ui/Progress';
import { mapRange } from '../utils/math';
import catchAsyncError from '../api/catchError';
import { updateNotification } from '../store/notification';
import { useDispatch } from 'react-redux';

interface Props {}

interface FormFields {
    title: string;
    category: string;
    about: string;
    file?: DocumentPickerOptions;
    poster?: DocumentPickerOptions;
}

const defaultForm : FormFields = {
    title:'',
    category:'',
    about:'',
    file:undefined,
    poster: undefined
}

const audioInfoSchema =yup.object().shape({
    title:yup.string().trim().required('Title is missing'),
    category:yup.string().oneOf(categories,'Category is Missing'),
    about:yup.string().trim().required('About is missing'),
    file:yup.object().shape({
        uri: yup.string().required('Audio file is missing'),
        name: yup.string().required('Audio file is missing'),
        type: yup.string().required('Audio file is missing'),
        size: yup.number().required('Audio file is missing'),
    }),
    poster:yup.object().shape({
        uri: yup.string(),
        name: yup.string(),
        type: yup.string(),
        size: yup.number(),
    })
})

const Upload: React.FC<Props> = props => {

const [showCategoryModal,setShowCategoryModal] = useState(false)
const [audioInfo,setAudioInfo] = useState({...defaultForm})

const [uploadProgress,setUploadProgress] = useState(0)
const [busy,setBusy] = useState(false)

const dispatch = useDispatch()

const handleUpload = async()=>{
    setBusy(true)
    try{
const finalData = await audioInfoSchema.validate(audioInfo)
const formData = new FormData()
formData.append('title',finalData.title)
formData.append('about',finalData.about)
formData.append('category',finalData.category)
formData.append('file',{
    name: finalData.file.name,
    type: finalData.file.type,
    uri: finalData.file.uri,
})

if(finalData.poster.uri)
formData.append('poster',{
    name: finalData.poster.name,
    type: finalData.poster.type,
    uri: finalData.poster.uri,
})

const token = await getFromAsyncStorage(Keys.AUTH_TOKEN)

 const {data} = await client.post('/audio/create', formData,{
    headers:{
        Authorization: "Bearer " + token,
        "Content-Type" : "multipart/form-data"
    },
    onUploadProgress(progressEvent){
        const uploaded = mapRange({
            inputMin:0,
            inputMax:progressEvent.total || 0,
            outputMin:0,
            outputMax:100,
            inputValue: progressEvent.loaded
        })

if(uploaded >= 100){
    setAudioInfo({...defaultForm})
    setBusy(false)
}
        setUploadProgress(Math.floor(uploaded))
    }
})
console.log(data)
    }catch(error){
      const errorMessage = catchAsyncError(error)
      dispatch(updateNotification({message:errorMessage,type:'error'}))
    }
    setBusy(false)
}

  return (
    <ScrollView style={{padding: 12}}>
      <View style={{flexDirection: 'row'}}>
        <FileSelector
          icon={
            <MaterialCommunityIcons
              name="image-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle="Select Poster"
          options={{type:[types.images]}}
          onSelect={(poster)=>{
            setAudioInfo({...audioInfo, poster})
           }}
        />

        <FileSelector
          icon={
            <MaterialCommunityIcons
              name="file-music-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle="Select Audio"
          style={{marginLeft: 20}}
          options={{type:[types.audio]}}
          onSelect={(file)=>{
           setAudioInfo({...audioInfo, file})
          }}
        />
      </View>

      <View
        style={{
          marginTop: 20,
        }}>
        <TextInput
          placeholder="Title"
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          style={{
            borderWidth: 2,
            borderColor: colors.SECONDARY,
            borderRadius: 8,
            padding: 10,
            fontSize: 18,
            color: colors.CONTRAST,
          }}
          onChangeText={(text)=>{
            setAudioInfo({...audioInfo,title:text})
          }}
          value={audioInfo.title}
        />


        <Pressable 
        onPress={()=>{
            setShowCategoryModal(true)
        }}
        style={{ flexDirection:'row', alignItems:'center', marginVertical:20 }} >
            <Text style={{ color:colors.CONTRAST }} >Category</Text>
            <Text style={{ color:colors.SECONDARY, marginLeft:6, fontStyle:'italic' }} >{audioInfo.category}</Text>
        </Pressable>

        <TextInput
          placeholder="About"
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          style={{
            borderWidth: 2,
            borderColor: colors.SECONDARY,
            borderRadius: 8,
            padding: 10,
            fontSize: 18,
            color: colors.CONTRAST,
            marginVertical: 20,
            textAlignVertical: 'top',
          }}
          multiline
          numberOfLines={10}
          onChangeText={(text)=>{
            setAudioInfo({...audioInfo,about:text})
          }}
          value={audioInfo.about}
        />

        <CategorySelector visible={showCategoryModal}  
        onRequestClose={()=>{
            setShowCategoryModal(false)
        }}
        title='Category'  data={categories} renderItem={(item)=>{
            return <Text style={{ padding:10, color:colors.PRIMARY }} >{item}</Text>
        }}
        
        onSelect={(item)=>{
            setAudioInfo({...audioInfo,category: item})
        }}
        />
        <View style={{ marginBottom:20 }} >
        { busy? <Progress progress={uploadProgress} /> : null}
        </View>

       

        <AppButton busy={busy} borderRadius={8} title="Submit"  onPress={handleUpload} />
      </View>
    </ScrollView>
  );
};

export default Upload;
