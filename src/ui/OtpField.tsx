import React, {forwardRef} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  TextInputProps,
} from 'react-native';
import colors from '../utils/colors';

interface Props extends TextInputProps {
  ref: any;
}



const OtpField: React.FC<Props> = forwardRef<TextInput, Props>((props, ref) => {
    return (
      <TextInput
      {...props}
      ref={ref}
      placeholderTextColor={colors.INACTIVE_CONTRAST}
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: colors.SECONDARY,
        borderWidth: 2,
        textAlign: 'center',
        color: colors.CONTRAST,
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 0,
      }}
    />
    )
  });

export default OtpField;
