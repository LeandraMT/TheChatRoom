import StartScreen from './components/Start';
import ChatScreen from './components/Chat';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// Create navigator
const Stack = createNativeStackNavigator();

const App = () => {
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAn6ge9ADK4qhEjdT9vnXil0gvdXJPc224",
    authDomain: "thechatroom-60c42.firebaseapp.com",
    projectId: "thechatroom-60c42",
    storageBucket: "thechatroom-60c42.appspot.com",
    messagingSenderId: "156313900086",
    appId: "1:156313900086:web:d95f2eb55d11d88568f497"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);


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
        >
          {props => <ChatScreen
            db={db}
            {...props}
          />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;