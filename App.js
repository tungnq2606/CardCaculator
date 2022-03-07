import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {EnterName, Home} from './src/screen';
import routes from './src/routes'

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={routes.Home} component={Home} />
        <Stack.Screen name={routes.EnterName} component={EnterName} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
