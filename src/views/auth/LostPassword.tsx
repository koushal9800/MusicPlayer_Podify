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

const signupSchema = yup.object({
  email: yup
    .string()
    .trim('Email is missing!')
    .email('Invalid email!')
    .required('Email is required!'),
});

interface Props {}

const initialValues = {
  email: '',
};

const LostPassword: FC<Props> = props => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>()
  return (
    <Form
      onSubmit={values => {
        console.log(values);
      }}
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
