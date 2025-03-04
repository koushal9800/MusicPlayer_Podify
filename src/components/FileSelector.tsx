import React, { ReactNode } from "react";
import { View,StyleSheet, Pressable,Text, ViewStyle, StyleProp } from "react-native";
import colors from "../utils/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { DocumentPickerOptions, DocumentPickerOptionsImport, DocumentPickerResponse, pick } from '@react-native-documents/picker'

interface Props {
    icon?: ReactNode;
    btnTitle?: string;
    style?: StyleProp<ViewStyle>;
    onSelect(file:DocumentPickerOptions): void;
    options:DocumentPickerOptionsImport
}

const FileSelector :React.FC<Props> = ({icon,btnTitle,style,onSelect,options}) =>{

const handleDocumentSelect = async () =>{
  try{
    const document = await pick(options)
    const file = document[0]
    onSelect(file)
  // console.log(document)
  } catch(err){
   
      console.log(err)
    
  }

}

    return(
        <Pressable
        onPress={handleDocumentSelect}
        style={[{
          alignItems: 'center',
          justifyContent: 'center',
        },style]}>
        <View
          style={{
            height: 70,
            width: 70,
            aspectRatio: 1,
            borderWidth: 2,
            borderColor: colors.SECONDARY,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {icon}
        </View>
        <Text style={{color: colors.CONTRAST, marginTop: 6}}>
          
          {btnTitle}
        </Text>
      </Pressable>
    )
}

export default FileSelector