import React, {useEffect} from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import colors from '../utils/colors';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAuthState,
  updateBusyState,
  updateLoggedInState,
  updateProfile,
} from '../store/auth';
import TabNavigator from './TabNavigator';
import {getFromAsyncStorage, Keys} from '../utils/asyncStorage';
import client from '../api/client';
import Loader from '../ui/Loader';

interface Props {}

const AppTheme = {
    ...DefaultTheme,
    colors:{
        ...DefaultTheme.colors,
        background:colors.PRIMARY,
        primary: colors.CONTRAST
    }
}

const AppNavigator: React.FC<Props> = props => {
  const {loggedIn, busy} = useSelector(getAuthState);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuthInfo = async () => {
      dispatch(updateBusyState(true));
      try {
        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        if (!token) {
          return dispatch(updateBusyState(false));
        }

        const {data} = await client.get('/auth/is-auth', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        console.log('Auth Profile', data);

        dispatch(updateProfile(data.profile));
        dispatch(updateLoggedInState(true));
      } catch (err) {
        console.log(err);
      }
      dispatch(updateBusyState(false));
    };
    fetchAuthInfo();
  }, []);

  return (
    <NavigationContainer theme={AppTheme} >
      {busy ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: colors.OVERLAY,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}>
          <Loader />
        </View>
      ) : null}
      {loggedIn ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
