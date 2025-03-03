import React from 'react';
import {View} from 'react-native';
import colors from './src/utils/colors';
// import SignUp from "views/auth/SignUp";
import SignUp from './src/views/auth/SignUp';
import SignIn from './src/views/auth/SignIn';
import LostPassword from './src/views/auth/LostPassword';
import Verification from './src/views/auth/Verification';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import {Provider} from 'react-redux';
import store from './src/store';
import AppNavigator from './src/navigation';
import AppContainer from './src/components/AppContainer';

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer>
      <AppNavigator />
      </AppContainer>
    </Provider>
  );
};

export default App;
