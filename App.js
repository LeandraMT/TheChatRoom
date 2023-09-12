import StartScreen from './components/Start';
import ChatScreen from './components/Chat';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//CREATE NAVIGATOR
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
      >

        <Stack.Screen
          name='Home'
          component={StartScreen}
        />
        <Stack.Screen
          name='ChatScreen'
          component={ChatScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;