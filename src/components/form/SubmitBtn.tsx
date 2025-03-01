import {useFormikContext} from 'formik';
import {FC} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import AppButton from '../../ui/AppButton';

interface Props {
  title: string;
}

const SubmitBtn: FC<Props> = props => {
  const {handleSubmit} = useFormikContext();
  return <AppButton onPress={handleSubmit} title={props.title} />;
};

const styles = StyleSheet.create({
  container: {},
});

export default SubmitBtn;
