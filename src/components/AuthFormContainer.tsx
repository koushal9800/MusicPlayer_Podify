import React, { ReactNode } from 'react';
import {View, StyleSheet, Pressable, Text, Image} from 'react-native';
import colors from '../utils/colors';
import CircleUi from '../ui/CircleUi';

interface Props {
  heading: string;
  subHeading?:string;
  children : ReactNode
}

const AuthFormContainer: React.FC<Props> = ({heading, subHeading,children}) => {
  return (
    <View style={{ flex:1, backgroundColor:colors.PRIMARY, justifyContent:'center', alignItems:'center', padding:15 }} >
      <CircleUi position="top-left" size={200} />
      <CircleUi position="top-right" size={200} />
      <CircleUi position="bottom-left" size={200} />
      <CircleUi position="bottom-right" size={200} />

      <View style={{width: '100%', marginBottom: 20, paddingHorizontal: 15}}>
        <Image source={require('../assets/logo.png')} />
        <Text
          style={{
            color: colors.SECONDARY,
            fontSize: 25,
            fontWeight: 'bold',
            paddingVertical: 12,
          }}>
          {heading}
        </Text>
        <Text style={{color: colors.CONTRAST, fontSize: 16}}>
          {subHeading}
        </Text>
      </View>
      {children}
    </View>
  );
};

export default AuthFormContainer;
