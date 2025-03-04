import React, { JSX, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Modal,
  ScrollView,
} from 'react-native';
import colors from '../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { ScrollView } from 'react-native-gesture-handler';

interface Props<T> {
  visible?: boolean;
  title: string;
  data: T[];
  renderItem(item:T) : JSX.Element;
  onSelect(item:T, index:number) : void;
  onRequestClose?():void
}

const CategorySelector = <T extends any > ({data,visible = false, title,renderItem,onSelect,onRequestClose}:Props<T>) => {

    const [selectedIndex,setSelectedIndex] = useState<number| null>(null)

const handleSelect = (item:T, index: number)=>{
    setSelectedIndex(index)
    onSelect(item,index)
    onRequestClose && onRequestClose()
}

  return (
    <Modal onRequestClose={onRequestClose} visible={visible} transparent>
      

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
        zIndex:1
        }}>
            <Pressable
      onPress={onRequestClose}
        style={{
          ...StyleSheet.absoluteFill,
          backgroundColor: colors.INACTIVE_CONTRAST,
          zIndex:-1
        }}
      />
        <View
          style={{
            width: '90%',
            maxHeight: '50%',
            borderRadius: 10,
            padding: 10,
            backgroundColor: colors.CONTRAST,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: colors.PRIMARY,
              paddingVertical: 10,
            }}>
            {title}
          </Text>
          <ScrollView>
            {data.map((item,index)=>{
                return  <Pressable onPress={()=>handleSelect(item,index)} key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {selectedIndex === index ? 
            <MaterialCommunityIcons
            name="radiobox-marked"
            color={colors.SECONDARY}
          /> :
          <MaterialCommunityIcons
                name="radiobox-blank"
                color={colors.SECONDARY}
              />  
            }
              {renderItem(item)}
            </Pressable>
            })}
            
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CategorySelector;
