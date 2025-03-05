import AuthInputField from '../../components/form/AuthInputField';
import Form from '../../components/form';
import colors from '../../utils/colors';
import {FC} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as yup from 'yup';
import SubmitBtn from '../../components/form/SubmitBtn';
import AppLink from '../../ui/AppLink';
import AuthFormContainer from '../../components/AuthFormContainer';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../@types/navigation';
import { FormikHelpers } from 'formik';
import client from '../../api/client';
import catchAsyncError from '../../api/catchError';
import { updateNotification } from '../../store/notification';
import { useDispatch } from 'react-redux';

const signupSchema = yup.object({
  email: yup
    .string()
    .trim('Email is missing!')
    .email('Invalid email!')
    .required('Email is required!'),
});

interface Props {}
interface initialValues{
  email: '',
}

const initialValues = {
  email: '',
};



const LostPassword: FC<Props> = props => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>()
  const dispatch = useDispatch()
  const handleSubmit = async (
    values: initialValues,
    actions: FormikHelpers<initialValues>,
  ) => {
    actions.setSubmitting(true)
    try {
      
      // we want to send these information to our api
      const {data} = await client.post('/auth/forget-password', {
        ...values,
      });
  
      console.log(data);
      // navigation.navigate('Verification',{ userInfo: data.user })
    } catch (error) {
      const errorMessage = catchAsyncError(error)
        dispatch(updateNotification({message:errorMessage,type:'error'}))
    }
    actions.setSubmitting(false)
  };
  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={signupSchema}>
      <AuthFormContainer heading="Forget Password!" subHeading='Oops, did you forget your password? Dont worry, we will help you get back in.'>
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            placeholder="john@email.com"
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
          />

          <SubmitBtn title="Send Link" />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <AppLink title="Sign In"  onPress={()=>navigation.navigate('SignIn')} />
            <AppLink title="Sign Up" onPress={()=>navigation.navigate('SignUp')}/>
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

export default LostPassword;
