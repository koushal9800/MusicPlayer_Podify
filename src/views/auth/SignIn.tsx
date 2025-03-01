import AuthInputField from '../../components/form/AuthInputField';
import Form from '../../components/form';
import colors from '../../utils/colors';
import {FC, useState} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as yup from 'yup';
import SubmitBtn from '../../components/form/SubmitBtn';
import Entypo from 'react-native-vector-icons/Entypo';
import PasswordVisibilityIcon from '../../ui/PasswordVisibilityIcon';
import AppLink from '../../ui/AppLink';
import CircleUi from '../../ui/CircleUi';
import AuthFormContainer from '../../components/AuthFormContainer';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../@types/navigation';
import { FormikHelpers } from 'formik';
import client from '../../api/client';

const signupSchema = yup.object({
 
  email: yup
    .string()
    .trim('Email is missing!')
    .email('Invalid email!')
    .required('Email is required!'),
  password: yup
    .string()
    .trim('Password is missing!')
    .min(8, 'Password is too short!')
    
    
    .required('Password is required!'),
});

interface siginUserInfo{
  
  email: '',
  password: '',
}

interface Props {}

const initialValues = {
  
  email: '',
  password: '',
};

const SignIn: FC<Props> = props => {
  const [secureEntry, setSecureEntry] = useState(true);
const navigation = useNavigation<NavigationProp<AuthStackParamList>>()


const handleSubmit = async (
  values: siginUserInfo,
  actions: FormikHelpers<siginUserInfo>,
) => {
  actions.setSubmitting(true)
  try {
    
    // we want to send these information to our api
    const {data} = await client.post('/auth/sign-in', {
      ...values,
    });

    console.log(data);
    // navigation.navigate('Verification',{ userInfo: data.user })
  } catch (error) {
    console.log('Sign in error: ', error);
  }
  actions.setSubmitting(false)
};
  return (
    
      

      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={signupSchema}>
          <AuthFormContainer  heading='Welcome Back!' >
        <View style={styles.formContainer}>
         
          <AuthInputField
            name="email"
            placeholder="john@email.com"
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
          />
          <AuthInputField
            name="password"
            placeholder="********"
            label="Password"
            autoCapitalize="none"
            secureTextEntry={secureEntry}
            containerStyle={{marginBottom: 12}}
            rightIcon={<PasswordVisibilityIcon privateIcon={secureEntry} />}
            onRightIconPress={() => {
              setSecureEntry(!secureEntry);
            }}
          />
          <SubmitBtn title="Sign In" />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <AppLink title="I lost my Password" onPress={()=> navigation.navigate('LoastPassword') }/>
            <AppLink title="Sign Up"  onPress={()=> navigation.navigate('SignUp') } />
          </View>
        </View>
        </AuthFormContainer>
      </Form>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 15, // padding in the x direction (left and the right)
  },
  marginBottom: {
    marginBottom: 20,
  },
});

export default SignIn;
