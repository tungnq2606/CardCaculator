import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {EnterName, Guide, Home, Score, StartGame} from './src/screen';
import routes from './src/routes';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={routes.StartGame}>
          <Stack.Screen name={routes.Home} component={Home} />
          <Stack.Screen name={routes.EnterName} component={EnterName} />
          <Stack.Screen name={routes.Guide} component={Guide} />
          <Stack.Screen name={routes.Score} component={Score} />
          <Stack.Screen name={routes.StartGame} component={StartGame} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
