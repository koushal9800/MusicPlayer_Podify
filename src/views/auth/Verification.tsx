import {FC, useEffect, useRef, useState} from 'react';
import {Keyboard, StyleSheet, Text, TextInput, View} from 'react-native';
import AppLink from '../../ui/AppLink';
import AuthFormContainer from '../../components/AuthFormContainer';
import OTPField from '../../ui/OtpField';
import AppButton from '../../ui/AppButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../@types/navigation';
import client from '../../api/client';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import colors from '../../utils/colors';

type Props = NativeStackScreenProps<AuthStackParamList, "Verification">

const otpFields = new Array(6).fill('');

const Verification: FC<Props> = ({route}) => {
  const [otp, setOtp] = useState([...otpFields]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [submitting,setSubmitting] = useState(false)
  const [countDown,setCountDown] = useState(30)
  const [canSendNewOtpRequest,setCanSendNewOtpRequest] = useState(false)
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

   const {userInfo} = route.params

  const inputRef = useRef<TextInput>(null);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];

    if (value === 'Backspace') {
      // moves to the previous only if the field is empty
      if (!newOtp[index]) setActiveOtpIndex(index - 1);
      newOtp[index] = '';
    } else {
      // update otp and move to the next
      setActiveOtpIndex(index + 1);
      newOtp[index] = value;
    }

    setOtp([...newOtp]);
  };

  const handlePaste = (value: string)=>{
    if(value.length === 6){
        Keyboard.dismiss()
        const newOtp = value.split('')
        setOtp([...newOtp])
    }
  }

const isValidOtp = otp.every(value =>{
  return value.trim()
})

  const handleSubmit = async() =>{
    if(!isValidOtp) return;
    setSubmitting(true)
    try{
     const {data} = await client.post('/auth/verify-email',{userId:userInfo.id, token: otp.join('')})
     navigation.navigate('SignIn')
    } catch(error){
      console.log(error)
    }
    setSubmitting(false)
  }

  const requestForOtp = async() =>{
    setCountDown(30)
    setCanSendNewOtpRequest(false)
    try{
      await client.post('/auth/re-verify-email',{
        userId: userInfo.id
      })
    } catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
if(canSendNewOtpRequest) return ;

   const intervalId=  setInterval(()=>{
      setCountDown(oldCountDown => {
        if(oldCountDown<=0){
          setCanSendNewOtpRequest(true)
          clearInterval(intervalId)
          return 0
        }
        return oldCountDown - 1
      })
    },1000)
    return ()=>{
      clearInterval(intervalId)
    }
  }, [canSendNewOtpRequest]);

  return (
    <AuthFormContainer heading="Please look at your email.">
      <View style={styles.inputContainer}>
        {otpFields.map((_, index) => {
          return (
            <OTPField
              ref={activeOtpIndex === index ? inputRef : null}
              key={index}
              placeholder="*"
              onKeyPress={({nativeEvent}) => {
                handleChange(nativeEvent.key, index);
              }}
              keyboardType='numeric'
              onChangeText={handlePaste}
              value={otp[index] || '' } 
            />
          );
        })}
      </View>

      <AppButton busy={submitting} title="Submit" onPress={handleSubmit}/>

      <View style={styles.linkContainer}>
        {countDown>0 ? 
        <Text style={{ color:colors.SECONDARY }} >{countDown} sec</Text>:null}
        <AppLink active={canSendNewOtpRequest} title="Re-send OTP"  onPress={requestForOtp} />
      </View>
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  linkContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection:'row',
    marginRight:8
  },
});

export default Verification;
