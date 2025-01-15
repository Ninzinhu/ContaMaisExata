import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../app/splash';
import LoginScreen from '../app/Login';
import RegisterScreen from '../app/Register';
import HomeScreen from './tabs/home';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const userAuthenticated = false; // Mude para a verificação real de autenticação

  return (
    <Stack.Navigator>
      {userAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} /> {/* Certifique-se de que o nome está correto */}
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
